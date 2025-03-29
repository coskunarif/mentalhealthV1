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
                    console.log('🔍 [RADAR DEBUG] Sample document structure:', safeStringify(sampleDoc));
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
            console.log('🔍 [RADAR DEBUG] Categories extracted:', safeStringify(categories));
            
            if (categories.length === 0) {
                console.warn('⚠️ [RADAR DEBUG] No categories found in exercises');
                return { data: [], labels: [] };
            }

            // Get user progress data
            console.log('🔍 [RADAR DEBUG] Fetching user progress for userId:', userId);
            let progressData;
            try {
                progressData = await this.getUserProgress(userId);
                console.log('🔍 [RADAR DEBUG] Raw progress data:', safeStringify(progressData));
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
            let data = categories.map(category => {
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

            console.log('🔍 [RADAR DEBUG] Pre-validation radar data points:', safeStringify(data));
            console.log('🔍 [RADAR DEBUG] Pre-validation radar labels:', safeStringify(categories));
            
            // Validate data and labels using our utility functions
            const dataValidation = validateRadarData(data);
            if (!dataValidation.isValid) {
                console.error('❌ [RADAR DEBUG] Radar data validation failed:', dataValidation.errors.join(', '));
                dataValidation.warnings.forEach(warning => {
                    console.warn(`⚠️ [RADAR DEBUG] ${warning}`);
                });
                data = dataValidation.fixedData;
            }
            
            const labelsValidation = validateRadarLabels(categories);
            if (!labelsValidation.isValid) {
                console.error('❌ [RADAR DEBUG] Radar labels validation failed:', labelsValidation.errors.join(', '));
                labelsValidation.warnings.forEach(warning => {
                    console.warn(`⚠️ [RADAR DEBUG] ${warning}`);
                });
            }
            
            // Ensure data and labels have the same length
            if (data.length !== labelsValidation.fixedLabels.length) {
                console.warn(`⚠️ [RADAR DEBUG] Data length (${data.length}) and label length (${labelsValidation.fixedLabels.length}) mismatch`);
                
                // If we have more data points than labels, truncate data
                if (data.length > labelsValidation.fixedLabels.length) {
                    console.warn('⚠️ [RADAR DEBUG] Truncating data to match labels length');
                    data = data.slice(0, labelsValidation.fixedLabels.length);
                }
                
                // If we have more labels than data points, add dummy data points
                if (data.length < labelsValidation.fixedLabels.length) {
                    console.warn('⚠️ [RADAR DEBUG] Adding dummy data points to match labels length');
                    const dummyPoints = labelsValidation.fixedLabels.slice(data.length).map((label, index) => ({
                        label,
                        value: 0
                    }));
                    data = [...data, ...dummyPoints];
                }
            }
            
            // Final validation check
            console.log('🔍 [RADAR DEBUG] Final radar data points:', safeStringify(data));
            console.log('🔍 [RADAR DEBUG] Final radar labels:', safeStringify(labelsValidation.fixedLabels));
            
            // Ensure we always return valid arrays
            return { 
                data: Array.isArray(data) ? data : [], 
                labels: Array.isArray(labelsValidation.fixedLabels) ? labelsValidation.fixedLabels : [] 
            };
        } catch (error) {
            console.error('❌ [RADAR DEBUG] Error fetching radar data:', error);
            // Return empty arrays on error
            return { data: [], labels: [] }; 
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
              where('type', 'in', ['meditation', 'exercise', 'mood', 'survey']), // Added 'survey'
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
              
              // Convert Firestore timestamp to Date object
              let timestamp = new Date();
              if (data.timestamp && typeof data.timestamp.toDate === 'function') {
                  timestamp = data.timestamp.toDate();
              }
              
              return {
                  id: doc.id,
                  type: data.type,
                  title: data.details?.title || this.getActivityTitle(data.type),
                  subtitle: data.details?.subtitle || '',
                  duration: data.details?.duration || 0,
                  timestamp: timestamp
              };
          });
          console.log('getRecentActivities: Final activities:', JSON.stringify(activities, this.safeJsonReplacer));
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
            case 'survey': // Added title for survey
                return 'Wellness Survey';
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
