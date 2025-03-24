import { collection, query, where, getDocs, doc, getDoc, orderBy, limit, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../lib/firebase-utils';
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
        try {
            // Get all exercises
            const exercisesRef = collection(db, 'exercises');
            const exercisesSnapshot = await getDocs(exercisesRef);
            const exercises = exercisesSnapshot.docs.map(doc => doc.data());
            
            console.log('Exercises retrieved:', JSON.stringify(exercises));

            // Extract unique categories
            const categories = [...new Set(exercises.map(exercise => exercise.category))];
            console.log('Categories extracted:', JSON.stringify(categories));

            // Get user progress data
            const progressData = await this.getUserProgress(userId);
            console.log('Progress data:', JSON.stringify(progressData));

            // Validate that categories is an object
            if (!progressData.categories || typeof progressData.categories !== 'object') {
              console.error('Invalid categories structure:', progressData.categories);
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
                  console.error(`Invalid progress value for ${categoryKey}:`, progressData.categories[categoryKey]);
                  categoryProgress = 0;
                }
              } catch (e) {
                console.error(`Error accessing progress for ${categoryKey}:`, e);
              }
              
              return {
                label: categoryKey,
                value: Math.min(Math.max(categoryProgress / 100, 0), 1) // Ensure between 0-1
              };
            });

            console.log('Final data:', JSON.stringify(data));
            console.log('Final labels:', JSON.stringify(categories));

            return { data, labels: categories };
        } catch (error) {
            console.error('Error fetching radar data:', error);
            return { data: [], labels: [] }; // Return empty arrays on error
        }
    }

    /**
     * Get recent activities for the user
     */
    static async getRecentActivities(userId: string): Promise<any[]> {
        try {
            const activitiesRef = collection(db, 'users', userId, 'activities');
            const q = query(activitiesRef,
                where('type', 'in', ['meditation', 'exercise', 'mood']),
                orderBy('timestamp', 'desc'),
                limit(5)
            );

            const snapshot = await getDocs(q);
            return snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    type: data.type,
                    title: data.details?.title || this.getActivityTitle(data.type),
                    subtitle: data.details?.subtitle || '',
                    duration: data.details?.duration || 0,
                    timestamp: data.timestamp.toDate()
                };
            });
        } catch (error) {
            console.error('Error fetching recent activities:', error);
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
