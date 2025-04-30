// User profile model

export interface UserSettings {
  notifications: {
    reminders: boolean;
    progress: boolean;
    tips: boolean;
    community: boolean;
  };
  language: string;
  theme: 'light' | 'dark' | 'system';
}

export interface UserStats {
  exercisesCompleted: number;
  streak: number;
  surveysCompleted: number;
  lastActiveDate: Date | null;
}

export interface UserModel {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  createdAt: Date;
  updatedAt: Date;
  settings: UserSettings;
  stats: UserStats;
  initialSurveyCompleted: boolean; // Indicates if the user has completed the initial registration survey
  phoneNumber?: string;
  dateOfBirth?: string;
  // Remove sessions field
  streak?: number;
  surveys?: number;
}

export interface PersonalInformation {
  name: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: string;
}

export interface UserActivity {
  id?: string;
  userId: string;
  type: 'exercise' | 'mood' | 'survey';
  timestamp: Date;
  date: string; // YYYY-MM-DD format
  details?: {
    title?: string;
    subtitle?: string;
    duration?: number;
    value?: number;
    itemId?: string;
    factors?: string[];
    [key: string]: any;
  };
}

export default {};
