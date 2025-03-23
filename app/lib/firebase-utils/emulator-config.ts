// app/lib/firebase-utils/emulator-config.ts
// This file determines whether to use the emulator
// For production, we'll always return false
export const shouldUseEmulator = false;

// Emulator configuration (only used during local development)
export const emulatorConfig = {
  authHost: 'localhost',
  authPort: 9099,
  firestoreHost: 'localhost',
  firestorePort: 8080,
  functionsHost: 'localhost',
  functionsPort: 5001,
  storageHost: 'localhost',
  storagePort: 9199
};


export default {};
