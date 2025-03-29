import { httpsCallable, HttpsCallableResult } from 'firebase/functions';
import { functions } from '../lib/firebase-utils'; // Import the configured functions instance

// Define types for your function responses
interface UserStatsResponse {
  success: boolean;
  stats: any;
}

interface MoodInsightsResponse {
  success: boolean;
  insights: any;
  message: string;
}

// Client-side callable functions
export const getUserStats = httpsCallable<void, UserStatsResponse>(
  functions, 
  'getUserStats'
);

export const generateMoodInsights = httpsCallable<
  { timeframe: 'week' | 'month' | 'year' }, 
  MoodInsightsResponse
>(
  functions, 
  'generateMoodInsights'
);

// Add this for the new function
export const ensureUserDocument = httpsCallable<void, {success: boolean, message: string}>(
  functions, 
  'ensureUserDocument'
);

export default {};
