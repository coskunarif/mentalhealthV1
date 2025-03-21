import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  OAuthProvider,
  User,
  UserCredential
} from 'firebase/auth';
import { auth } from './firebase';

export async function signIn(email: string, password: string): Promise<UserCredential> {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw error;
  }
}

export async function signUp(email: string, password: string): Promise<UserCredential> {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    console.error('Sign up error:', error);
    throw error;
  }
}

export async function resetPassword(email: string): Promise<void> {
  try {
    return await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    console.error('Password reset error:', error);
    throw error;
  }
}

export async function signInWithGoogle(): Promise<UserCredential> {
  try {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  } catch (error: any) {
    console.error('Google sign-in error:', error);
    throw error;
  }
}

export async function signInWithApple(): Promise<UserCredential> {
  try {
    const provider = new OAuthProvider('apple.com');
    return await signInWithPopup(auth, provider);
  } catch (error: any) {
    console.error('Apple sign-in error:', error);
    throw error;
  }
}

export type { User, UserCredential };
export default auth;
