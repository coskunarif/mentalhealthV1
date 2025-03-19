import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, User } from '../lib/firebase';

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
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      setUser(user);
      setInitialized(true);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      await AsyncStorage.removeItem(persistenceKey);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
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
