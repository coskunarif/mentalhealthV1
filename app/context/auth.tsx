import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, User, db } from '../lib/firebase-utils';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
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
  const [user, setUser] = useState<User | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (authUser: User | null) => {
      console.log('authUser:', authUser); // Added log

      if (authUser) {
        // Try to get additional user data from Firestore if needed
        try {
          const userRef = doc(db, 'users', authUser.uid);
          const userDoc = await getDoc(userRef);
          
          if (userDoc.exists()) {
            // Merge auth user with DB data
            const userData = userDoc.data();
            console.log('User data from Firestore:', userData);
            
            // Set user with merged data
            const enhancedUser = {
              ...authUser,
              displayName: userData.displayName || authUser.displayName,
              photoURL: userData.photoURL || authUser.photoURL,
              // Add other fields as needed
            };
            
            setUser(enhancedUser);
          } else {
            // No user document found, just use auth user
            console.log('No user document found in Firestore');
            setUser(authUser);
          }
        } catch (error) {
          console.error('Error fetching user data from Firestore:', error);
          // Fallback to auth user data
          setUser(authUser);
        }
      } else {
        setUser(null);
      }
      
      setInitialized(true);
      setLoading(false);
    }, (error) => {
      console.error('Auth state change error:', error);
      setInitialized(true);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      setLoading(true);
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
