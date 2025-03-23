// This is a test file to verify Firebase imports work correctly
import { initializeApp } from 'firebase/app';
import { getFunctions } from 'firebase/functions';

console.log('Firebase app import works');
console.log('Firebase functions import works');

const testConfig = {
  apiKey: "test",
  authDomain: "test.firebaseapp.com",
  projectId: "test",
  storageBucket: "test.appspot.com",
  messagingSenderId: "12345",
  appId: "1:12345:web:12345"
};

try {
  const app = initializeApp(testConfig);
  const functions = getFunctions(app);
  console.log('Firebase initialization successful');
} catch (error) {
  console.error('Firebase initialization failed:', error);
}

export default {};
