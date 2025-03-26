require('dotenv').config(); // Load environment variables from .env file
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, doc, updateDoc } = require('firebase/firestore');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

// Your Firebase config - loaded from .env
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Test user credentials
const TEST_EMAIL = 'emma@example.com';
const TEST_PASSWORD = 'password123'; // Using the previously provided password

async function testWriteOperations() {
  try {
    // 1. Sign in
    console.log("Signing in...");
    const userCredential = await signInWithEmailAndPassword(auth, TEST_EMAIL, TEST_PASSWORD);
    const user = userCredential.user;
    console.log("Signed in as:", user.uid);

    // 2. Test saving mood entry
    console.log("\nTesting mood entry creation...");
    try {
      const moodRef = await addDoc(collection(db, 'moods'), {
        userId: user.uid,
        timestamp: new Date(),
        mood: 'peaceful',
        value: 75,
        duration: 30 // Assuming duration is in minutes or seconds
      });
      console.log("✅ SUCCESS: Mood entry created:", moodRef.id);
    } catch (error) {
      console.error("❌ ERROR: Failed to create mood entry:", error.message);
    }

    // 3. Test creating activity
    console.log("\nTesting activity creation...");
    try {
      const activityRef = await addDoc(collection(db, 'users', user.uid, 'activities'), {
        // userId: user.uid, // Not strictly needed as it's implied by the path, but good practice
        type: 'meditation',
        timestamp: new Date(),
        details: {
          title: 'Test Meditation',
          duration: 5 // Assuming duration is in minutes
        }
      });
      console.log("✅ SUCCESS: Activity created:", activityRef.id);
    } catch (error) {
      console.error("❌ ERROR: Failed to create activity:", error.message);
    }

    console.log("\nWrite operation tests complete.");

  } catch (error) {
    console.error("Test failed:", error);
  }
}

testWriteOperations().catch(console.error);
