import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { onUserCreate } from './auth/onUserCreate';
import { dailyStats } from './scheduled/dailyStats';
import { generateMoodInsights } from './api/insights';
import { getUserStats } from './api/userStats';
import { sendDailyMeditationReminder } from './scheduled/notificationManager';

// Initialize Firebase Admin
admin.initializeApp();

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