// app/lib/firebase/config.ts
// Firebase configuration
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // Replace with your actual Firebase config
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Force production mode - never use emulator
export const useEmulator = false;
