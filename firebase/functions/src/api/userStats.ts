import { HttpsError, onCall } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import { logger } from 'firebase-functions/v2'; // Keep logger for potential future use

interface MoodData {
  id: string;
  mood: string;
  value: number;
  timestamp: admin.firestore.Timestamp;
  userId: string;
  [key: string]: any;
}

interface ActivityData {
  id: string;
  type: string;
  timestamp: admin.firestore.Timestamp;
  details: any;
  userId: string;
  [key: string]: any;
}

interface UserStats {
  profile: {
    displayName: string;
    photoURL: string;
    createdAt: admin.firestore.Timestamp;
    streak: number;
  };
  meditation: {
    totalTime: number;
    sessions: number;
  };
  activities: {
    exercisesCompleted: number;
    surveysCompleted: number;
    recentActivities: ActivityData[];
  };
  mood: {
    recentMoods: MoodData[];
  };
}

export const getUserStats = onCall({
  timeoutSeconds: 30,
  memory: '256MiB',
  region: 'europe-west1'
// Add type for request based on usage
}, async (request: { auth?: { uid: string }, data?: any }) => { // Add data to type annotation
  console.log('[DEBUG] getUserStats Cloud Function called');
  // Log the project ID the function is connected to
  console.log(`[DEBUG] Function connected to project: ${admin.app().options.projectId}`);
  // Step 4: Add debug logs
  console.log('[DEBUG] Request auth:', request.auth);
  console.log('[DEBUG] Request data:', request.data);

  if (!request.auth) {
    console.log('[DEBUG] No auth in request'); // Added
    throw new HttpsError(
      'unauthenticated',
      'You must be logged in to access this feature'
    );
  }

  // IMPORTANT: Always use the auth context for the userId
  const userId = request.auth.uid;
  console.log(`[DEBUG] Function processing user: ${userId}`);

  try {
    // Try to get user document first (Added block start)
    const userDocRef = admin.firestore().collection('users').doc(userId);
    const userDoc = await userDocRef.get();
    console.log(`[DEBUG] User document exists: ${userDoc.exists}`); // Added
    
    // Step 3: Update the Cloud Function to Be Precise in Error Handling
    if (!userDoc.exists) {
      console.error(`[DEBUG] User document not found for ${userId} in Cloud Function`);
      throw new HttpsError('not-found', 'User document does not exist in database');
    }
    
    const userData = userDoc.data() || {};
    console.log(`[DEBUG] Found user document: ${userData.email || 'unknown email'}`);
    // (Added block end) - Note: This comment might be slightly misplaced from original context but logic is correct

    // Try getting collections/documents the function accesses (Added block start)
    console.log('[DEBUG] Testing document access paths...'); // Added
    
    let meditationData = { totalTime: 0, sessions: 0 }; // Default value
    try {
      const meditationRef = userDocRef.collection('progress').doc('meditation');
      const meditationDoc = await meditationRef.get();
      console.log(`[DEBUG] Meditation doc exists: ${meditationDoc.exists}`); // Added
      if (meditationDoc.exists) {
         const data = meditationDoc.data();
         meditationData = {
           totalTime: data?.totalTime || 0,
           sessions: data?.sessions || 0
         };
      }
      // Removed creation logic, just check existence and fetch
    } catch (e) {
      console.log('[DEBUG] Error checking/fetching meditation doc:', e); // Added
      // Continue with default meditationData
    }

    try {
      const overviewRef = userDocRef.collection('progress').doc('overview');
      const overviewDoc = await overviewRef.get();
      console.log(`[DEBUG] Overview doc exists: ${overviewDoc.exists}`); // Added
      // We don't seem to use overviewData directly later, but check is kept
    } catch (e) {
      console.log('[DEBUG] Error checking overview doc:', e); // Added
    }
    // (Added block end)
    
    // Continue with the regular function logic...
    
    // Get recent moods (last 7 days)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const moodsSnapshot = await admin.firestore()
      .collection('moods') // Assuming moods are top-level, adjust if needed
      .where('userId', '==', userId)
      .where('timestamp', '>=', admin.firestore.Timestamp.fromDate(oneWeekAgo))
      .orderBy('timestamp', 'desc')
      .limit(10)
      .get();
    
    const recentMoods: MoodData[] = [];
    moodsSnapshot.forEach((doc: admin.firestore.QueryDocumentSnapshot) => {
      const data = doc.data() as Omit<MoodData, 'id'>;
      recentMoods.push({
        id: doc.id,
        mood: data.mood,
        value: data.value,
        timestamp: data.timestamp,
        userId: data.userId,
        ...data
      });
    });
    
    // Get recent activities with fallback
    let recentActivities: ActivityData[] = [];
    try {
      const activitiesSnapshot = await userDocRef // Use userDocRef
        .collection('activities')
        .orderBy('timestamp', 'desc')
        .limit(5)
        .get();
      
      if (!activitiesSnapshot.empty) {
        recentActivities = activitiesSnapshot.docs.map((doc: admin.firestore.QueryDocumentSnapshot) => {
          const data = doc.data() as Omit<ActivityData, 'id'>;
          return {
            id: doc.id,
            type: data.type,
            timestamp: data.timestamp,
            details: data.details,
            userId: data.userId,
            ...data
          };
        });
      }
    } catch (err: any) {
      console.warn(`[DEBUG] Error fetching activities: ${err.message}`); // Added DEBUG prefix
      // Continue with empty array
    }
    
    // Combine all stats
    const stats: UserStats = {
      profile: {
        displayName: userData.displayName || '',
        photoURL: userData.photoURL || '',
        createdAt: userData.createdAt || admin.firestore.Timestamp.now(),
        streak: userData.stats?.streak || 0
      },
      meditation: { // Use potentially updated meditationData
        totalTime: meditationData.totalTime || 0,
        sessions: meditationData.sessions || 0
      },
      activities: {
        exercisesCompleted: userData.stats?.exercisesCompleted || 0,
        surveysCompleted: userData.stats?.surveysCompleted || 0,
        recentActivities
      },
      mood: {
        recentMoods
      }
    };
    
    // Now fetch all other required data... (Existing code follows)
    // ... [rest of the code to build stats object] ...
    
    return { success: true, stats };
    
  } catch (error) {
    console.error('[DEBUG] Error in getUserStats cloud function:', error); // Updated log message
    
    // Rethrow HttpsError as is, or create a new one with more detail
    if (error instanceof HttpsError) {
      throw error;
    }
    
    throw new HttpsError('internal', 'Failed to retrieve user stats', error); // Updated error message
  }
});

