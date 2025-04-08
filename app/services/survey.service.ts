import { collection, addDoc, query, where, orderBy, getDocs, doc, getDoc, setDoc, increment, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase-utils';
import UserService from './user.service';
import { SurveyTemplate, SurveyResponse } from '../models/survey.model';

export class SurveyService {
  /**
   * Get a survey template by ID
   */
  static async getSurveyTemplate(templateId: string): Promise<SurveyTemplate | null> {
    try {
      const templateRef = doc(db, 'surveyTemplates', templateId);
      const templateDoc = await getDoc(templateRef);
      
      if (templateDoc.exists()) {
        return {
          id: templateDoc.id,
          ...templateDoc.data()
        } as SurveyTemplate;
      }
      return null;
    } catch (error) {
      console.error('Error fetching survey template:', error);
      throw error;
    }
  }

  /**
   * Get all active survey templates
   */
  static async getActiveSurveyTemplates(): Promise<SurveyTemplate[]> {
    try {
      const templatesQuery = query(
        collection(db, 'surveyTemplates'),
        where('active', '==', true),
        orderBy('createdAt', 'desc')
      );
      
      const snapshot = await getDocs(templatesQuery);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as SurveyTemplate));
    } catch (error) {
      console.error('Error fetching survey templates:', error);
      return [];
    }
  }

  /**
   * Get the default daily survey template
   * Falls back to returning null if not found
   */
  static async getDailySurveyTemplate(): Promise<SurveyTemplate | null> {
    try {
      return await this.getSurveyTemplate('daily');
    } catch (error) {
      console.error('Error fetching daily survey template:', error);
      return null;
    }
  }

  /**
   * Save a survey response
   */
  static async saveSurveyResponse(survey: {
    userId: string,
    templateId?: string,
    timestamp: Date,
    responses: { [questionId: string]: any },
    questions?: string[] // Added questions field
  }): Promise<string> {
    try {
      if (!survey.userId) throw new Error('User ID is required');
      
      // Set default templateId if not provided
      const templateId = survey.templateId || 'daily';
      
      // Format the survey data
      const surveyData: Partial<SurveyResponse> & { userId: string } = {
        userId: survey.userId,
        templateId,
        timestamp: survey.timestamp,
        responses: survey.responses,
        questions: survey.questions, // Added questions to data
        createdAt: new Date()
      };
      
      // Add to surveys collection
      const docRef = await addDoc(collection(db, 'surveys'), surveyData);
      
      // Update user stats
      const userRef = doc(db, 'users', survey.userId);
      await setDoc(userRef, {
        'stats.surveysCompleted': increment(1),
        'updatedAt': Timestamp.fromDate(new Date())
      }, { merge: true });
      
      // Track the activity using the central service
      await UserService.trackActivity({
        userId: survey.userId,
        type: 'survey',
        timestamp: survey.timestamp || new Date(),
        details: {
          title: 'Completed Wellness Survey',
          subtitle: `Survey ID: ${templateId}`
        }
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Error saving survey response:', error);
      throw error;
    }
  }
}

export default SurveyService;
