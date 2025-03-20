export enum ErrorCode {
  UNKNOWN_ERROR = 'unknown_error',
  NETWORK_ERROR = 'network_error',
  SERVER_ERROR = 'server_error',
  UNAUTHENTICATED = 'unauthenticated',
  UNAUTHORIZED = 'unauthorized',
  NOT_FOUND = 'not_found',
  ALREADY_EXISTS = 'already_exists',
  INVALID_ARGUMENT = 'invalid_argument',
  RATE_LIMITED = 'rate_limited'
}

export class AppError extends Error {
  constructor(
    public readonly code: ErrorCode,
    message: string,
    public readonly details?: any
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleFirebaseError(error: any): AppError {
  console.error('Firebase operation failed:', error);
  
  if (error.code) {
    if (error.code.startsWith('auth/')) {
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          return new AppError(ErrorCode.UNAUTHORIZED, 'Invalid email or password');
        case 'auth/too-many-requests':
          return new AppError(ErrorCode.RATE_LIMITED, 'Too many failed login attempts. Please try again later');
        case 'auth/network-request-failed':
          return new AppError(ErrorCode.NETWORK_ERROR, 'Network error occurred. Please check your connection');
        default:
          return new AppError(ErrorCode.UNKNOWN_ERROR, error.message || 'An authentication error occurred');
      }
    }
    
    if (error.code.startsWith('functions/')) {
      switch (error.code) {
        case 'functions/resource-exhausted':
          return new AppError(ErrorCode.RATE_LIMITED, 'Rate limit exceeded. Please try again later');
        case 'functions/unavailable':
          return new AppError(ErrorCode.SERVER_ERROR, 'Service temporarily unavailable. Please try again later');
        default:
          return new AppError(ErrorCode.SERVER_ERROR, error.message || 'A server error occurred');
      }
    }
  }
  
  if (error instanceof AppError) {
    return error;
  }
  
  return new AppError(ErrorCode.UNKNOWN_ERROR, error.message || 'An unexpected error occurred');
}
