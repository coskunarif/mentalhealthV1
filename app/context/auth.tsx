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
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setInitialized(true);
    });

    return unsubscribe;
  }, []);

  const signOut = async () => {
    try {
      // Sign out from Firebase
      await auth.signOut();
      
      // Clear all user-related data from AsyncStorage
      const keys = ['user', 'userPreferences', 'recentActivities'];
      await Promise.all(keys.map(key => AsyncStorage.removeItem(key)));
      
      // Reset user state
      setUser(null);
      
      // Note: Navigation will be handled automatically by the root navigator
      // when auth state changes to null
    } catch (error) {
      console.error('Error signing out:', error);
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
