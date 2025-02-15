import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../lib/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  user: User | null;
  initialized: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  initialized: false,
  signOut: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    console.log("Setting up auth state listener");
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Auth state changed:", {
        userId: user?.uid,
        isAuthenticated: !!user,
        previouslyInitialized: initialized
      });
      setUser(user);
      setInitialized(true);
    }, (error) => {
      console.error("Auth state change error:", error);
    });

    return () => {
      console.log("Cleaning up auth state listener");
      unsubscribe();
    };
  }, [initialized]);

  const signOut = async () => {
    try {
      console.log("Starting sign-out process");
      console.log("Current user:", auth.currentUser?.uid);

      // Sign out from Firebase
      console.log("Calling auth.signOut()");
      await auth.signOut();
      console.log("auth.signOut() completed");

      // Clear Firebase persistence key from AsyncStorage
      const projectId = process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID;
      const persistenceKey = `firebase:authUser:${projectId}:[DEFAULT]`;
      console.log(`Clearing AsyncStorage key: ${persistenceKey}`);
      await AsyncStorage.removeItem(persistenceKey);
      console.log("Firebase persistence key removed");

      // Verify auth state
      console.log("Verifying auth state after sign-out");
      console.log("Current auth state:", {
        currentUser: auth.currentUser?.uid,
        isSignedIn: !!auth.currentUser
      });

      // Reset user state
      console.log("Resetting user state");
      setUser(null);
      
      console.log("Sign-out process completed successfully");
      
      // Note: Navigation will be handled automatically by the root navigator
      // when auth state changes to null
    } catch (error: any) { // Type assertion for error object
      console.error('Error signing out:', error);
      console.error('Error details:', {
        name: error?.name,
        message: error?.message,
        code: error?.code,
        stack: error?.stack
      });
      throw error; // Propagate error to be handled by the UI
    }
  };

  return (
    <AuthContext.Provider value={{ user, initialized, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export default {
  useAuth,
  AuthProvider
}
