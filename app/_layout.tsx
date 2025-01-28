import { Stack } from 'expo-router';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { AuthProvider } from '../context/auth';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Extend the theme to include custom colors, fonts, etc
const theme = extendTheme({
  colors: {
    primary: {
      50: '#E8F5E9',
      100: '#C8E6C9',
      200: '#A5D6A7',
      300: '#81C784',
      400: '#66BB6A',
      500: '#4CAF50',  // Main primary color
      600: '#43A047',
      700: '#388E3C',
      800: '#2E7D32',
      900: '#1B5E20',
    },
    coolGray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },
  config: {
    initialColorMode: 'light',
  },
});

export default function RootLayout() {
  useEffect(() => {
    // Hide splash screen after resources are loaded
    SplashScreen.hideAsync();
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          {/* Initial screens */}
          <Stack.Screen name="index" />
          <Stack.Screen name="survey" />
          
          {/* Tab Navigation */}
          <Stack.Screen name="tabs" />
          
          {/* Modal screens */}
          <Stack.Screen 
            name="mood"
            options={{ presentation: 'modal' }}
          />
          <Stack.Screen 
            name="player"
            options={{ presentation: 'modal' }}
          />
        </Stack>
      </AuthProvider>
    </NativeBaseProvider>
  );
}