import { collection, query, where, getDocs, doc, getDoc, orderBy, limit, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Timestamp } from 'firebase/firestore';
import { safeStringify, validateRadarData, validateRadarLabels, DataPoint } from '../lib/debug-utils';
import UserService from './user.service'; // Import UserService

export class ExerciseService {
    // Cache for recently fetched exercises
    private static exerciseCache: Map<string, any> = new Map();

    // Helper for safely serializing objects with Date instances to JSON
    private static safeJsonReplacer(key: string, value: any): any {
        // Handle Date objects
        if (value instanceof Date) {
            return value.getTime(); // Convert to milliseconds timestamp
        }
        // Handle Firestore Timestamp objects
        if (value && typeof value === 'object' && value.toDate && typeof value.toDate === 'function') {
            return value.toDate().getTime(); // Convert to milliseconds timestamp
        }
        return value;
    }

    static async getExerciseById(exerciseId: string): Promise<any> {
        try {
            // Check cache first
            if (this.exerciseCache.has(exerciseId)) {
                return this.exerciseCache.get(exerciseId);
            }

            const exerciseRef = doc(db, 'exercises', exerciseId);
            const exerciseDoc = await getDoc(exerciseRef);

            if (!exerciseDoc.exists()) {
                throw new Error(`Exercise with ID ${exerciseId} not found`);
            }

            const exerciseData = { id: exerciseDoc.id, ...exerciseDoc.data() };

            // Store in cache
            this.exerciseCache.set(exerciseId, exerciseData);

            return exerciseData;
        } catch (error) {
            console.error(`Error fetching exercise ${exerciseId}:`, error);
            throw error;
        }
    }

    static async getUserExercises(userId: string): Promise<any[]> {
        try {
            const userExercisesQuery = query(
                collection(db, 'users', userId, 'progress'),
                where('type', '==', 'exercise')
            );

            const snapshot = await getDocs(userExercisesQuery);
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Error fetching user exercises:', error);
            throw error;
        }
    }

