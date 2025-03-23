import { collection, addDoc, query, where, orderBy, getDocs, doc, updateDoc, setDoc, increment } from 'firebase/firestore';
import { db } from '../lib/firebase-utils';

export class SurveyService {
  /**
   * Save a survey response
   */
  static async saveSurveyResponse(survey: {
    userId: string,
    timestamp: Date,
    responses: (string | undefined)[]
  }): Promise<string> {
    try {
      if (!survey.userId) throw new Error('User ID is required');
      
      // Filter out undefined responses
      const validResponses = survey.responses.map(r => r || 'No response');
      
      const surveyData = {
        userId: survey.userId,
        timestamp: survey.timestamp,
        responses: validResponses,
        createdAt: new Date()
      };
      
      // Add to surveys collection
      const docRef = await addDoc(collection(db, 'surveys'), surveyData);
      
      // Update user stats
      const userRef = doc(db, 'users', survey.userId);
      await updateDoc(userRef, {
        'stats.surveysCompleted': increment(1)
      });
      
      // Track the activity
      await this.trackSurveyActivity(survey.userId, survey.timestamp);
      
      return docRef.id;
    } catch (error) {
      console.error('Error saving survey response:', error);
      throw error;
    }
  }
  
  /**
   * Track survey completion in activities
   */
  private static async trackSurveyActivity(userId: string, timestamp: Date): Promise<void> {
    try {
      const activityRef = doc(collection(db, 'users', userId, 'activities'));
      const today = timestamp.toISOString().split('T')[0];
      
      await setDoc(activityRef, {
        userId,
        type: 'survey',
        timestamp,
        date: today,
        details: {
          title: 'Completed Wellness Survey',
          subtitle: 'Daily Check-in'
        }
      });
    } catch (error) {
      console.error('Error tracking survey activity:', error);
    }
  }
}
export default SurveyService;
