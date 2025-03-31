import * as functions from 'firebase-functions/v1';
import * as admin from 'firebase-admin';

// Use v1 auth trigger with European region
export const onUserCreate = functions
  .region('europe-west1')
  .auth.user()
  // Add type for user parameter
  .onCreate(async (user: functions.auth.UserRecord) => {
    try {
      const timestamp = admin.firestore.FieldValue.serverTimestamp();

      // Simple user profile creation
      await admin.firestore().collection('users').doc(user.uid).set({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
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
            // Removed meditationMinutes
            exercisesCompleted: 0,
            streak: 0,
            surveysCompleted: 0,
          lastActiveDate: null
        }
      });

      // Use functions logger instead of console
      functions.logger.log(`User profile created for ${user.uid}`);
      return null;
    } catch (error) {
      // Use functions logger instead of console
      functions.logger.error('Error creating user profile:', error);
      throw error;
    }
  });
