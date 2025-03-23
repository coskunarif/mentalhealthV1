// app/lib/firebase/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { firebaseConfig } from './config';
import { shouldUseEmulator, emulatorConfig } from './emulator-config';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';

// Initialize Firebase
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Auth
export const auth = getAuth(app);

// Firestore
export const db = getFirestore(app);

// Storage
export const storage = getStorage(app);

// Functions
export const functions = getFunctions(app);

// Connect to emulators only in development and if explicitly enabled
if (shouldUseEmulator && process.env.NODE_ENV === 'development') {
  // Never connect to emulators in production
  try {
    connectAuthEmulator(auth, `http://${emulatorConfig.authHost}:${emulatorConfig.authPort}`);
    connectFirestoreEmulator(db, emulatorConfig.firestoreHost, emulatorConfig.firestorePort);
    connectStorageEmulator(storage, emulatorConfig.storageHost, emulatorConfig.storagePort);
    connectFunctionsEmulator(
      functions, 
      emulatorConfig.functionsHost, 
      emulatorConfig.functionsPort
    );
    console.log('Connected to Firebase emulators');
  } catch (error) {
    console.error('Failed to connect to Firebase emulators:', error);
  }
}


export default {};
