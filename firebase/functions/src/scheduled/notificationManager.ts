import * as functions from 'firebase-functions/v1';
import * as admin from 'firebase-admin';

export const sendDailyMeditationReminder = functions.pubsub
  .schedule('every day 09:00')
  .timeZone('America/New_York')
  .onRun(async () => {
    try {
      const usersRef = admin.firestore().collection('users');
      const snapshot = await usersRef
        .where('settings.notifications.reminders', '==', true)
        .get();

      const tokens: string[] = [];
      snapshot.forEach(doc => {
        const userData = doc.data();
        if (userData.fcmToken) {
          tokens.push(userData.fcmToken);
        }
      });

      if (tokens.length === 0) {
        functions.logger.info('No valid FCM tokens found');
        return null;
      }

      const message = {
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
      };

      const batchSize = 500;
      for (let i = 0; i < tokens.length; i += batchSize) {
        const batchTokens = tokens.slice(i, i + batchSize);
        if (batchTokens.length > 0) {
          await admin.messaging().sendMulticast({
            tokens: batchTokens,
            ...message
          });
        }
      }

      functions.logger.info(`Sent ${tokens.length} meditation reminders`);
      return null;
    } catch (error) {
      functions.logger.error('Error sending meditation reminders:', error);
      return null;
    }
  });