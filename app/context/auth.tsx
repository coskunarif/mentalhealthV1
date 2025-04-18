import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
// Use aliased import for firebase/auth User and remove User from firebase-utils import
import { auth, db, refreshAuthToken, startTokenRefreshInterval, stopTokenRefreshInterval } from '../lib/firebase-utils/index'; // Corrected import path
import { onAuthStateChanged, User as FirebaseAuthUser } from 'firebase/auth';
import { doc, onSnapshot, Unsubscribe } from 'firebase/firestore'; // Import onSnapshot and Unsubscribe
import UserService from '../services/user.service'; // Import UserService
import { UserModel } from '../models/user.model'; // Import UserModel

// Combine Auth user properties with our Firestore model properties
// Ensure required Auth properties (like uid, email) are present
// Make Firestore specific fields potentially optional if they might not exist immediately
type AppUser = Omit<FirebaseAuthUser, 'displayName' | 'photoURL'> & Partial<Omit<UserModel, 'uid' | 'email'>>;

interface AuthContextType {
  user: AppUser | null; // Use the combined AppUser type
  initialized: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  initialized: false,
  loading: true,
  signOut: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null); // Use AppUser type for state
  const [initialized, setInitialized] = useState(false); // Tracks if initial auth check is done
  const [loading, setLoading] = useState(true); // Tracks if user data (including Firestore) is loaded
  const firestoreUnsubscribeRef = useRef<Unsubscribe | null>(null); // Ref to store Firestore listener unsubscribe function

  useEffect(() => {
    // Subscribe to auth state changes
    // Use FirebaseAuthUser type for the authUser parameter
    const authUnsubscribe = onAuthStateChanged(auth, async (authUser: FirebaseAuthUser | null) => { // Added async here
      // --- Start Added Debug Logging ---
      console.log(`[AUTH DEBUG] Auth state changed: ${authUser ? 'signed in' : 'signed out'}`);
      if (authUser) {
        console.log(`[AUTH DEBUG] User ID: ${authUser.uid}`);
        try {
          const token = await authUser.getIdToken(); // Added await
          console.log(`[AUTH DEBUG] Token retrieved, first 10 chars: ${token.substring(0, 10)}...`);
        } catch (e) {
          console.error('[AUTH DEBUG] Token retrieval error:', e);
        }
      }
      // --- End Added Debug Logging ---

      console.log('Auth state changed. authUser:', authUser?.uid); // Kept original log for comparison

      // Unsubscribe from previous Firestore listener if it exists
      if (firestoreUnsubscribeRef.current) {
        console.log('Unsubscribing from previous Firestore listener.');
        firestoreUnsubscribeRef.current();
        firestoreUnsubscribeRef.current = null;
      }

      // Reset state before checking new user
      setUser(null);
      setLoading(true); // Start loading until Firestore data is confirmed or user is null

      if (authUser) {
        // Start token refresh interval when user is authenticated
        startTokenRefreshInterval();

        // Force an immediate token refresh
        refreshAuthToken(true)
          .then(() => console.log('Initial auth token refreshed successfully'))
          .catch((err: Error) => console.error('Error refreshing initial auth token:', err));

        // Add this line to ensure user document exists
        UserService.ensureUserDocument(authUser.uid)
          .catch((err: Error) => console.error('Error ensuring user document:', err));

        console.log(`User ${authUser.uid} logged in. Setting up Firestore listener.`);
        const userRef = doc(db, 'users', authUser.uid);

        // Subscribe to the user document in Firestore
        firestoreUnsubscribeRef.current = onSnapshot(userRef, (snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.data();
            console.log(`Firestore data received for ${authUser.uid}:`, userData);
            // Merge auth user with DB data
            const enhancedUser = {
              ...authUser,
              // Explicitly pull fields from userData, falling back to authUser if needed
              displayName: userData.displayName ?? authUser.displayName,
              photoURL: userData.photoURL ?? authUser.photoURL,
              // Add other relevant fields from your Firestore user model
              settings: userData.settings, // Load settings from Firestore
              stats: userData.stats,       // Load stats from Firestore
            };
            // Ensure we have a valid user object structure even if Firestore data is partial
            const completeUser = {
              ...enhancedUser,
              settings: enhancedUser.settings || {}, // Default to empty object if undefined
              stats: enhancedUser.stats || {},       // Default to empty object if undefined
            };
            setUser(completeUser as AppUser); // Cast to AppUser
            setInitialized(true); // Auth check done
            setLoading(false); // Firestore data loaded
          } else {
            // Document doesn't exist YET. Keep loading.
            // This handles the race condition. The listener will fire again when the doc is created.
            console.log(`Firestore document for ${authUser.uid} does not exist yet. Waiting...`);
            // Cast authUser to AppUser, acknowledging Firestore fields might be missing initially
            setUser(authUser as AppUser);
            setInitialized(true); // Auth check is done, but data isn't fully loaded
            setLoading(true); // Explicitly keep loading
          }
        }, (error) => {
          console.error(`Error listening to Firestore document for ${authUser.uid}:`, error);
          // Fallback to auth user data, but stop loading
          // Cast authUser to AppUser, acknowledging Firestore fields might be missing
          setUser(authUser as AppUser);
          setInitialized(true);
          setLoading(false); // Stop loading even on error
        });

      } else {
        // User is logged out
        console.log('User logged out.');
        // Stop token refresh interval when user logs out
        stopTokenRefreshInterval();
        setUser(null);
        setInitialized(true); // Auth check done
        setLoading(false); // No user, so not loading
      }
    }, (error) => {
      // Error during initial auth state check
      console.error('Auth state change error:', error);
      setUser(null);
      setInitialized(true);
      setLoading(false);
    });

    // Cleanup function for the useEffect hook
    return () => {
      console.log('Cleaning up AuthProvider useEffect.');
      authUnsubscribe(); // Unsubscribe from auth state changes
      // Unsubscribe from Firestore listener if it's active
      if (firestoreUnsubscribeRef.current) {
        console.log('Unsubscribing from Firestore listener during cleanup.');
        firestoreUnsubscribeRef.current();
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleSignOut = async () => {
    try {
      setLoading(true);
      // Stop token refresh interval before signing out
      stopTokenRefreshInterval();
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const authContextValue: AuthContextType = {
    user,
    initialized,
    loading,
    signOut: handleSignOut
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
