// app/lib/firebase-utils/config.ts
// Firebase configuration
export const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Force production mode - never use emulator
export const useEmulator = false;

// Logging for debugging
console.log('Firebase config variables check:', {
  apiKeySet: !!process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomainSet: !!process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectIdSet: !!process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucketSet: !!process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderIdSet: !!process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appIdSet: !!process.env.EXPO_PUBLIC_FIREBASE_APP_ID
});

export default {};
