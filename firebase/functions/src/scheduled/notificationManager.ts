import { onSchedule, ScheduledEvent } from 'firebase-functions/v2/scheduler'; // Import ScheduledEvent
import { logger } from 'firebase-functions/v2';
import * as admin from 'firebase-admin';
import { getMessaging } from 'firebase-admin/messaging';

export const sendDailyMeditationReminder = onSchedule({
  schedule: 'every day 09:00',
  timeZone: 'Europe/Berlin',
  retryCount: 3,
  memory: '256MiB',
  region: 'europe-west1'
// Add type for event parameter
}, async (event: ScheduledEvent) => {
  try {
    // Simple placeholder implementation
    logger.info('Notification function executed');
    return;
  } catch (error) {
    logger.error('Error sending meditation reminders:', error);
    return;
  }
});
