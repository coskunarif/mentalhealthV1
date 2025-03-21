import { setGlobalOptions } from 'firebase-functions/v2';
import * as admin from 'firebase-admin';

setGlobalOptions({
  region: 'us-central1',
  maxInstances: 10,
  minInstances: 0,
  timeoutSeconds: 60,
  memory: '256MiB',
  concurrency: 80
});

import { onUserCreated } from './auth/onUserCreate';
import { dailyStats } from './scheduled/dailyStats';
import { generateMoodInsights } from './api/insights';
import { getUserStats } from './api/userStats';
import { sendDailyMeditationReminder } from './scheduled/notificationManager';

// Initialize Firebase Admin
admin.initializeApp();

// Export all functions
export {
  // Auth functions
  onUserCreated,
  
  // Scheduled functions
  dailyStats,
  sendDailyMeditationReminder,
  
  // Callable API functions
  generateMoodInsights,
  getUserStats
};
