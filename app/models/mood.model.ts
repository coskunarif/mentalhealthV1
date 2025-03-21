// Mood tracking model

export interface MoodEntry {
  id?: string;
  userId: string;
  timestamp: Date;
  mood: string;
  value: number;
  duration: number;
  factors?: string[];
  notes?: string;
}

export interface MoodInsights {
  period: string;
  entriesCount: number;
  averageMood: number;
  moodAverages: { [key: string]: number };
  topMood: string;
  highestMood: { type: string; value: number };
  lowestMood: { type: string; value: number };
  moodsByDay: { [key: string]: number };
}

export interface MoodInsightsResponse {
  success: boolean;
  insights: MoodInsights | null;
  message: string;
}

export default {};
