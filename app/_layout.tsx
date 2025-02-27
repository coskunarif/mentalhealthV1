import React, { useEffect, useCallback } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from './context/auth';
import { theme } from './config/theme';
import ErrorBoundary from './components/ErrorBoundary';
import { layoutStyles } from './config';
// Remove explicit import from '@react-navigation/native-stack'
 
// Keep the splash screen visible while resources load
SplashScreen.preventAutoHideAsync();

// Cast options as any to bypass type conflicts
const commonScreenOptions: any = {
  headerShown: false,
};

const modalScreenOptions = {
  gestureEnabled: true,
};

export default function RootLayout() {
  const [loaded] = useFonts({
    'Kameron': require('../assets/fonts/Kameron-Regular.ttf'),
    'Kameron-Bold': require('../assets/fonts/Kameron-Bold.ttf'),
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
      <PaperProvider theme={theme}>
        <AuthProvider>
          <Stack screenOptions={commonScreenOptions}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="welcome" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Screen name="tabs" options={{ headerShown: false }} />
            <Stack.Screen
              name="survey"
              options={{
                ...modalScreenOptions,
                title: 'Daily Check-in',
                headerBackTitle: 'Back',
                presentation: 'modal',
              }}
            />
            <Stack.Screen
              name="mood"
              options={{
                ...modalScreenOptions,
                title: 'Mood Check',
                presentation: 'modal',
              }}
            />
            <Stack.Screen
              name="player"
              options={{
                ...modalScreenOptions,
                title: 'Meditation',
                presentation: 'modal',
              }}
            />
            <Stack.Screen
              name="not-found"
              options={{
                title: 'Oops!',
                presentation: 'modal',
              }}
            />
          </Stack>
        </AuthProvider>
      </PaperProvider>
    </ErrorBoundary>
  );
}