  /**
   * Get all exercises
   */
    static async getExercises(userId: string): Promise<any[]> {
      try {
        // First get all available exercises
        const exercisesSnapshot = await getDocs(collection(db, 'exercises'));
        const exercises = exercisesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as Record<string, any>,
          isCompleted: false
        }));

        // Then check user progress to mark completed exercises
        const userProgressSnapshot = await this.getUserExercises(userId);
        const completedExerciseIds = userProgressSnapshot.map(progress => progress.exerciseId);

        // Mark completed exercises
        return exercises.map(exercise => ({
          ...exercise,
          isCompleted: completedExerciseIds.includes(exercise.id)
        }));
      } catch (error) {
        console.error('Error fetching exercises:', error);
        throw error;
      }
    }

    /**
     * Get user radar data for visualization
     */
    static async getRadarData(userId: string): Promise<{ data: DataPoint[], labels: string[] }> {
    // --- RADAR CHART: Template-based calculation ---
    // 1. Get user's assigned template
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    const assignedTemplateId = userDoc.data()?.assignedTemplateId;
    if (!assignedTemplateId) {
        throw new Error('No exercise template assigned to user.');
    }

    // 2. Get template's exercise IDs
    const templateRef = doc(db, 'exerciseTemplates', assignedTemplateId);
    const templateDoc = await getDoc(templateRef);
    const exerciseIds: string[] = templateDoc.exists() ? (templateDoc.data()?.exerciseIds || []) : [];
    if (exerciseIds.length === 0) {
        throw new Error('Assigned template has no exercises.');
    }

    // 3. Fetch all exercises in template
    const exercises: any[] = [];
    for (const exId of exerciseIds) {
        const exDoc = await getDoc(doc(db, 'exercises', exId));
        if (exDoc.exists()) exercises.push(exDoc.data());
    }
    if (exercises.length === 0) {
        throw new Error('No exercises found for assigned template.');
    }

    // 4. Count per function category
    const categoryCounts: Record<string, number> = {};
    let total = 0;
    for (const ex of exercises) {
        const cats: string[] = Array.isArray(ex.functionCategories) ? ex.functionCategories : [];
        for (const cat of cats) {
            categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
            total++;
        }
    }

    // 5. Get all function categories for labels (ordered)
    const catSnapshot = await getDocs(collection(db, 'functionCategories'));
    const categories = catSnapshot.docs
        .map(doc => ({ id: doc.id, ...(doc.data() as { label?: string; name?: string; order?: number }) }))
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const categoryIds = categories.map(cat => cat.id);
    const categoryLabels = categories.map(cat => cat.label || cat.name || cat.id);

    // 6. Build radar data (percent per category)
    const data = categoryIds.map((catId, idx) => ({
        label: categoryLabels[idx],
        value: total > 0 ? (categoryCounts[catId] || 0) / total : 0
    }));

    return { data, labels: categoryLabels };
}

    /**
     * Get user progress data
     */
    private static async getUserProgress(userId: string): Promise<any> {
        console.log('🔍 [PROGRESS DEBUG] Getting user progress for userId:', userId);
        
        try {
            const progressRef = doc(db, 'users', userId, 'progress', 'overview');
            console.log('🔍 [PROGRESS DEBUG] Progress document path:', progressRef.path);
            
            const progressDoc = await getDoc(progressRef);
            console.log('🔍 [PROGRESS DEBUG] Progress document exists:', progressDoc.exists());
            
            if (progressDoc.exists()) {
                const data = progressDoc.data();
                console.log('🔍 [PROGRESS DEBUG] Progress data retrieved:', JSON.stringify(data, this.safeJsonReplacer));
                
                // Validate data structure
                if (!data.categories) {
                    console.warn('⚠️ [PROGRESS DEBUG] Progress data missing categories property');
                    data.categories = {};
                }
                
                if (typeof data.categories !== 'object') {
                    console.error('❌ [PROGRESS DEBUG] Categories is not an object:', typeof data.categories);
                    data.categories = {};
                }
                
                // Log each category value
                if (data.categories) {
                    Object.entries(data.categories).forEach(([category, value]) => {
                        console.log(`🔍 [PROGRESS DEBUG] Category ${category} value:`, value);
                        if (typeof value !== 'number' || isNaN(value)) {
                            console.error(`❌ [PROGRESS DEBUG] Invalid value for category ${category}:`, value);
                        }
                    });
                }
                
                // Handle any timestamp fields
                if (data.lastUpdated && typeof data.lastUpdated.toDate === 'function') {
                    data.lastUpdated = data.lastUpdated.toDate();
                }
                
                return data;
            }

            console.log('🔍 [PROGRESS DEBUG] No progress document found, returning default');
            return {
                overall: 0,
                categories: {}
            };
        } catch (error) {
            console.error('❌ [PROGRESS DEBUG] Error fetching user progress:', error);
            throw error;
        }
    }

    /**
     * Marks an exercise as complete for a user, updating both the individual
     * progress entry and the overview document.
     */
    static async completeExercise(userId: string, exerciseId: string): Promise<void> {
        try {
            // Get exercise details (for category)
            const exercise = await this.getExerciseById(exerciseId);
            const userRef = doc(db, 'users', userId); // Reference to the main user document

            // Update the user's progress/overview document
            const overviewRef = doc(db, 'users', userId, 'progress', 'overview');
            const overviewDoc = await getDoc(overviewRef);

            if (overviewDoc.exists()) {
                // Increment the category count
                await updateDoc(overviewRef, {
                    [`categories.${exercise.category}`]: increment(1),
                    lastUpdated: Timestamp.now()
                });
            } else {
                // Create the document if it doesn't exist
                await setDoc(overviewRef, {
                    overall: 0, // This might need adjustment based on how "overall" is calculated
                    categories: {
                        [exercise.category]: 1
                    },
                    lastUpdated: Timestamp.now()
                });
            }

            // Add/update the individual exercise progress entry
            const userExerciseRef = doc(db, 'users', userId, 'progress', exerciseId);
            await setDoc(userExerciseRef, {
                userId: userId,
                exerciseId: exerciseId,
                type: 'exercise',
                completed: true,
                timestamp: Timestamp.now()
            }, { merge: true }); // Use merge to update if it exists

            // Also increment the main stats counter on the user document
            await updateDoc(userRef, {
                'stats.exercisesCompleted': increment(1),
                'stats.lastActiveDate': Timestamp.now(), // Update last active date
                updatedAt: Timestamp.now() // Update main document timestamp
            });

            // Also track the activity
            await UserService.trackActivity({
              userId: userId,
              type: 'exercise',
              timestamp: Timestamp.now().toDate(), // Use current date
              details: {
                title: exercise.title, // Use exercise title
                duration: exercise.duration, // Include duration
                itemId: exerciseId // Reference the exercise ID
              }
            });

        } catch (error) {
            console.error('Error completing exercise:', error);
            throw error; // Re-throw to handle upstream
        }
    }
}
export default ExerciseService;
