import { Timestamp } from 'firebase/firestore';

export interface MoodData {
  id: string;
  mood: string;
  value: number;
  timestamp: Timestamp;
  userId: string;
  factors?: string[];
  notes?: string;
}

export interface ActivityData {
  id: string;
  type: string;
  timestamp: Timestamp;
  details: {
    title?: string;
    subtitle?: string;
    duration?: number;
    [key: string]: any;
  };
  userId: string;
}

export interface UserStats {
  profile: {
    displayName: string;
    photoURL: string;
    createdAt: Timestamp;
    streak: number;
  };
  activities: {
    exercisesCompleted: number;
    surveysCompleted: number;
    recentActivities: ActivityData[];
  };
  mood: {
    recentMoods: MoodData[];
  };
  // Optional: Progress for each function category (0-100)
  functionCategories?: {
    balanceMemories?: number;
    changeOpinion?: number;
    supportDreams?: number;
    gainAwareness?: number;
    breatheUp?: number;
    [key: string]: number | undefined;
  };
}

export interface UserStatsResponse {
  success: boolean;
  stats: UserStats;
}

export default {};
