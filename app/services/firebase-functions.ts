// Updated implementation that only uses client-safe Firebase functions
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '../lib/firebase/client';

// Initialize functions with region
const functions = getFunctions(app, 'europe-west1');

// Type definitions for function results
export interface MoodInsightsRequest {
  timeframe: 'week' | 'month' | 'year';
}

export interface MoodInsightsResponse {
  success: boolean;
  insights: {
    period: string;
    entriesCount: number;
    averageMood: number;
    moodAverages: Record<string, number>;
    topMood: string;
    highestMood: { type: string; value: number };
    lowestMood: { type: string; value: number };
    moodsByDay: Record<string, number>;
  } | null;
  message: string;
}

export interface UserStatsResponse {
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

// Define callable functions with proper types
export const clientFunctions = {
  generateMoodInsights: httpsCallable<MoodInsightsRequest, MoodInsightsResponse>(
    functions, 
    'generateMoodInsights'
  ),
  getUserStats: httpsCallable<void, UserStatsResponse>(
    functions, 
    'getUserStats'
  )
};

// Service wrapper for mood insights
export const moodService = {
  generateInsights: async (timeframe: 'week' | 'month' | 'year'): Promise<MoodInsightsResponse> => {
    try {
      console.log(`Calling generateMoodInsights with timeframe: ${timeframe}`);
      const result = await clientFunctions.generateMoodInsights({ timeframe });
      return result.data;
    } catch (error: any) {
      console.error('Error generating mood insights:', error);
      // Fallback to mock data for development
      return {
        success: false,
        insights: null,
        message: error.message || 'Failed to generate insights'
      };
    }
  }
};

// Service wrapper for user stats
export const userService = {
  getStats: async (): Promise<UserStatsResponse> => {
    try {
      console.log('Calling getUserStats');
      const result = await clientFunctions.getUserStats();
      return result.data;
    } catch (error: any) {
      console.error('Error getting user stats:', error);
      // Fallback to mock data for development
      return {
        success: false,
        stats: {
          profile: {
            displayName: 'User',
            photoURL: '',
            createdAt: new Date(),
            streak: 0
          },
          meditation: {
            totalTime: 0,
            sessions: 0
          },
          activities: {
            exercisesCompleted: 0,
            surveysCompleted: 0,
            recentActivities: []
          },
          mood: {
            recentMoods: []
          }
        }
      };
    }
  }
};

export default { moodService, userService, clientFunctions };
