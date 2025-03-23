// app/lib/utils/empty-firebase-functions.js
// This is a placeholder for Firebase Functions and Admin
// It prevents client-side bundling of server-side code
module.exports = {
  // Mock implementations for client-side
  https: {
    onCall: () => () => {},
  },
  region: () => ({}),
  auth: {
    user: () => ({ onCreate: () => {} }),
  },
  v2: {
    https: { onCall: () => () => {} },
    scheduler: { onSchedule: () => () => {} },
    logger: { info: () => {}, error: () => {} }
  },
  onSchedule: () => () => {},
  setGlobalOptions: () => {},
  // Add other mock implementations as needed
};

// Also mock firebase-admin
require.cache[require.resolve('firebase-admin')] = {
  exports: {
    initializeApp: () => ({}),
    firestore: () => ({}),
    auth: () => ({}),
    storage: () => ({}),
  }
};

// Mock firebase-admin/messaging
require.cache[require.resolve('firebase-admin/messaging')] = {
  exports: {
    getMessaging: () => ({
      sendMulticast: () => Promise.resolve({
        responses: [],
        successCount: 0,
        failureCount: 0
      })
    })
  }
};


export default {};
