import { app, auth, db as firestore, storage, functions } from './firebase';

// Client-side callable functions
export const clientFunctions = {
  generateMoodInsights: functions, // You'll define these properly later
  getUserStats: functions
};

// Add a default export
export default { app, auth, firestore, storage, functions, clientFunctions };
