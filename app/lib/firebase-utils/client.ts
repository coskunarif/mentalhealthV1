import { app, auth, db as firestore, storage } from './firebase'; // Removed 'functions' import

// Client-side callable functions - Removed this section as it's handled elsewhere

// Add a default export
export default { app, auth, firestore, storage }; // Removed 'functions' and 'clientFunctions'
