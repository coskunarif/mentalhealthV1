import { collection, query, where, getDocs, doc, getDoc, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';

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
  static async getRadarData(userId: string): Promise<any[]> {
    try {
      const categoriesRef = collection(db, 'exerciseCategories');
      const categoriesSnapshot = await getDocs(categoriesRef);
      const categories = categoriesSnapshot.docs.map(doc => doc.data().name);

      // Get user progress data
      const progressData = await this.getUserProgress(userId);

      // Calculate completion percentage for each category
      return categories.map(category => {
        const categoryProgress = progressData.categories[category] || 0;
        return {
          label: category,
          value: categoryProgress / 100 // Normalize to 0-1 for radar chart
        };
      });
    } catch (error) {
      console.error('Error fetching radar data:', error);
      return [];
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
}