import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { getReactNativePersistence } from 'firebase/auth/react-native';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Prevent multiple initializations
import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { FirebaseStorage } from 'firebase/storage';
import { Analytics } from 'firebase/analytics';

let firebaseApp: FirebaseApp | null = null;
let firebaseAuth: Auth;
let firestore: Firestore;
let firebaseStorage: FirebaseStorage;
let firebaseAnalytics: Analytics | null = null;

// Initialize Firebase if not already initialized
if (!firebaseApp) {
  firebaseApp = initializeApp(firebaseConfig);
  
  // Initialize Auth with AsyncStorage persistence
  firebaseAuth = getAuth();
  
  // Set persistence separately to avoid re-initialization issues
  if (Platform.OS !== 'web') {
    firebaseAuth.setPersistence(getReactNativePersistence(AsyncStorage))
      .catch(error => {
        console.error("Error setting persistence:", error);
      });
  }
  
  // Initialize Firestore
  firestore = getFirestore(firebaseApp);
  
  // Initialize other services
  firebaseStorage = getStorage(firebaseApp);
  
  // Initialize Analytics conditionally
  if (Platform.OS !== 'web') {
    isSupported()
      .then(supported => {
        if (supported && firebaseApp) {
          firebaseAnalytics = getAnalytics(firebaseApp);
        }
      })
      .catch(error => {
        console.error("Analytics support check failed:", error);
      });
  }
}

// Export Firebase instances
export {
  firebaseApp as app,
  firebaseAuth as auth,
  firestore as db,
  firebaseStorage as storage,
  firebaseAnalytics as analytics
};

import { getFunctions } from 'firebase/functions';
export const functions = getFunctions(firebaseApp);

export type { User } from 'firebase/auth';

export default {};
