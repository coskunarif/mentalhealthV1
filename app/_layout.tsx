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

// Initialize Firebase once at app startup before component rendering
import './lib/firebase';

// Keep the splash screen visible while resources load
SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const appTheme = useTheme<AppTheme>();
  
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
