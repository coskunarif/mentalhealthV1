import { collection, query, where, getDocs, doc, getDoc, orderBy, limit, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Timestamp } from 'firebase/firestore';

export class ExerciseService {
    // Cache for recently fetched exercises
    private static exerciseCache: Map<string, any> = new Map();

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
    static async getRadarData(userId: string): Promise<{ data: any[], labels: string[] }> {
        // Define the type for exercise data
        interface ExerciseData {
            id: string;
            title: string;
            duration: number;
            category: string;
            description: string;
            order: number;
            isCompleted: boolean;
        }
        
        console.log('🔍 [RADAR DEBUG] getRadarData: Start of function for userId:', userId);
        console.log('🔍 [RADAR DEBUG] Firebase project ID:', db.app.options.projectId);
        
        try {
            // Test basic Firebase connectivity first
            console.log('🔍 [RADAR DEBUG] Testing basic Firestore connectivity...');
            try {
                const dbRef = collection(db, 'exercises');
                const simpleQuery = query(dbRef, limit(1));
                const snapshot = await getDocs(simpleQuery);
                console.log('🔍 [RADAR DEBUG] Basic connectivity test succeeded, found documents:', !snapshot.empty);
                if (!snapshot.empty) {
                    const sampleDoc = snapshot.docs[0].data();
                    console.log('🔍 [RADAR DEBUG] Sample document structure:', JSON.stringify(sampleDoc));
                }
            } catch (error: any) {
                console.error('❌ [RADAR DEBUG] Basic connectivity test failed:', error);
                // This is a critical error - if we can't even do a simple query, we should stop
                throw new Error(`Firebase connectivity issue: ${error?.message || 'Unknown error'}`);
            }

            // Fetch all exercises to get categories
            console.log('🔍 [RADAR DEBUG] Fetching all exercises...');
            const exercisesRef = collection(db, 'exercises');
            let exercises: ExerciseData[] = [];
            
            try {
                const exercisesSnapshot = await getDocs(exercisesRef);
                console.log('🔍 [RADAR DEBUG] Exercises query returned', exercisesSnapshot.size, 'documents');
                
                if (exercisesSnapshot.empty) {
                    console.warn('⚠️ [RADAR DEBUG] No exercises found in database');
                }
                
                exercises = exercisesSnapshot.docs.map(doc => {
                    const data = doc.data();
                    console.log(`🔍 [RADAR DEBUG] Exercise ${doc.id} category:`, data.category);
                    return {
                        id: doc.id,
                        ...data,
                    } as ExerciseData;
                });
            } catch (error: any) {
                console.error('❌ [RADAR DEBUG] Error fetching exercises:', error);
                throw new Error(`Failed to fetch exercises: ${error?.message || 'Unknown error'}`);
            }

            // Extract unique categories with validation
            console.log('🔍 [RADAR DEBUG] Extracting categories from exercises...');
            const categoriesSet = new Set<string>();
            exercises.forEach(exercise => {
                if (!exercise.category) {
                    console.warn(`⚠️ [RADAR DEBUG] Exercise ${exercise.id} has no category`);
                } else {
                    categoriesSet.add(String(exercise.category));
                }
            });
            
            const categories = Array.from(categoriesSet);
            console.log('🔍 [RADAR DEBUG] Categories extracted:', JSON.stringify(categories));
            
            if (categories.length === 0) {
                console.warn('⚠️ [RADAR DEBUG] No categories found in exercises');
                return { data: [], labels: [] };
            }

            // Get user progress data
            console.log('🔍 [RADAR DEBUG] Fetching user progress for userId:', userId);
            let progressData;
            try {
                progressData = await this.getUserProgress(userId);
                console.log('🔍 [RADAR DEBUG] Raw progress data:', JSON.stringify(progressData));
            } catch (error: any) {
                console.error('❌ [RADAR DEBUG] Error fetching user progress:', error);
                throw new Error(`Failed to fetch user progress: ${error?.message || 'Unknown error'}`);
            }

            // Validate progress data structure
            if (!progressData) {
                console.error('❌ [RADAR DEBUG] Progress data is null or undefined');
                progressData = { overall: 0, categories: {} };
            }
            
            if (!progressData.categories || typeof progressData.categories !== 'object') {
                console.error('❌ [RADAR DEBUG] Invalid categories structure:', progressData.categories);
                progressData.categories = {}; // Default to empty object
            }

            // Calculate completion percentage for each category
            console.log('🔍 [RADAR DEBUG] Calculating radar data points...');
            const data = categories.map(category => {
                // Ensure category is a string
                const categoryKey = String(category);
                console.log(`🔍 [RADAR DEBUG] Processing category: ${categoryKey}`);

                // Safely access the progress value, defaulting to 0
                let categoryProgress = 0;
                try {
                    const rawProgress = progressData.categories[categoryKey];
                    console.log(`🔍 [RADAR DEBUG] Raw progress for ${categoryKey}:`, rawProgress);
                    
                    if (rawProgress !== undefined && rawProgress !== null) {
                        categoryProgress = Number(rawProgress);
                        if (isNaN(categoryProgress)) {
                            console.error(`❌ [RADAR DEBUG] Invalid progress value for ${categoryKey}:`, rawProgress);
                            categoryProgress = 0;
                        } else {
                            console.log(`🔍 [RADAR DEBUG] Numeric progress for ${categoryKey}:`, categoryProgress);
                        }
                    } else {
                        console.log(`🔍 [RADAR DEBUG] No progress data for ${categoryKey}, defaulting to 0`);
                    }
                } catch (e) {
                    console.error(`❌ [RADAR DEBUG] Error accessing progress for ${categoryKey}:`, e);
                }

                // Calculate normalized value (0-1)
                const normalizedValue = Math.min(Math.max(categoryProgress / 100, 0), 1);
                console.log(`🔍 [RADAR DEBUG] Normalized value for ${categoryKey}:`, normalizedValue);
                
                return {
                    label: categoryKey,
                    value: normalizedValue
                };
            });

            console.log('🔍 [RADAR DEBUG] Final radar data points:', JSON.stringify(data));
            console.log('🔍 [RADAR DEBUG] Final radar labels:', JSON.stringify(categories));
            
            // Validate final data structure
            if (!Array.isArray(data) || data.length === 0) {
                console.error('❌ [RADAR DEBUG] Generated radar data is empty or invalid');
            } else {
                data.forEach((point, index) => {
                    if (typeof point.value !== 'number' || isNaN(point.value)) {
                        console.error(`❌ [RADAR DEBUG] Invalid value at index ${index}:`, point.value);
                    }
                });
            }

            return { data, labels: categories };
        } catch (error) {
            console.error('getRadarData: Error fetching radar data:', error);
            return { data: [], labels: [] }; // Return empty arrays on error
        } finally {
            // Test accessing a different collection
            console.log('Testing access to users collection...');
            try {
                const testRef = collection(db, 'users');
                const testSnapshot = await getDocs(query(testRef, limit(1)));
                console.log('Users collection test - empty?:', testSnapshot.empty);
            } catch (error) {
                console.error('Error accessing users collection:', error);
            }
        }
    }

