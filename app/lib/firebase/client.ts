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

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const functions = getFunctions(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

// Only connect to emulators if specifically enabled
// For this solution, we're bypassing emulators completely
if (USE_EMULATORS) {
  try {
    console.warn('Using Firebase emulators - NOT FOR PRODUCTION');
    // This code will never run since we've set USE_EMULATORS to false
    // connectAuthEmulator(auth, `http://${EMULATOR_CONFIG.auth.host}:${EMULATOR_CONFIG.auth.port}`);
    // connectFirestoreEmulator(firestore, EMULATOR_CONFIG.firestore.host, EMULATOR_CONFIG.firestore.port);
    // connectFunctionsEmulator(functions, EMULATOR_CONFIG.functions.host, EMULATOR_CONFIG.functions.port);
    // connectStorageEmulator(storage, EMULATOR_CONFIG.storage.host, EMULATOR_CONFIG.storage.port);
  } catch (error) {
    console.error('Error connecting to emulators:', error);
  }
}

// Client-side function calls
export const clientFunctions = {
  generateMoodInsights: httpsCallable(functions, 'generateMoodInsights'),
  getUserStats: httpsCallable(functions, 'getUserStats')
};

export default {};
