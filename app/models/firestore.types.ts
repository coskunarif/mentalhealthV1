import { Timestamp } from 'firebase/firestore';

// Common base type for all documents
export interface FirestoreDocument {
  id?: string;
}

export interface UserProfile extends FirestoreDocument {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  settings: {
    notifications: {
      reminders: boolean;
      progress: boolean;
      tips: boolean;
      community: boolean;
    };
    language: string;
    theme: 'light' | 'dark' | 'system';
  };
  stats: {
    meditationMinutes: number;
    exercisesCompleted: number;
    streak: number;
    surveysCompleted: number;
    lastActiveDate: Timestamp | null;
  };
  fcmToken?: string;
}

export interface MoodEntry extends FirestoreDocument {
  userId: string;
  timestamp: Timestamp;
  mood: string;
  value: number;
  duration: number;
  factors?: string[];
  notes?: string;
}
export default {};
