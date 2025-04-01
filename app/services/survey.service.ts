import { collection, addDoc, query, where, orderBy, getDocs, doc, updateDoc, setDoc, increment } from 'firebase/firestore';
import { db } from '../lib/firebase-utils';
import UserService from './user.service'; // Import UserService

export class SurveyService {
  /**
   * Save a survey response
   */
  static async saveSurveyResponse(survey: {
    userId: string,
    timestamp: Date,
    responses: (string | undefined)[],
    questions: string[] // Added questions field
  }): Promise<string> {
    try {
      if (!survey.userId) throw new Error('User ID is required');
      
      // Filter out undefined responses
      const validResponses = survey.responses.map(r => r || 'No response');
      
      const surveyData = {
        userId: survey.userId,
        timestamp: survey.timestamp,
        responses: validResponses,
        questions: survey.questions, // Added questions to data
        createdAt: new Date()
      };
      
      // Add to surveys collection
      const docRef = await addDoc(collection(db, 'surveys'), surveyData);
      
      // Update user stats
      const userRef = doc(db, 'users', survey.userId);
      await updateDoc(userRef, {
        'stats.surveysCompleted': increment(1)
      });
      
      // Track the activity using the central service
      await UserService.trackActivity({
        userId: survey.userId,
        type: 'survey',
        timestamp: survey.timestamp || new Date(),
        details: {
          title: 'Completed Wellness Survey',
          subtitle: 'Daily Check-in'
        }
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Error saving survey response:', error);
      throw error;
    }
  }
  
  // Removed the local trackSurveyActivity method as it's now handled by UserService
}
export default SurveyService;
