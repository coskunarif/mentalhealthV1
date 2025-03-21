import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
// Fix import path - use direct import from @firebase/functions instead of firebase/functions
import { getFunctions, connectFunctionsEmulator, httpsCallable } from '@firebase/functions';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { firebaseConfig } from './config';

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const functions = getFunctions(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

// Connect to emulators in development

// Client-side function calls
export const clientFunctions = {
  generateMoodInsights: httpsCallable(functions, 'generateMoodInsights')
};
export default {};
