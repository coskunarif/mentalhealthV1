import { collection, addDoc, query, where, orderBy, getDocs, doc, updateDoc, deleteDoc, limit } from 'firebase/firestore';
import { db } from '../lib/firebase-utils';
import { Timestamp, queryDocuments, getDocument } from '../lib/firebase-utils/firestore';
import { MoodEntry, MoodInsights, MoodInsightsResponse } from '../models/mood.model';
import { getFunctions, httpsCallable, HttpsCallableResult } from '@firebase/functions';
import { app } from '../lib/firebase-utils';

const functions = getFunctions(app!);
const moodService = {
  generateInsights: httpsCallable<unknown, MoodInsightsResponse>(functions, 'generateMoodInsights'),
};

// Updated to use the new client SDK
export const moodServiceUpdated = {
  generateInsights: moodService.generateInsights,
};

export class MoodService {
  static async saveMoodEntry(entry: {
    userId: string, 
    timestamp: Date, 
    mood: string, 
    value: number,
    duration?: number,
    factors?: string[],
    notes?: string
  }): Promise<string> {
    try {
      console.log('Saving mood entry:', JSON.stringify(entry, null, 2));
      // Ensure duration exists (required field)
      const entryData = {
        ...entry,
        duration: entry.duration || 0,
        timestamp: Timestamp.fromDate(entry.timestamp || new Date()),
        createdAt: Timestamp.fromDate(new Date())
      };
      
      console.log('Formatted entry data:', JSON.stringify(entryData, null, 2));
      
      const docRef = await addDoc(collection(db, 'moods'), entryData);
      console.log('Successfully saved mood entry with ID:', docRef.id);
      return docRef.id;
    } catch (error: any) { // Added ': any' to type error for accessing properties
      console.error('Error saving mood entry:', error);
      // Log detailed error info if available
      if (error && typeof error === 'object' && 'code' in error && 'message' in error) {
        console.error('Error details:', error.code, error.message);
      }
      throw error;
    }
  }

  static async updateMoodEntry(id: string, updates: Partial<MoodEntry>): Promise<void> {
    try {
      const moodRef = doc(db, 'moods', id);
      const updateData: any = {
        ...updates,
        updatedAt: Timestamp.fromDate(new Date())
      };
      if (updates.timestamp && !(updates.timestamp instanceof Timestamp)) {
        updateData.timestamp = Timestamp.fromDate(new Date(updates.timestamp));
      }
      await updateDoc(moodRef, updateData);
    } catch (error) {
      console.error('Error updating mood entry:', error);
      throw error;
    }
  }

  static async deleteMoodEntry(id: string): Promise<void> {
    try {
      const moodRef = doc(db, 'moods', id);
      await deleteDoc(moodRef);
    } catch (error) {
      console.error('Error deleting mood entry:', error);
      throw error;
    }
  }

  static async getMoodEntries(userId: string, days: number = 30): Promise<MoodEntry[]> {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      return queryDocuments<MoodEntry>('moods', [
        where('userId', '==', userId),
        where('timestamp', '>=', Timestamp.fromDate(startDate)),
        orderBy('timestamp', 'desc')
      ]);
    } catch (error) {
      console.error('Error getting mood entries:', error);
      throw error;
    }
  }

  static async getLatestMoodEntry(userId: string): Promise<MoodEntry | null> {
    try {
      const entries = await queryDocuments<MoodEntry>('moods', [
        where('userId', '==', userId),
        orderBy('timestamp', 'desc'),
        limit(1)
      ]);
      return entries.length > 0 ? entries[0] : null;
    } catch (error) {
      console.error('Error getting latest mood entry:', error);
      throw error;
    }
  }

  static async generateInsights(userId: string, timeframe: 'week' | 'month' | 'year' = 'week'): Promise<MoodInsights> {
    try {
      const result = await moodService.generateInsights({ timeframe });
      if (result.data.success && result.data.insights) {
        return result.data.insights;
      } else {
        throw new Error(result.data.message || 'Failed to generate insights');
      }
    } catch (error) {
      console.error('Error generating mood insights:', error);
      throw error;
    }
  }
}
export default MoodService;
