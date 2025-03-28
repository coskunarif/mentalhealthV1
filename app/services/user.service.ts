import { doc, getDoc, updateDoc, setDoc, onSnapshot, Unsubscribe, collection, writeBatch } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { auth, db, storage, app } from '../lib/firebase-utils';
import { UserModel, PersonalInformation, UserSettings } from '../models/user.model';
import { getFunctions, httpsCallable, HttpsCallableResult } from 'firebase/functions';
import { UserStatsResponse } from '../models/user-stats.model';

// User operations

export class UserService {
  /**
   * Get user profile data
   */
  static async getUserProfile(userId: string | undefined): Promise<UserModel | null> {
    try {
      if (!userId) {
        return null;
      }

      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        return userDoc.data() as UserModel;
      }
      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  }
  
  /**
   * Subscribe to user profile changes
   */
  static subscribeToUserProfile(userId: string, callback: (user: UserModel | null) => void): Unsubscribe {
    const userRef = doc(db, 'users', userId);
    
    return onSnapshot(userRef, (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.data() as UserModel);
      } else {
        callback(null);
      }
    }, (error) => {
      console.error('Error subscribing to user profile:', error);
      callback(null);
    });
  }
  
  /**
   * Update user personal information
   */
  static async updatePersonalInfo(userId: string, info: PersonalInformation): Promise<void> {
    try {
      if (!userId) throw new Error('User ID is required');
      
      const userRef = doc(db, 'users', userId);
      
      await updateDoc(userRef, {
        displayName: info.name,
        phoneNumber: info.phoneNumber || null,
        dateOfBirth: info.dateOfBirth || null,
        updatedAt: new Date()
      });
      
      // Also update Auth profile display name
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: info.name
        });
      }
    } catch (error) {
      console.error('Error updating personal info:', error);
      throw error;
    }
  }

  /**
   * Get user settings
   */
  static async getUserSettings(userId: string): Promise<UserSettings | null> {
    try {
      if (!userId) throw new Error('User ID is required');

      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data() as UserModel;
        // Return settings object, or a default if not present
        return userData.settings || {
          notifications: {
            reminders: true, // Default values
            recommendations: true,
            updates: false,
          },
          // Add other default settings categories if needed
        };
      }
      return null; // Or return default settings if user doc doesn't exist? Depends on requirements.
    } catch (error) {
      console.error('Error getting user settings:', error);
      throw error;
    }
  }

  // Corrected updateUserSettings using dot notation
  static async updateUserSettings(userId: string, settingsUpdate: Partial<UserSettings>): Promise<void> {
    try {
      if (!userId) throw new Error('User ID is required');
      const userRef = doc(db, 'users', userId);

      // Prepare update data using dot notation for nested fields
      const updateData: { [key: string]: any } = {};
      // Example: If settingsUpdate is { notifications: { reminders: false } }
      // We need to generate {'settings.notifications.reminders': false}
      const flattenSettings = (obj: any, prefix = '', res: { [key: string]: any } = {}) => {
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const newKey = prefix ? `${prefix}.${key}` : key;
            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) { // Check if it's a nested object (and not an array)
              flattenSettings(obj[key], newKey, res);
            } else {
              res[`settings.${newKey}`] = obj[key]; // Prepend 'settings.' for Firestore field path
            }
          }
        }
        return res;
      };

      const flattenedUpdate = flattenSettings(settingsUpdate);
      flattenedUpdate['updatedAt'] = new Date(); // Also update the main doc timestamp

      if (Object.keys(flattenedUpdate).length > 1) { // Ensure there's something to update besides timestamp
         await updateDoc(userRef, flattenedUpdate);
      } else {
         console.warn("No settings provided to update.");
      }

    } catch (error) {
      console.error('Error updating user settings:', error);
      throw error;
    }
  }

  // Removed duplicated uploadProfilePicture function
  
  /**
   * Upload profile picture
   */
  static async uploadProfilePicture(userId: string, file: Blob): Promise<string> {
    try {
      if (!userId) throw new Error('User ID is required');
      
      // Create reference to user profile picture
      const storageRef = ref(storage, `users/${userId}/profile/avatar.jpg`);
      
      // Upload file
      await uploadBytes(storageRef, file);
      
      // Get download URL
      const photoURL = await getDownloadURL(storageRef);
      
      // Update user profile
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        photoURL,
        updatedAt: new Date()
      });
      
      // Also update Auth profile photo
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          photoURL
        });
      }
      
      return photoURL;
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      throw error;
    }
  }
  
  /**
   * Track user activity
   */
  static async trackActivity(activity: {
    userId: string,
    type: string,
    timestamp: Date,
    details?: any
  }): Promise<void> {
    try {
      if (!activity.userId) throw new Error('User ID is required');
      
      const activityRef = doc(collection(db, 'users', activity.userId, 'activities'));
      const today = activity.timestamp.toISOString().split('T')[0];
      
      await setDoc(activityRef, {
        userId: activity.userId,
        type: activity.type,
        details: activity.details || {},
        timestamp: activity.timestamp,
        date: today
      });
    } catch (error) {
      console.error('Error tracking user activity:', error);
    }
  }

  /**
   * Get user's subscription status
   */
  static async getSubscriptionStatus(userId: string): Promise<{plan: string, price: string}> {
    try {
      if (!userId) throw new Error('User ID is required');
      
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        return { plan: 'No active plan', price: '' };
      }
      
      const userData = userDoc.data();
      return {
        plan: userData.subscription?.plan || 'No active plan',
        price: userData.subscription?.price || ''
      };
    } catch (error) {
      console.error('Error getting subscription status:', error);
      throw error;
    }
  }

  /**
   * Update user's subscription
   */
  static async updateSubscription(userId: string, subscription: {plan: string, price: string}): Promise<void> {
    try {
      if (!userId) throw new Error('User ID is required');
      
      const userRef = doc(db, 'users', userId);
      
      await updateDoc(userRef, {
        'subscription': subscription,
        'subscription.updatedAt': new Date()
      });
    } catch (error) {
      console.error('Error updating subscription:', error);
      throw error;
    }
  }

  /**
   * Get comprehensive user stats via Cloud Function
   */
  static async getUserDetailedStats(userId: string): Promise<UserStatsResponse['stats']> {
    try {
      if (!userId) throw new Error('User ID is required');
      console.log(`[DEBUG] Calling getUserStats for user: ${userId}`);
      
      // REMOVE this delay - it's unnecessary and can cause issues
      // await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get fresh token - KEEP this part
      if (auth.currentUser) {
        console.log(`[DEBUG] Current Auth user: ${auth.currentUser?.uid}, trying to get stats for: ${userId}`);
        try {
          await auth.currentUser.getIdToken(true); // Force refresh
          console.log('[DEBUG] Successfully refreshed ID token.');
        } catch (tokenError) {
          console.error('[DEBUG] Error refreshing ID token:', tokenError);
          throw new Error('Authentication token refresh failed');
        }
      } else {
        console.warn('[DEBUG] currentUser is null before calling function!');
        throw new Error('No authenticated user found');
      }

      // IMPORTANT CHANGE: Don't pass region here if it's already specified in the function config
      const functions = getFunctions(app); // Use the initialized app instance
      
      // CRITICAL CHANGE: Don't pass userId parameter
      const getStats = httpsCallable<void, UserStatsResponse>(
        functions, 
        'getUserStats'
      );

      console.log('[DEBUG] Calling Cloud Function (no params)...');
      // Call without parameters - the auth context will be passed automatically
      const result = await getStats();
      console.log('[DEBUG] Cloud Function returned result success status:', result.data.success);

      if (result.data.success) {
        return result.data.stats;
      } else {
        const errorMessage = (result.data as any)?.error || 'Failed to get user stats';
        console.error(`[DEBUG] Cloud function indicated failure: ${errorMessage}`);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('[DEBUG] Error getting user stats:', error);
      // Log the complete error object
      console.error('[DEBUG] Full error:', JSON.stringify(error));
      
      // Throw with a more specific error message but still propagate the original error
      throw new Error(`Error fetching detailed user stats: ${error}`);
    }
  }

  /**
   * Ensures a user document exists with default values
   */
  static async ensureUserDocument(userId: string): Promise<void> {
    try {
      if (!userId) throw new Error('User ID is required');
      
      // Add more logging
      console.log(`[DEBUG] Ensuring user document exists for ${userId}`);
      
      // Check if user document exists
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      // If document doesn't exist, create it with default values
      if (!userDoc.exists()) {
        console.log(`[DEBUG] User document doesn't exist, creating it for ${userId}`);
        const timestamp = new Date();
        const defaultUserData = {
          uid: userId,
          email: auth.currentUser?.email || '',
          displayName: auth.currentUser?.displayName || '',
          photoURL: auth.currentUser?.photoURL || '',
          createdAt: timestamp,
          updatedAt: timestamp,
          settings: {
            notifications: {
              reminders: true,
              progress: true,
              tips: true,
              community: false
            },
            language: 'en',
            theme: 'light'
          },
          stats: {
            meditationMinutes: 0,
            exercisesCompleted: 0,
            streak: 0,
            surveysCompleted: 0,
            lastActiveDate: null
          }
        };
        
        // Use try/catch specifically for the setDoc operation
        try {
          await setDoc(userRef, defaultUserData);
          console.log(`[DEBUG] Created user document for ${userId}`);
        } catch (writeError) {
          console.error(`[DEBUG] Error creating user document:`, writeError);
          throw writeError;
        }
        
        // Create required subcollections
        console.log(`[DEBUG] Creating subcollections for ${userId}`);
        const batch = writeBatch(db);
        
        // Create meditation progress document
        const meditationRef = doc(db, 'users', userId, 'progress', 'meditation');
        batch.set(meditationRef, {
          userId: userId,
          totalTime: 0,
          sessions: 0,
          createdAt: timestamp,
          updatedAt: timestamp
        });
        
        // Create progress overview document
        const overviewRef = doc(db, 'users', userId, 'progress', 'overview');
        batch.set(overviewRef, {
          overall: 0,
          categories: {},
          lastUpdated: timestamp
        });
        
        try {
          await batch.commit();
          console.log(`[DEBUG] Created subcollections for ${userId}`);
        } catch (batchError) {
          console.error(`[DEBUG] Error creating subcollections:`, batchError);
          throw batchError;
        }
      } else {
        console.log(`[DEBUG] User document already exists for ${userId}`);
      }
    } catch (error) {
      console.error('[DEBUG] Error ensuring user document:', error);
      throw error;
    }
  }
}

export default UserService;
