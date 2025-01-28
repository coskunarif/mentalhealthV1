import { createContext, useContext, useState, useEffect } from 'react';

// Mock user type
type MockUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
};

type AuthContextType = {
  user: MockUser | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

// Create a mock user
const mockUser: MockUser = {
  uid: 'mock-user-id',
  email: 'test@example.com',
  displayName: 'Test User'
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  signIn: async () => {},
  signUp: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(mockUser);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(id);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Mock sign in
      setUser(mockUser);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Mock sign up
      setUser(mockUser);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      // Mock logout
      setUser(null);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
