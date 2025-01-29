import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { PaperProvider, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';
import { AuthProvider } from '../context/auth';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#5DA47A',
    primaryContainer: '#E9F2EE',
    secondary: '#4A8362',
    secondaryContainer: '#C8DCD2',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    error: '#B00020',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onBackground: '#000000',
    onSurface: '#000000',
    onSurfaceVariant: '#6B7280',
  },
  fonts: {
    // Large titles and welcome screens
    displayLarge: { fontFamily: 'Kameron-Bold', fontSize: 34, lineHeight: 40 },
    displayMedium: { fontFamily: 'Kameron-Bold', fontSize: 28, lineHeight: 36 },
    displaySmall: { fontFamily: 'Kameron-Bold', fontSize: 24, lineHeight: 32 },
    
    // Section headers and questions
    headlineLarge: { fontFamily: 'Kameron-Bold', fontSize: 22, lineHeight: 28 },
    headlineMedium: { fontFamily: 'Kameron-Bold', fontSize: 20, lineHeight: 26 },
    headlineSmall: { fontFamily: 'Kameron-Bold', fontSize: 18, lineHeight: 24 },
    
    // Subtitles and important text
    titleLarge: { fontFamily: 'Kameron-Bold', fontSize: 18, lineHeight: 24 },
    titleMedium: { fontFamily: 'Kameron', fontSize: 16, lineHeight: 22 },
    titleSmall: { fontFamily: 'Kameron', fontSize: 14, lineHeight: 20 },
    
    // Body text and options
    bodyLarge: { fontFamily: 'Kameron', fontSize: 16, lineHeight: 22 },
    bodyMedium: { fontFamily: 'Kameron', fontSize: 14, lineHeight: 20 },
    bodySmall: { fontFamily: 'Kameron', fontSize: 12, lineHeight: 18 },
    
    // Labels and small text
    labelLarge: { fontFamily: 'Kameron', fontSize: 14, lineHeight: 20 },
    labelMedium: { fontFamily: 'Kameron', fontSize: 12, lineHeight: 18 },
    labelSmall: { fontFamily: 'Kameron', fontSize: 11, lineHeight: 16 },
  },
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Kameron': require('../assets/fonts/Kameron-Regular.ttf'),
    'Kameron-Bold': require('../assets/fonts/Kameron-Bold.ttf'),
  });

  useEffect(() => {
    const hideSplash = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };
    hideSplash();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
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
    </PaperProvider>
  );
}