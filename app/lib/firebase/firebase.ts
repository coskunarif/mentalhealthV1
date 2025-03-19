import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, browserLocalPersistence, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, collection, enableIndexedDbPersistence, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getAnalytics, isSupported } from 'firebase/analytics';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

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

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Initialize services
const firebaseAuth = initializeAuth(firebaseApp, {
  persistence: browserLocalPersistence,
});
const firestore = getFirestore(firebaseApp);
const firebaseStorage = getStorage(firebaseApp);
const firebaseFunctions = getFunctions(firebaseApp);

// Initialize offline persistence for Firestore (with error handling)
if (Platform.OS !== 'web') {
  enableIndexedDbPersistence(firestore).catch((err) => {
    console.error("Firestore persistence error:", err.code);
  });
}

// Initialize Analytics conditionally
let firebaseAnalytics = null;
isSupported().then(isSupported => {
  if (isSupported) {
    firebaseAnalytics = getAnalytics(firebaseApp);
  }
}).catch(error => {
  console.error("Analytics support check failed:", error);
});

// Emulator connections for local development
if (process.env.EXPO_PUBLIC_USE_FIREBASE_EMULATOR === 'true') {
  const host = Platform.OS === 'web' ? 'localhost' : '10.0.2.2';
  connectAuthEmulator(firebaseAuth, `http://${host}:9099`);
  connectFirestoreEmulator(firestore, host, 8080);
  connectFunctionsEmulator(firebaseFunctions, host, 5001);
  connectStorageEmulator(firebaseStorage, host, 9199);

  console.log('Using Firebase Emulators');
}

// Create collection references
const usersCollection = collection(firestore, 'users');
const moodsCollection = collection(firestore, 'moods');
const exercisesCollection = collection(firestore, 'exercises');
const meditationsCollection = collection(firestore, 'meditations');
const surveysCollection = collection(firestore, 'surveys');

// Export Firebase instances
export {
  firebaseApp as app,
  firebaseAuth as auth,
  firestore as db,
  firebaseStorage as storage,
  firebaseFunctions as functions,
  firebaseAnalytics as analytics,
  usersCollection,
  moodsCollection,
  exercisesCollection,
  meditationsCollection,
  surveysCollection
};