    /**
     * Get recent activities for the user
     */
    static async getRecentActivities(userId: string): Promise<any[]> {
      try {
          console.log('getRecentActivities: Fetching recent activities...');
          const activitiesRef = collection(db, 'users', userId, 'activities');
          const q = query(activitiesRef,
              where('type', 'in', ['meditation', 'exercise', 'mood']),
              orderBy('timestamp', 'desc'),
              limit(5)
          );

            let snapshot;
            try {
                snapshot = await getDocs(q);
            } catch (error) {
                console.error('getRecentActivities: Error fetching activities with getDocs:', error);
                return []; // Return empty array on error
            }

          const activities = snapshot.docs.map(doc => {
              const data = doc.data();
              console.log(`getRecentActivities: Processing activity ${doc.id}:`, data);
              return {
                  id: doc.id,
                  type: data.type,
                  title: data.details?.title || this.getActivityTitle(data.type),
                  subtitle: data.details?.subtitle || '',
                  duration: data.details?.duration || 0,
                  timestamp: data.timestamp.toDate()
              };
          });
          console.log('getRecentActivities: Final activities:', activities);
          return activities;
      } catch (error) {
          console.error('getRecentActivities: Error fetching recent activities:', error);
          return [];
      }
    }

    /**
     * Helper to get activity title
     */
    private static getActivityTitle(type: string): string {
        switch (type) {
            case 'meditation':
                return 'Meditation Session';
            case 'exercise':
                return 'Breathing Exercise';
            case 'mood':
                return 'Mood Tracking';
            default:
                return 'Activity';
        }
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
                console.log('🔍 [PROGRESS DEBUG] Progress data retrieved:', JSON.stringify(data));
                
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

        } catch (error) {
            console.error('Error completing exercise:', error);
            throw error; // Re-throw to handle upstream
        }
    }
}
export default ExerciseService;
