import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

interface MoodData {
  id: string;
  mood: string;
  value: number;
  timestamp: admin.firestore.Timestamp;
  userId: string;
  [key: string]: any;
}

interface ActivityData {
  id: string;
  type: string;
  timestamp: admin.firestore.Timestamp;
  details: any;
  userId: string;
  [key: string]: any;
}

interface UserStats {
  profile: {
    displayName: string;
    photoURL: string;
    createdAt: admin.firestore.Timestamp;
    streak: number;
  };
  meditation: {
    totalTime: number;
    sessions: number;
  };
  activities: {
    exercisesCompleted: number;
    surveysCompleted: number;
    recentActivities: ActivityData[];
  };
  mood: {
    recentMoods: MoodData[];
  };
}

export const getUserStats = functions
  .runWith({
    timeoutSeconds: 30,
    memory: '256MB'
  })
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'You must be logged in to access this feature'
      );
    }

    const userId = context.auth.uid;

    try {
      // Get user document
      const userDoc = await admin.firestore().collection('users').doc(userId).get();
      
      if (!userDoc.exists) {
        throw new functions.https.HttpsError(
          'not-found',
          'User profile not found'
        );
      }
      
      const userData = userDoc.data() || {};
      
      // Get meditation progress
      const meditationDoc = await admin.firestore()
        .collection('users')
        .doc(userId)
        .collection('progress')
        .doc('meditation')
        .get();
      
      const meditationData = meditationDoc.exists ? meditationDoc.data() || {} : { totalTime: 0, sessions: 0 };
      
      // Get recent moods (last 7 days)
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const moodsSnapshot = await admin.firestore()
        .collection('moods')
        .where('userId', '==', userId)
        .where('timestamp', '>=', admin.firestore.Timestamp.fromDate(oneWeekAgo))
        .orderBy('timestamp', 'desc')
        .limit(10)
        .get();
      
      const recentMoods: MoodData[] = [];
      moodsSnapshot.forEach(doc => {
        const data = doc.data() as Omit<MoodData, 'id'>;
        recentMoods.push({
          id: doc.id,
          mood: data.mood,
          value: data.value,
          timestamp: data.timestamp,
          userId: data.userId,
          ...data
        });
      });
      
      // Get recent activities
      const activitiesSnapshot = await admin.firestore()
        .collection('users')
        .doc(userId)
        .collection('activities')
        .orderBy('timestamp', 'desc')
        .limit(5)
        .get();
      
      const recentActivities: ActivityData[] = [];
      activitiesSnapshot.forEach(doc => {
        const data = doc.data() as Omit<ActivityData, 'id'>;
        recentActivities.push({
          id: doc.id,
          type: data.type,
          timestamp: data.timestamp,
          details: data.details,
          userId: data.userId,
          ...data
        });
      });
      
      // Combine all stats
      const stats: UserStats = {
        profile: {
          displayName: userData.displayName || '',
          photoURL: userData.photoURL || '',
          createdAt: userData.createdAt || admin.firestore.Timestamp.now(),
          streak: userData.stats?.streak || 0
        },
        meditation: {
          totalTime: meditationData.totalTime || 0,
          sessions: meditationData.sessions || 0
        },
        activities: {
          exercisesCompleted: userData.stats?.exercisesCompleted || 0,
          surveysCompleted: userData.stats?.surveysCompleted || 0,
          recentActivities
        },
        mood: {
          recentMoods
        }
      };
      
      return { success: true, stats };
    } catch (error) {
      functions.logger.error('Error retrieving user stats:', error);
      
      if (error instanceof functions.https.HttpsError) {
        throw error;
      }
      
      throw new functions.https.HttpsError(
        'internal',
        'An error occurred while retrieving user statistics'
      );
    }
  });