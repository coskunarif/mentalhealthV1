// Comprehensive mock for firebase-functions in client-side code
// This mock covers all the APIs that might be imported

// v1 functions
export const https = {
  onCall: () => () => {},
  onRequest: () => () => {},
  HttpsError: class HttpsError extends Error {
    constructor(code, message, details) {
      super(message);
      this.code = code;
      this.details = details;
    }
  },
};

// v2 functions
export const v2 = {
  https: {
    onCall: () => () => {},
  },
  scheduler: {
    onSchedule: () => () => {},
  },
};

// Common functions
export const httpsCallable = (functions, name) => {
  return (data) => {
    console.log(`[Mock] Firebase Function ${name} called with:`, data);
    return Promise.resolve({
      data: {
        success: false,
        message: 'Using mock implementation - connect to actual Firebase for real data'
      }
    });
  };
};

export const onCall = () => {
  return () => {
    console.warn('[Mock] Firebase Functions onCall should not be used in client code');
    return () => {};
  };
};

export const logger = {
  info: () => {},
  error: () => {},
  warn: () => {},
  debug: () => {},
};

// For imports like: import * as functions from 'firebase-functions'
export default {
  https,
  v2,
  httpsCallable,
  onCall,
  logger,
};
