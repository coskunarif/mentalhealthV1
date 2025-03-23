import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { firebaseConfig } from './config';
import { USE_EMULATORS, EMULATOR_CONFIG } from './emulator-config';
import { connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { connectFunctionsEmulator } from 'firebase/functions';
import { connectStorageEmulator } from 'firebase/storage';

// Use explicit Firebase config instead of env vars for immediate debugging
const explicitConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "YOUR_API_KEY_HERE",
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN_HERE",
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID_HERE",
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID_HERE",
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || "YOUR_APP_ID_HERE",
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID || "YOUR_MEASUREMENT_ID_HERE"
};

// Initialize Firebase - use explicit config for testing
export const app = initializeApp(explicitConfig);
export const auth = getAuth(app);
export const functions = getFunctions(app, "europe-west1"); // Specify region
export const firestore = getFirestore(app);
export const storage = getStorage(app);

// Only connect to emulators if specifically enabled (now set to false)
if (USE_EMULATORS) {
  try {
    console.warn('Using Firebase emulators - NOT FOR PRODUCTION');
    connectAuthEmulator(auth, `http://${EMULATOR_CONFIG.auth.host}:${EMULATOR_CONFIG.auth.port}`);
    connectFirestoreEmulator(firestore, EMULATOR_CONFIG.firestore.host, EMULATOR_CONFIG.firestore.port);
    connectFunctionsEmulator(functions, EMULATOR_CONFIG.functions.host, EMULATOR_CONFIG.functions.port);
    connectStorageEmulator(storage, EMULATOR_CONFIG.storage.host, EMULATOR_CONFIG.storage.port);
  } catch (error) {
    console.error('Error connecting to emulators:', error);
  }
}

// Client-side function calls
export const clientFunctions = {
  generateMoodInsights: httpsCallable(functions, 'generateMoodInsights'),
  getUserStats: httpsCallable(functions, 'getUserStats')
};

export default { app, auth, functions, firestore, storage, clientFunctions };