// Removed createDefaultStats helper function as it's no longer used

// New function in firebase/functions/src/api/userStats.ts
export const ensureUserDocument = onCall({
  timeoutSeconds: 30,
  memory: '256MiB',
  region: 'europe-west1'
}, async (request: { auth?: { uid: string, token?: { email?: string, name?: string, picture?: string } } }) => { // Added token type
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'You must be logged in');
  }

  const userId = request.auth.uid;
  console.log(`[DEBUG] Ensuring user document exists for: ${userId}`);
  
  try {
    const userDocRef = admin.firestore().collection('users').doc(userId);
    const userDoc = await userDocRef.get();
    
    if (userDoc.exists) {
      console.log(`[DEBUG] User document already exists for ${userId}`);
      return { success: true, message: 'User document already exists' };
    }
    
    // Create user document with default values
    const timestamp = admin.firestore.FieldValue.serverTimestamp(); // Use server timestamp
    await userDocRef.set({
      uid: userId,
      email: request.auth.token?.email || '', // Use token info
      displayName: request.auth.token?.name || '', // Use token info
      photoURL: request.auth.token?.picture || '', // Use token info
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
    });
    
    // Create subcollections
    const batch = admin.firestore().batch();
    
    // Meditation progress doc
    const meditationRef = userDocRef.collection('progress').doc('meditation');
    batch.set(meditationRef, {
      userId: userId,
      totalTime: 0,
      sessions: 0,
      createdAt: timestamp,
      updatedAt: timestamp
    });
    
    // Overview progress doc
    const overviewRef = userDocRef.collection('progress').doc('overview');
    batch.set(overviewRef, {
      overall: 0,
      categories: {},
      lastUpdated: timestamp
    });
    
    await batch.commit();
    
    console.log(`[DEBUG] Successfully created user document and subcollections for ${userId}`);
    return { success: true, message: 'User document created successfully' };
  } catch (error) {
    console.error('[DEBUG] Error creating user document:', error);
    throw new HttpsError('internal', 'Failed to create user document', error);
  }
});
