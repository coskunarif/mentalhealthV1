import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// Removed getFunctions import
import { getAnalytics, isSupported } from 'firebase/analytics';
import { firebaseConfig } from './config';
import { SDK_VERSION } from 'firebase/app';

// Initialize Firebase only if no apps exist
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Firestore
export const db = getFirestore(app);

// Storage
export const storage = getStorage(app);

// Functions - Removed initialization from here

// Analytics (initialize only if supported)
export let analytics: any = null; // Use let to allow reassignment
isSupported().then(supported => {
  if (supported) {
    analytics = getAnalytics(app);
  }
}).catch(error => {
  console.error('Analytics initialization error:', error);
});

// Logging for debugging
console.log('Firebase app initialization status:', getApps().length > 0 ? 'Already initialized' : 'New initialization');
console.log('Firebase project ID:', firebaseConfig.projectId || 'Not available');
console.log('Firebase SDK version:', SDK_VERSION);

// Test connectivity explicitly
export const testFirestoreConnection = async () => {
  try {
    console.log('Testing Firestore connection...');
    const testRef = collection(db, 'exercises');
    const testSnapshot = await getDocs(testRef);
    console.log('Firestore connection successful with', testSnapshot.size, 'documents');
    return true;
  } catch (error) {
    console.error('Firestore connection failed:', error);
    return false;
  }
};

// Export consolidated object (without functions)
export default { app, auth, db, storage, analytics };
