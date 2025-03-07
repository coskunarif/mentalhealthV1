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
  const projectId = process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID;
  const persistenceKey = `firebase:authUser:${projectId}:[DEFAULT]`;

  useEffect(() => {
    console.log("Setting up auth state listener");
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Auth state changed:", {
        userId: user?.uid,
        isAuthenticated: !!user,
        previouslyInitialized: initialized,
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

  const handleSignOut = async () => {
    try {
      console.log("Starting sign-out process");
      console.log("Current user:", auth.currentUser?.uid);
      console.log("Calling auth.signOut()");
      await auth.signOut();
      console.log("auth.signOut() completed");
      console.log(`Clearing AsyncStorage key: ${persistenceKey}`);
      await AsyncStorage.removeItem(persistenceKey);
      console.log("Firebase persistence key removed");
      console.log("Verifying auth state after sign-out");
      console.log("Current auth state:", {
        currentUser: auth.currentUser?.uid,
        isSignedIn: !!auth.currentUser,
      });
      console.log("Resetting user state");
      setUser(null);
      console.log("Sign-out process completed successfully");
    } catch (error: any) {
      console.error('Error signing out:', error);
      console.error('Error details:', {
        name: error?.name,
        message: error?.message,
        code: error?.code,
        stack: error?.stack,
      });
      throw error;
    }
  };

  const signOut = async () => {
    await handleSignOut();
  };

  const authContextValue: AuthContextType = { user, initialized, signOut };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default {
  useAuth,
  AuthProvider,
};
