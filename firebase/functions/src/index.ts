import * as admin from 'firebase-admin';
import { setGlobalOptions } from 'firebase-functions/v2';
import { onUserCreate } from './auth/onUserCreate';
import { dailyStats } from './scheduled/dailyStats';
import { generateMoodInsights } from './api/insights';
import { getUserStats } from './api/userStats';
import { sendDailyMeditationReminder } from './scheduled/notificationManager';

// Initialize Firebase Admin
admin.initializeApp();

// Set global options for all functions
setGlobalOptions({
  region: 'us-central1',
  maxInstances: 10,
  minInstances: 0,
  timeoutSeconds: 60
});

// Export all functions
export {
  // Auth functions
  onUserCreate,
  
  // Scheduled functions
  dailyStats,
  sendDailyMeditationReminder,
  
  // Callable API functions
  generateMoodInsights,
  getUserStats
};
