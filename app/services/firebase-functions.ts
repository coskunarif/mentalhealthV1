import { httpsCallable, HttpsCallableResult, getFunctions } from 'firebase/functions';
import { app, auth } from '../lib/firebase-utils/index'; // Corrected import path and added auth

// Initialize functions directly here, specifying the region
export const functions = getFunctions(app, 'europe-west1'); // Export this instance

// Define types for your function responses
interface UserStatsResponse {
  success: boolean;
  stats: any;
}

interface MoodInsightsResponse {
  success: boolean;
  insights: any;
  message: string;
}

// Client-side callable functions
export const getUserStats = httpsCallable<void, UserStatsResponse>(
  functions,
  'getUserStats'
);

// Function to call getUserStats, including token logging
export const callGetUserStats = async () => {
  // Log the token before calling the function
  try {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken(true); // Force refresh
      console.log('[DEBUG] Current User ID Token:', token ? 'Token Retrieved' : 'No Token');
      // Optionally log the first few chars of the token for verification, but avoid logging the full token
      // console.log('[DEBUG] Token starts with:', token?.substring(0, 10)); 
    } else {
      console.log('[DEBUG] No current user found before calling getUserStats.');
    }
  } catch (tokenError) {
    console.error('[DEBUG] Error getting ID token:', tokenError);
  }

  // Original function call logic
  const getUserStatsCallable = httpsCallable<void, UserStatsResponse>(functions, 'getUserStats');
  try {
    console.log('[DEBUG] Calling getUserStats Cloud Function...');
    const result = await getUserStatsCallable(); // Use the specific callable instance
    console.log('[DEBUG] getUserStats call successful, data:', result.data); // Log success
    return result.data;
  } catch (error) {
    // Log the specific error from the function call
    console.error('[DEBUG] Error calling getUserStats Cloud Function:', error); 
    throw error; // Re-throw the error
  }
};


export const generateMoodInsights = httpsCallable<
  { timeframe: 'week' | 'month' | 'year' }, 
  MoodInsightsResponse
>(
  functions, 
  'generateMoodInsights'
);

// Add this for the new function
export const ensureUserDocument = httpsCallable<void, {success: boolean, message: string}>(
  functions, 
  'ensureUserDocument'
);
