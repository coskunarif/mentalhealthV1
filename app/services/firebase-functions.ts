import { httpsCallable } from 'firebase/functions';
import { functions } from '../lib/firebase/client';

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

export const moodService = {
  generateInsights: async (timeframe: 'week' | 'month' | 'year'): Promise<MoodInsightsResponse> => {
    try {
      const result = await clientFunctions.generateMoodInsights({ timeframe });
      return result.data;
    } catch (error) {
      console.error('Error generating mood insights:', error);
      throw error;
    }
  }
};

export const userService = {
  getStats: async (): Promise<UserStatsResponse> => {
    try {
      const result = await clientFunctions.getUserStats();
      return result.data;
    } catch (error) {
      console.error('Error getting user stats:', error);
      throw error;
    }
  }
};