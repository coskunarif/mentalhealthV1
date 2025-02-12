import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};

// Log Firebase config (excluding sensitive data)
// console.log('Firebase Config Status:', {
//   apiKeyExists: !!firebaseConfig.apiKey,
//   authDomainExists: !!firebaseConfig.authDomain,
//   projectIdExists: !!firebaseConfig.projectId,
//   configComplete: Object.values(firebaseConfig).every(value => !!value)
// });

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// console.log('Firebase App Initialized');

// Get Auth and Firestore instances
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const db = getFirestore(app);

export default app;
