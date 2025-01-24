import { Stack } from 'expo-router';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { useColorScheme } from 'react-native';
import { AuthProvider } from '../context/auth';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Define your custom theme
const theme = extendTheme({
  colors: {
    primary: {
      50: '#E3F2F9',
      100: '#C5E4F3',
      200: '#A2D4EC',
      300: '#7AC1E4',
      400: '#47A9DA',
      500: '#2E5BFF', // Primary color
      600: '#007AB8',
      700: '#006BA1',
      800: '#005885',
      900: '#003F5E',
    },
  },
  config: {
    // Changing initial color mode to 'dark'
    initialColorMode: 'light',
  },
});

export default function RootLayout() {
  useEffect(() => {
    // Hide splash screen after resources are loaded
    SplashScreen.hideAsync();
  }, []);

  const colorScheme = useColorScheme();

  return (
    <NativeBaseProvider theme={theme}>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: colorScheme === 'dark' ? '#1A1B1E' : '#FFFFFF',
            },
            headerTintColor: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShown: false,
            animation: 'fade',
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding/index" />
        </Stack>
      </AuthProvider>
    </NativeBaseProvider>
  );
}