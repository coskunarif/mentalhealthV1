import { onSchedule, ScheduledEvent } from 'firebase-functions/v2/scheduler';
import { logger } from 'firebase-functions/v2';
import * as admin from 'firebase-admin';
import { getMessaging, MulticastMessage } from 'firebase-admin/messaging'; // Import MulticastMessage

// Ensure Firebase Admin SDK is initialized (typically done in index.ts)
// If not already initialized in your main index.ts, you might need:
// admin.initializeApp();

const db = admin.firestore();
const messaging = getMessaging();

export const sendDailyMeditationReminder = onSchedule({
  schedule: 'every day 09:00', // Adjust schedule as needed
  timeZone: 'Europe/Berlin', // Adjust timezone as needed
  retryCount: 3,
  memory: '256MiB',
  region: 'europe-west1' // Ensure this matches your function deployment region
}, async (event: ScheduledEvent) => {
  logger.info('Executing sendDailyMeditationReminder function', { structuredData: true });

  try {
    // 1. Query users who have reminders enabled
    const usersSnapshot = await db.collection('users')
      .where('settings.notifications.reminders', '==', true)
      .get();

    if (usersSnapshot.empty) {
      logger.info('No users found with reminders enabled.');
      return;
    }

    const tokens: string[] = [];
    usersSnapshot.forEach(doc => {
      const userData = doc.data();
      // Assuming FCM tokens are stored in an array field 'fcmTokens'
      if (userData.fcmTokens && Array.isArray(userData.fcmTokens) && userData.fcmTokens.length > 0) {
        tokens.push(...userData.fcmTokens);
      } else {
        logger.warn(`User ${doc.id} has reminders enabled but no FCM tokens found.`);
      }
    });

    if (tokens.length === 0) {
      logger.info('No valid FCM tokens found for users with reminders enabled.');
      return;
    }

    // 2. Construct the notification message
    const message: MulticastMessage = {
      notification: {
        title: 'Mindful Moment Reminder',
        body: 'Time for your daily meditation practice. Find peace and clarity.',
      },
      // Add other options like data payload if needed
      // data: { /* your custom data */ },
      tokens: tokens, // Use multicast for efficiency
    };

    // 3. Send the notification
    logger.info(`Sending reminders to ${tokens.length} tokens.`);
    const response = await messaging.sendEachForMulticast(message); // Use sendEachForMulticast for detailed results

    // 4. Log results and handle potential token cleanup
    logger.info(`Successfully sent ${response.successCount} messages.`);
    if (response.failureCount > 0) {
      logger.warn(`Failed to send ${response.failureCount} messages.`);
      const failedTokens: string[] = [];
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          failedTokens.push(tokens[idx]);
          logger.error(`Token failed: ${tokens[idx]}, Error: ${resp.error}`);
          // Consider implementing logic here to remove invalid/unregistered tokens
          // from the user's document in Firestore based on error codes.
          // e.g., if error code indicates 'unregistere d' or 'invalid-argument'
        }
      });
      // TODO: Implement token cleanup logic if necessary
      logger.warn('Failed tokens:', failedTokens);
    }

  } catch (error) {
    logger.error('Error sending meditation reminders:', error);
    // Consider re-throwing or handling specific errors if needed
  }
});
