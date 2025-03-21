import { onSchedule } from 'firebase-functions/v2/scheduler';
import * as admin from 'firebase-admin';
import { logger } from 'firebase-functions';

export const sendDailyMeditationReminder = onSchedule({
  schedule: 'every day 09:00',
  timeZone: 'America/New_York',
  retryCount: 3,
  memory: '256MiB',
}, async (event) => {
  try {
    const usersRef = admin.firestore().collection('users');
    const snapshot = await usersRef.where('settings.notifications.reminders', '==', true).get();

    const tokens: string[] = [];
    snapshot.forEach(doc => {
      const userData = doc.data();
      if (userData.fcmToken) {
        tokens.push(userData.fcmToken);
      }
    });

    if (tokens.length === 0) {
      logger.info('No valid FCM tokens found');
      return;
    }

    const batchSize = 500;
    for (let i = 0; i < tokens.length; i += batchSize) {
      const batchTokens = tokens.slice(i, i + batchSize);
      if (batchTokens.length > 0) {
        await admin.messaging().sendMulticast({
          tokens: batchTokens,
          notification: {
            title: 'Time for your daily meditation',
            body: 'Take a moment to center yourself with today\'s meditation practice.'
          },
          data: {
            type: 'MEDITATION_REMINDER',
            route: '/tabs/exercises'
          },
          android: {
            priority: 'high'
          },
          apns: {
            payload: {
              aps: {
                contentAvailable: true
              }
            }
          }
        });
      }
    }

    logger.info(`Sent ${tokens.length} meditation reminders`);
  } catch (error) {
    logger.error('Error sending meditation reminders:', error);
  }
});
