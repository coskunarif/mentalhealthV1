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
        try {
            // Get all exercises
            console.log('getRadarData: Start of function'); // Log at the very beginning
            console.log('getRadarData: Project ID from db instance:', db.app.options.projectId);
            console.log('getRadarData: Fetching exercises...');

            // Minimal query test
            try {
              console.log('Testing minimal Firestore query...');
              const dbRef = collection(db, 'exercises');
              const simpleQuery = query(dbRef, limit(1));
              const snapshot = await getDocs(simpleQuery);
              console.log('Query succeeded, found documents:', !snapshot.empty);
            } catch (error) {
              console.error('Simple query failed with error:', error);
            }

            const exercisesRef = collection(db, 'exercises');
            console.log('getRadarData: exercisesRef.path:', exercisesRef.path);
            let exercisesSnapshot;
            let exercises: ExerciseData[] = [];
            try {
                exercisesSnapshot = await getDocs(exercisesRef);
                exercises = exercisesSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                } as ExerciseData));
            } catch (error) {
                console.error('getRadarData: Error fetching exercises with getDocs:', error);
                // DO NOT re-throw.  Let the function continue with an empty array.
            }


            console.log('getRadarData: Exercises retrieved:', JSON.stringify(exercises));

            // Extract unique categories
            const categories = [...new Set(exercises.map(exercise => exercise.category))];
            console.log('getRadarData: Categories extracted:', JSON.stringify(categories));

            // Get user progress data
            console.log('getRadarData: Fetching user progress...');
            const progressData = await this.getUserProgress(userId);
            console.log('getRadarData: Progress data:', JSON.stringify(progressData));

            // Validate that categories is an object
           if (!progressData.categories || typeof progressData.categories !== 'object') {
              console.error('getRadarData: Invalid categories structure:', progressData.categories);
              progressData.categories = {}; // Default to empty object
            }

            // Calculate completion percentage for each category
            const data = categories.map(category => {
                // Ensure category is a string
                const categoryKey = String(category);

                // Safely access the progress value, defaulting to 0
                let categoryProgress = 0;
                try {
                    categoryProgress = progressData.categories[categoryKey] || 0;
                    // Ensure value is a number
                    categoryProgress = Number(categoryProgress);
                    if (isNaN(categoryProgress)) {
                        console.error(`getRadarData: Invalid progress value for ${categoryKey}:`, progressData.categories[categoryKey]);
                        categoryProgress = 0;
                    }
                } catch (e) {
                    console.error(`getRadarData: Error accessing progress for ${categoryKey}:`, e);
                }

                return {
                    label: categoryKey,
                    value: Math.min(Math.max(categoryProgress / 100, 0), 1) // Ensure between 0-1
                };
            });

            console.log('getRadarData: Final data:', JSON.stringify(data));
            console.log('getRadarData: Final labels:', JSON.stringify(categories));

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
        try {
            const progressRef = doc(db, 'users', userId, 'progress', 'overview');
            const progressDoc = await getDoc(progressRef);

            if (progressDoc.exists()) {
                return progressDoc.data();
            }

            return {
                overall: 0,
                categories: {}
            };
        } catch (error) {
            console.error('Error fetching user progress:', error);
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
