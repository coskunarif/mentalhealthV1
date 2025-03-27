import type { IconName } from '../components/MoodSelector'; // Import IconName
import { theme } from '../config/theme'; // Import theme

// Define the specific type for mood keys based on the theme
export type MoodKey = keyof typeof theme.moodColors;

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

// Represents the definition of a mood type (e.g., Shame, Guilt)
export interface MoodDefinition {
  id: string; // Firestore document ID
  name: string; // The display name (e.g., "Shame") - used for sorting/display
  key: MoodKey; // Use the specific MoodKey type derived from theme
  icon: IconName; // Use the specific IconName type
  // Add other definition fields if needed (e.g., description, default value)
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

// Represents the definition of an emotion for the pyramid/focus selection
export interface EmotionDefinition {
  id: string; // Firestore document ID
  name: string; // The display name (e.g., "Peace")
  moodKey: MoodKey; // Key to link to theme.moodColors
  pyramidOrder: number; // Order for display in the pyramid
  // Add other definition fields if needed
}

// Remove the default export if not needed, or keep if other parts rely on it.
// export default {};
