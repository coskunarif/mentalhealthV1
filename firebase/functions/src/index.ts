import * as admin from 'firebase-admin';
import { onUserCreate } from './auth/onUserCreate';
import { dailyStats } from './scheduled/dailyStats';
import { generateMoodInsights } from './api/insights';

// Initialize Firebase Admin
admin.initializeApp();

// Export all functions
export {
  onUserCreate,
  dailyStats,
  generateMoodInsights
};