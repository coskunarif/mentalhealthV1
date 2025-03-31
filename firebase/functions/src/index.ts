import * as admin from 'firebase-admin';
import { setGlobalOptions } from 'firebase-functions/v2';
import { logger } from 'firebase-functions/v2'; // Import logger

// Log environment variables before initializing admin
logger.info('Firebase/GCP Environment Variables:', {
  FIREBASE_CONFIG: process.env.FIREBASE_CONFIG,
  GOOGLE_CLOUD_PROJECT: process.env.GOOGLE_CLOUD_PROJECT,
  FUNCTION_REGION: process.env.FUNCTION_REGION,
  FUNCTION_TARGET: process.env.FUNCTION_TARGET,
  FUNCTION_SIGNATURE_TYPE: process.env.FUNCTION_SIGNATURE_TYPE,
  K_SERVICE: process.env.K_SERVICE,
  K_REVISION: process.env.K_REVISION,
  PORT: process.env.PORT
});

// Initialize Firebase Admin first (important for hybrid approach)
admin.initializeApp();
logger.info('Firebase Admin Initialized.'); // Log after init

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
