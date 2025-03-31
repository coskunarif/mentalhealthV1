import { app, auth, db, storage, analytics } from './firebase'; // Removed 'functions' import
import * as authMethods from './auth';
import * as firestoreMethods from './firestore';
import * as storageMethods from './storage';

// Re-export everything
export {
  app,
  auth,
  db,
  storage,
  // Removed 'functions' re-export
  analytics
};

// Re-export utility methods
export * from './auth';
export * from './firestore';
export * from './storage';

// Export type
export type { User } from 'firebase/auth';

export { Timestamp, queryDocuments, getDocument } from './firestore';
