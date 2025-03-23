// app/services/firebase-functions.ts
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '../lib/firebase/firebase';

// Get a reference to the functions service
const functions = getFunctions(app);
// Set the region to match your server configuration
functions.region = 'europe-west1';

// Define types for your function responses
interface UserStatsResponse {
  success: boolean;
  stats: {
    profile: {
      displayName: string;
      photoURL: string;
      createdAt: any;
      streak: number;
    };
    meditation: {
      totalTime: number;
      sessions: number;
    };
    activities: {
      exercisesCompleted: number;
      surveysCompleted: number;
      recentActivities: any[];
    };
    mood: {
      recentMoods: any[];
    };
  };
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

// Add other functions as needed


export default {};
