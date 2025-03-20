export class FirebaseError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

export const handleError = (error: any): FirebaseError => {
  console.error('Firebase operation failed:', error);

  if (error.code) {
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return new FirebaseError('auth/invalid-credentials', 'Invalid email or password');
      case 'auth/too-many-requests':
        return new FirebaseError('auth/too-many-requests', 'Too many failed login attempts. Please try again later');
      // Add more specific error cases
      default:
        return new FirebaseError(error.code, error.message || 'An unexpected error occurred');
    }
  }

  return new FirebaseError('unknown', error.message || 'An unexpected error occurred');
};