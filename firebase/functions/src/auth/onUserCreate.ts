import * as functions from 'firebase-functions/v1';
import * as admin from 'firebase-admin';

// User provisioning

export const onUserCreate = functions.auth.user().onCreate(async (user) => {
  try {
    const timestamp = admin.firestore.FieldValue.serverTimestamp();

    // Create user profile in Firestore
    await admin.firestore().collection('users').doc(user.uid).set({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      createdAt: timestamp,
      updatedAt: timestamp,
      // Default user settings
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
      // Track stats
      stats: {
        meditationMinutes: 0,
        exercisesCompleted: 0,
        streak: 0,
        surveysCompleted: 0,
        lastActiveDate: null
      }
    });

    // Create default meditation progress tracking
    await admin.firestore().collection('users').doc(user.uid).collection('progress').doc('meditation').set({
      userId: user.uid,
      totalTime: 0,
      sessions: 0,
      createdAt: timestamp,
      updatedAt: timestamp
    });

    console.log(`User profile created for ${user.uid}`);
    return null;
  } catch (error) {
    console.error('Error creating user profile:', error);
    return null;
  }
});