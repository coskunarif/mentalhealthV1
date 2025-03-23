// Mock implementation for firebase-functions in client-side code
export const httpsCallable = (functions, name) => {
  return (data) => {
    console.warn(`Firebase Function ${name} called with mock implementation`);
    return Promise.reject(new Error('Firebase Functions are not available in client code'));
  };
};

export const onCall = () => {
  return () => {
    throw new Error('Firebase Functions server methods are not available client-side');
  };
};

export default {
  httpsCallable,
  onCall,
};
