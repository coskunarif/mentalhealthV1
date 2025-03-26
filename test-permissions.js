require('dotenv').config(); // Load environment variables from .env file
const { initializeApp } = require('firebase/app');
const { 
  getFirestore, 
  collection, 
  getDocs,
  getDoc,
  doc
} = require('firebase/firestore');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

// Your Firebase config - use environment variables in real usage
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
const TEST_PASSWORD = 'password123';  // Using the provided password

async function testPermissions() {
  try {
    // 1. Sign in
    console.log("Signing in...");
    const userCredential = await signInWithEmailAndPassword(auth, TEST_EMAIL, TEST_PASSWORD);
    const user = userCredential.user;
    console.log("Signed in as:", user.uid);
    
    // 2. Test reading exercises collection
    console.log("\nTesting exercises collection access...");
    try {
      const exercisesSnapshot = await getDocs(collection(db, 'exercises'));
      console.log(`✅ SUCCESS: Read ${exercisesSnapshot.size} exercises`);
    } catch (error) {
      console.error("❌ ERROR: Could not read exercises:", error.message);
    }
    
    // 3. Test reading user document
    console.log("\nTesting user document access...");
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      console.log(`✅ SUCCESS: Read user document: ${userDoc.exists() ? 'exists' : 'does not exist'}`);
    } catch (error) {
      console.error("❌ ERROR: Could not read user document:", error.message);
    }
    
    // 4. Test reading progress subcollection
    console.log("\nTesting progress subcollection access...");
    try {
      const progressOverviewDoc = await getDoc(doc(db, 'users', user.uid, 'progress', 'overview'));
      console.log(`✅ SUCCESS: Read progress overview: ${progressOverviewDoc.exists() ? 'exists' : 'does not exist'}`);
    } catch (error) {
      console.error("❌ ERROR: Could not read progress overview:", error.message);
    }
    
    console.log("\nPermission tests complete.");
    
  } catch (error) {
    console.error("Test failed:", error);
  }
}

testPermissions().catch(console.error);
