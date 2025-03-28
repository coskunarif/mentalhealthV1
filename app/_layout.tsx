import React, { useEffect, useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { PaperProvider } from 'react-native-paper';
import { Stack } from 'expo-router';
import { AuthProvider } from './context/auth';
import { theme as importedTheme } from './config/theme';
import ErrorBoundary from './components/ErrorBoundary';
import type { AppTheme } from './types/theme';
import { useTheme } from 'react-native-paper';
// Add at the beginning of app/_layout.tsx to check Auth state on startup (Added)
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase-utils'; // Assuming firebase-utils exports auth

// Initialize Firebase once at app startup before component rendering
import './lib/firebase';

// Keep the splash screen visible while resources load
SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const appTheme = useTheme<AppTheme>();

  // At the beginning of AppLayout function (Added)
  useEffect(() => {
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
  
  const [loaded] = useFonts({
    'Kameron': require('../assets/fonts/Kameron-Regular.ttf'),
    'Kameron-Bold': require('../assets/fonts/Kameron-Bold.ttf'),
    'Nunito': require('../assets/fonts/Nunito-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (loaded) {
      await SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <PaperProvider theme={importedTheme}>
        <AuthProvider>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: appTheme.colors.surface,
              },
              headerShadowVisible: false,
              headerTitleStyle: { ...appTheme.fonts.titleMedium },
              contentStyle: {
                backgroundColor: appTheme.colors.background,
              },
              headerShown: false,
            }}
          />
        </AuthProvider>
      </PaperProvider>
    </ErrorBoundary>
  );
}
