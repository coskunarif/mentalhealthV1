import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, User } from '../lib/firebase-utils';
import { onAuthStateChanged } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  initialized: boolean;
  loading: boolean; // Add loading state
  signOut: () => Promise<void>;
}

// Provide default values for the context (optional, but good practice)
export const AuthContext = createContext<AuthContextType>({
  user: null,
  initialized: false,
  loading: true, // Default to loading
  signOut: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Only subscribe to auth state changes - don't initialize auth again
    const unsubscribe = onAuthStateChanged(auth, (authUser: User | null) => {
      console.log('authUser:', authUser); // Added log
      setUser(authUser);
      setInitialized(true);
      setLoading(false); // Set loading to false after auth state is determined
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const authContextValue: AuthContextType = {
    user,
    initialized,
    loading, // Provide loading state
    signOut: handleSignOut
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
