import React, { useEffect, useCallback } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from './context/auth';
import { theme } from './config/theme';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const commonScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'slide_from_right',
};

const modalScreenOptions: NativeStackNavigationOptions = {
  presentation: 'modal',
  animation: 'slide_from_bottom',
  gestureEnabled: true,
  gestureDirection: 'vertical',
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
            {/* Initial Route */}
            <Stack.Screen name="index" options={{ headerShown: false }} />
            
            {/* Welcome Screen */}
            <Stack.Screen name="welcome" options={{ headerShown: false }} />
            
            {/* Auth Stack */}
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            
            {/* Main Navigation */}
            <Stack.Screen 
              name="tabs" 
              options={{ headerShown: false }}
            />
            
            {/* Modal Screens */}
            <Stack.Screen
              name="survey"
              options={{
                ...modalScreenOptions,
                title: 'Daily Check-in',
              }}
            />
            <Stack.Screen
              name="mood"
              options={{
                ...modalScreenOptions,
                title: 'Mood Check',
              }}
            />
            <Stack.Screen
              name="player"
              options={{
                ...modalScreenOptions,
                title: 'Meditation',
              }}
            />
            
            {/* Error Screen */}
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