import * as admin from 'firebase-admin';
import { setGlobalOptions } from 'firebase-functions/v2';

// Initialize Firebase Admin first (important for hybrid approach)
admin.initializeApp();

// Set global options for v2 functions
setGlobalOptions({
  region: 'europe-west1',
  maxInstances: 10,
  minInstances: 0,
  timeoutSeconds: 60,
  memory: '256MiB',
  concurrency: 80
});

// Import v1 auth function
import { onUserCreate } from './auth/onUserCreate';

// Import v2 functions
import { dailyStats } from './scheduled/dailyStats';
import { generateMoodInsights } from './api/insights';
import { getUserStats, ensureUserDocument } from './api/userStats'; // Added ensureUserDocument
import { sendDailyExerciseReminder } from './scheduled/notificationManager'; // Renamed import

// Export all functions
export {
  // Auth function (v1)
  onUserCreate,
  
  // Scheduled functions (v2)
  dailyStats,
  sendDailyExerciseReminder, // Renamed export
  
  // Callable API functions (v2)
  generateMoodInsights,
  getUserStats,
  ensureUserDocument // Added ensureUserDocument
};
