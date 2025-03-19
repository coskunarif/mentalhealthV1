import { app, auth, db, storage, functions, analytics } from './firebase';
import * as authMethods from './auth';
import * as firestoreMethods from './firestore';
import * as storageMethods from './storage';

// Re-export everything
export { 
  app, 
  auth, 
  db, 
  storage, 
  functions, 
  analytics 
};

// Re-export utility methods
export * from './auth';
export * from './firestore';
export * from './storage';