import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const dailyStats = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
  try {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Format dates as YYYY-MM-DD
    const yesterdayString = yesterday.toISOString().split('T')[0];

    // Get all users
    const usersSnapshot = await admin.firestore().collection('users').get();

    const batch = admin.firestore().batch();
    const statsRef = admin.firestore().collection('stats').doc(yesterdayString);

    // Aggregate stats
    let totalActiveUsers = 0;
    let totalNewUsers = 0;
    let totalMeditationMinutes = 0;
    let totalExercisesCompleted = 0;
    let totalSurveysCompleted = 0;

    // Process each user
    for (const userDoc of usersSnapshot.docs) {
      const user = userDoc.data();
      const userId = userDoc.id;

      // Check if user was active yesterday
      const userActivitiesRef = admin.firestore()
        .collection('users')
        .doc(userId)
        .collection('activities')
        .where('date', '==', yesterdayString);

      const activitiesSnapshot = await userActivitiesRef.get();

      if (!activitiesSnapshot.empty) {
        totalActiveUsers++;

        // Update user streak if active
        const userRef = admin.firestore().collection('users').doc(userId);
        const userData = (await userRef.get()).data() || {};

        if (userData.stats && userData.stats.lastActiveDate) {
          const lastActiveDate = userData.stats.lastActiveDate.toDate();
          const dayDiff = Math.floor((yesterday.getTime() - lastActiveDate.getTime()) / (1000 * 3600 * 24));

          if (dayDiff === 1) {
            // Increment streak
            batch.update(userRef, {
              'stats.streak': admin.firestore.FieldValue.increment(1),
              'stats.lastActiveDate': admin.firestore.Timestamp.fromDate(yesterday)
            });
          } else if (dayDiff > 1) {
            // Reset streak
            batch.update(userRef, {
              'stats.streak': 1,
              'stats.lastActiveDate': admin.firestore.Timestamp.fromDate(yesterday)
            });
          }
        } else {
          // First activity
          batch.update(userRef, {
            'stats.streak': 1,
            'stats.lastActiveDate': admin.firestore.Timestamp.fromDate(yesterday)
          });
        }

        // Count stats
        activitiesSnapshot.docs.forEach((activityDoc) => {
          const activity = activityDoc.data();
          if (activity.type === 'meditation') {
            totalMeditationMinutes += activity.duration || 0;
          } else if (activity.type === 'exercise') {
            totalExercisesCompleted++;
          } else if (activity.type === 'survey') {
            totalSurveysCompleted++;
          }
        });
      }

      // Check for new users yesterday
      if (user.createdAt && user.createdAt.toDate().toISOString().split('T')[0] === yesterdayString) {
        totalNewUsers++;
      }
    }

    // Save aggregated stats
    batch.set(statsRef, {
      date: yesterdayString,
      activeUsers: totalActiveUsers,
      newUsers: totalNewUsers,
      meditationMinutes: totalMeditationMinutes,
      exercisesCompleted: totalExercisesCompleted,
      surveysCompleted: totalSurveysCompleted,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });

    await batch.commit();

    console.log(`Daily stats processed for ${yesterdayString}`);
    return null;
  } catch (error) {
    console.error('Error processing daily stats:', error);
    return null;
  }
});