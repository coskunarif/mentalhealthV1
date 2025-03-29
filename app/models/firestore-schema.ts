// firestore-schema.ts
import * as admin from 'firebase-admin'; // Use firebase-admin types for server-side/scripts
// For client-side code, you might use types from 'firebase/firestore'

// Define Firestore schema interfaces

// Base interface for documents that might have an ID when fetched
export interface FirestoreDocument {
  id?: string; // Optional ID, usually added after fetching
}

// User document structure in the 'users' collection
export interface User extends FirestoreDocument {
  // id corresponds to Firebase Auth UID
  uid: string; // Explicitly storing UID might be redundant if doc ID is UID
  email: string;
  displayName: string;
  photoURL?: string | null; // Allow null if that's possible
  createdAt: admin.firestore.Timestamp;
  updatedAt: admin.firestore.Timestamp;
  settings: {
    notifications: {
      reminders: boolean;
      progress: boolean;
      tips: boolean;
      community: boolean; // Added based on validation script check
    };
    language: string; // e.g., 'en', 'es'
    theme: 'light' | 'dark' | 'system';
  };
  stats: {
    exercisesCompleted: number;
    streak: number; // Current consecutive days streak
    surveysCompleted: number;
    lastActiveDate: admin.firestore.Timestamp | null; // Track last activity
  };
  subscription?: { // Optional subscription details
    plan: string; // e.g., 'free', 'premium'
    price?: string; // Optional price info
    status?: 'active' | 'canceled' | 'past_due'; // Optional status
    startedAt?: admin.firestore.Timestamp;
    expiresAt?: admin.firestore.Timestamp | null;
    updatedAt: admin.firestore.Timestamp; // Last update to subscription info
  };
  // Add any other user-specific fields here
}

// Exercise document structure in the 'exercises' collection
export interface Exercise extends FirestoreDocument {
  title: string;
  duration: number; // Duration in minutes
  category: 'breathing' | 'mindfulness' | 'compassion' | 'relaxation'; // Enforce specific categories
  description: string;
  order: number; // For ordering exercises in lists
  // isCompleted?: boolean; // This seems like user-specific state, better in user subcollection?
  // Consider adding fields like: audioUrl, videoUrl, difficulty, tags
}


// Mood entry document structure in the 'moods' collection
export interface MoodEntry extends FirestoreDocument {
  userId: string; // Reference to the User document ID (Auth UID)
  timestamp: admin.firestore.Timestamp; // When the mood was recorded
  mood: string; // The selected mood label (e.g., 'Happy', 'Sad', 'Anxious') - ensure consistency with MoodPyramid
  value: number; // Numerical value (e.g., 0-100) associated with the mood
  duration?: number; // Optional: How long the mood lasted (in minutes/hours?)
  factors?: string[]; // Optional: Contributing factors (e.g., 'Work', 'Sleep', 'Social')
  notes?: string; // Optional: User's textual notes about the mood
  createdAt?: admin.firestore.Timestamp; // Optional: Server timestamp when doc was created
}

// Survey response document structure in the 'surveys' collection
export interface SurveyResponse extends FirestoreDocument {
  userId: string; // Reference to the User document ID (Auth UID)
  surveyId?: string; // Optional: Identifier for the specific survey taken
  timestamp: admin.firestore.Timestamp; // When the survey was completed
  responses: (string | number | boolean | null)[]; // Array of answers (mixed types possible)
  questions?: string[]; // Optional: The questions asked (can be useful for context)
  createdAt?: admin.firestore.Timestamp; // Optional: Server timestamp when doc was created
}

// Daily statistics document structure in the 'stats' collection (doc ID might be 'YYYY-MM-DD')
export interface DailyStats extends FirestoreDocument {
  // id: 'YYYY-MM-DD'
  date: string; // 'YYYY-MM-DD' format string
  activeUsers: number; // Count of users active on this day
  newUsers: number; // Count of new users registered on this day
  exercisesCompleted: number; // Total exercises completed across all users
  surveysCompleted: number; // Total surveys completed across all users
  timestamp: admin.firestore.Timestamp; // When this stats document was last updated/created
  // Add other aggregated stats as needed
}

// User progress document structure in 'users/{userId}/progress/overview'
export interface UserProgress extends FirestoreDocument {
  // id: 'overview'
  overall: number; // Overall progress score (e.g., 0-100)
  categories: Record<string, number>; // Progress score per category (e.g., { breathing: 75, mindfulness: 60 })
  lastUpdated: admin.firestore.Timestamp; // When this progress data was last calculated/updated
}

// User activity document structure in 'users/{userId}/activities' subcollection
export interface UserActivity extends FirestoreDocument {
  // userId is implicitly the parent document ID
  type: 'exercise' | 'mood' | 'survey';
  timestamp: admin.firestore.Timestamp; // When the activity occurred or was logged
  date?: string; // Optional 'YYYY-MM-DD' string for easier querying by date
  details?: { // Optional details specific to the activity type
    title?: string; // e.g., Exercise title
    itemId?: string; // e.g., ID of the Exercise document
    duration?: number; // e.g., Duration of exercise in minutes
    mood?: string; // e.g., Mood recorded
    moodValue?: number; // e.g., Value associated with mood
    surveyId?: string; // e.g., ID of the survey taken
    // Add other relevant details based on 'type'
    [key: string]: any; // Allow other arbitrary details
  };
}
