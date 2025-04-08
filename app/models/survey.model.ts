import { Timestamp } from 'firebase/firestore';

// Option presented to the user when answering a question
export interface SurveyOption {
  text: string;
  icon: string; // MaterialCommunityIcons name
  value: number; // Numeric value for analytics
}

// Single question in a survey
export interface SurveyQuestion {
  id: string; // Unique identifier for the question
  text: string; // Question text shown to user
  type: 'singleChoice' | 'multiChoice' | 'text' | 'scale'; // Question format
  order: number; // Display order within survey
  options: SurveyOption[]; // Available answer options
  required: boolean; // Whether user must answer
}

// Complete survey template
export interface SurveyTemplate {
  id: string; // Template identifier
  title: string; // Survey title
  description: string; // Description shown to users
  frequency: 'daily' | 'weekly' | 'monthly' | 'once'; // How often to present
  active: boolean; // Whether template is active
  createdAt: Timestamp; // When template was created
  updatedAt: Timestamp; // When template was last updated
  questions: SurveyQuestion[]; // Questions in this survey
}

// User's response to a survey
export interface SurveyResponse {
  id?: string; // Document ID (optional when creating)
  userId: string; // User who completed the survey
  templateId: string; // Reference to the template used
  timestamp: Date; // When survey was completed
  responses: { // Map of question IDs to responses
    [questionId: string]: string | number | string[]; // Different response types
  };
  questions?: string[]; // Question texts (for context)
  createdAt?: Date; // Server timestamp when doc was created
}

// Export default to maintain compatibility with existing imports
export default {};
