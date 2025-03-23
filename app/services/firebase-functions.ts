import { getFunctions, httpsCallable, HttpsCallableResult } from 'firebase/functions';
import { app } from '../lib/firebase-utils';

const functions = getFunctions(app);

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

export default {};
