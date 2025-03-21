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
  meditationMinutes: number;
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
  phoneNumber?: string;
  dateOfBirth?: string;
  sessions?: number;
  streak?: number;
  surveys?: number;
}

export interface PersonalInformation {
  name: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: string;
}
export default {};
