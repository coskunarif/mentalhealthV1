import React, { useEffect, useCallback } from 'react';
// Add this import:
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './lib/firebase-utils/config'; // Adjust path if needed
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { PaperProvider } from 'react-native-paper';
import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from './context/auth'; // Import useAuth
import { lightTheme, darkTheme } from './config/theme'; // Import specific themes
import ErrorBoundary from './components/ErrorBoundary';
import type { AppTheme } from './types/theme';
// Import locale registration
import { registerTranslation, en } from 'react-native-paper-dates';
// Remove unused useTheme import from here if not used elsewhere in this file
// Add at the beginning of app/_layout.tsx to check Auth state on startup (Added)
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase-utils'; // Assuming firebase-utils exports auth

// Import Firebase utils - this will trigger initialization if needed
import './lib/firebase';

// Register the English locale for react-native-paper-dates
registerTranslation('en', en);

// Keep the splash screen visible while resources load
SplashScreen.preventAutoHideAsync();

// Define a component to handle theme selection and rendering
function ThemedApp() {
  const { user, initialized, loading } = useAuth(); // Get user and loading state

  // Determine the theme based on user settings, default to light
  // Only apply user theme once auth is initialized and not loading
  const currentTheme = React.useMemo(() => {
    if (!initialized || loading) {
      return lightTheme; // Default to light theme while loading/initializing
    }
    return user?.settings?.theme === 'dark' ? darkTheme : lightTheme;
  }, [user, initialized, loading]);

  // Use the selected theme for Stack navigator styling
  const screenOptions = React.useMemo(() => ({
    headerStyle: {
      backgroundColor: currentTheme.colors.surface,
    },
    headerShadowVisible: false,
    headerTitleStyle: { ...currentTheme.fonts.titleMedium },
    contentStyle: {
      backgroundColor: currentTheme.colors.background,
    },
    headerShown: false,
  }), [currentTheme]);


  // The rest of the original AppLayout logic, now inside ThemedApp
  // Debugging useEffects
  useEffect(() => {
    // ... (keep the existing useEffects for debugging if needed) ...
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('[DEBUG] Auth state changed, user:', user?.uid);
      if (user) {
        console.log('[DEBUG] User email:', user.email);
      } else {
        console.log('[DEBUG] No user signed in');
      }
    });
    
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      if (auth.currentUser) {
        console.log("Current auth user:", auth.currentUser.uid);
        try {
          const token = await auth.currentUser.getIdToken(true);
          console.log("Token retrieved successfully, length:", token.length);
        } catch (e) {
          console.error("Token retrieval error:", e);
        }
      } else {
        console.log("No authenticated user");
      }
    };
    
    checkAuth();
    const unsubscribeAuthState = onAuthStateChanged(auth, checkAuth);
    return () => unsubscribeAuthState();
  }, []);
  
  useEffect(() => {
    if (auth.app?.options) {
      console.log("Connected to Firebase project:", auth.app.options.projectId);
    }
  }, []);

  // Font loading logic remains the same
  const [loaded] = useFonts({
    'Kameron': require('../assets/fonts/Kameron-Regular.ttf'),
    'Kameron-Bold': require('../assets/fonts/Kameron-Bold.ttf'),
    'Nunito': require('../assets/fonts/Nunito-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    // Hide splash screen only when fonts AND auth are ready
    if (loaded && initialized) {
      await SplashScreen.hideAsync();
    }
  }, [loaded, initialized]); // Add initialized dependency

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  // Show splash screen until fonts are loaded AND auth is initialized
  if (!loaded || !initialized) {
    return null;
  }

  // Render the themed stack navigator
  return (
    <PaperProvider theme={currentTheme}>
      <Stack screenOptions={screenOptions} />
    </PaperProvider>
  );
}

// Main AppLayout component wraps everything in providers
export default function AppLayout() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemedApp />
      </AuthProvider>
    </ErrorBoundary>
  );
}
