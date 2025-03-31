import { httpsCallable, HttpsCallableResult, getFunctions } from 'firebase/functions'; // Added getFunctions import
import { app } from '../lib/firebase'; // Import only the 'app' instance

// Initialize functions directly here, specifying the region
export const functions = getFunctions(app, 'europe-west1'); // Export this instance

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
