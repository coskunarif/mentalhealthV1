import * as functions from 'firebase-functions/v1';
import * as admin from 'firebase-admin';
import * as z from 'zod';

const userSchema = z.object({
  uid: z.string(),
  email: z.string().email().nullable(),
  displayName: z.string().default(''),
  photoURL: z.string().default(''),
  settings: z.object({
    notifications: z.object({
      reminders: z.boolean().default(true),
      progress: z.boolean().default(true),
      tips: z.boolean().default(true),
      community: z.boolean().default(false)
    }).default({}),
    language: z.string().default('en'),
    theme: z.string().default('light')
  }).default({}),
  stats: z.object({
    meditationMinutes: z.number().default(0),
    exercisesCompleted: z.number().default(0),
    streak: z.number().default(0),
    surveysCompleted: z.number().default(0),
    lastActiveDate: z.any().nullable()
  }).default({})
});

// Use v1 auth trigger with European region
export const onUserCreate = functions
  .region('europe-west1')
  .auth.user()
  .onCreate(async (user) => {
    try {
      const timestamp = admin.firestore.FieldValue.serverTimestamp();

      const userData = userSchema.parse({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
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
      });

      await admin.firestore().collection('users').doc(user.uid).set({
        ...userData,
        createdAt: timestamp,
        updatedAt: timestamp
      });

      const batch = admin.firestore().batch();

      const meditationRef = admin.firestore()
        .collection('users')
        .doc(user.uid)
        .collection('progress')
        .doc('meditation');
      batch.set(meditationRef, {
        userId: user.uid,
        totalTime: 0,
        sessions: 0,
        createdAt: timestamp,
        updatedAt: timestamp
      });

      const overviewRef = admin.firestore()
        .collection('users')
        .doc(user.uid)
        .collection('progress')
        .doc('overview');
      batch.set(overviewRef, {
        overall: 0,
        categories: {},
        lastUpdated: timestamp
      });

      await batch.commit();

      console.log(`User profile created for ${user.uid}`);
      return null;
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  });
