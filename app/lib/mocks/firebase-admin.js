// Mock for firebase-admin for client-side code
const admin = {
  initializeApp: () => ({}),
  firestore: () => ({
    collection: () => ({
      doc: () => ({
        get: () => Promise.resolve({
          exists: false,
          data: () => null,
        }),
        set: () => Promise.resolve(),
        update: () => Promise.resolve(),
      }),
      where: () => admin.firestore().collection(),
      orderBy: () => admin.firestore().collection(),
      limit: () => admin.firestore().collection(),
      get: () => Promise.resolve({ docs: [] }),
    }),
    runTransaction: (fn) => Promise.resolve(fn()),
    FieldValue: {
      serverTimestamp: () => new Date(),
      increment: (n) => n,
    },
    Timestamp: {
      now: () => new Date(),
      fromDate: (date) => date,
    },
  }),
  auth: () => ({
    getUser: () => Promise.resolve({}),
    updateUser: () => Promise.resolve({}),
    createUser: () => Promise.resolve({}),
  }),
  storage: () => ({
    bucket: () => ({
      file: () => ({
        getSignedUrl: () => Promise.resolve('https://mock-url.com'),
      }),
    }),
  }),
  messaging: () => ({
    sendMulticast: () => Promise.resolve({
      responses: [],
      successCount: 0,
      failureCount: 0,
    }),
  }),
};

// Export elements that are used
export const firestore = admin.firestore;
export const auth = admin.auth;
export const storage = admin.storage;
export const messaging = admin.messaging;
export const initializeApp = admin.initializeApp;

// Default export for: import * as admin from 'firebase-admin'
export default admin;
