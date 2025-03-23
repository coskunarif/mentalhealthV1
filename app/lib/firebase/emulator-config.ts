// This file controls emulator connections for the app
// Set to 'false' for production/direct cloud connection
export const USE_EMULATORS = false;

// Define emulator hosts and ports (only used if USE_EMULATORS is true)
export const EMULATOR_CONFIG = {
  auth: { host: 'localhost', port: 9099 },
  firestore: { host: 'localhost', port: 8080 },
  functions: { host: 'localhost', port: 5001 },
  storage: { host: 'localhost', port: 9199 }
};

export default { USE_EMULATORS, EMULATOR_CONFIG };
