import { doc, getDoc, updateDoc, setDoc, onSnapshot, Unsubscribe, collection } from 'firebase/firestore';
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
   * Update user settings
   */
  static async updateUserSettings(userId: string, settings: Partial<UserSettings>): Promise<void> {
    try {
      if (!userId) throw new Error('User ID is required');
      
      const userRef = doc(db, 'users', userId);
      
      await updateDoc(userRef, {
        'settings': settings,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating user settings:', error);
      throw error;
    }
  }
  
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

      const functions = getFunctions(app!);
      const getStats = httpsCallable<unknown, UserStatsResponse>(functions, 'getUserStats');
      
      const result = await getStats();
      if (result.data.success) {
        return result.data.stats;
      } else {
        throw new Error('Failed to get user stats');
      }
    } catch (error) {
      console.error('Error getting user stats:', error);
      throw error;
    }
  }
}

export default UserService;
