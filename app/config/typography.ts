import { StyleSheet } from 'react-native';

// Typography Scale
export const typography = StyleSheet.create({
  // Display
  displayLarge: {
    fontFamily: 'Kameron-Bold',
    fontSize: 57,
    lineHeight: 64,
    letterSpacing: -0.25,
  },
  displayMedium: {
    fontFamily: 'Kameron-Bold',
    fontSize: 45,
    lineHeight: 52,
    letterSpacing: 0,
  },
  displaySmall: {
    fontFamily: 'Kameron-Bold',
    fontSize: 36,
    lineHeight: 44,
    letterSpacing: 0,
  },

  // Headline
  headlineLarge: {
    fontFamily: 'Kameron-Bold',
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: 0,
  },
  headlineMedium: {
    fontFamily: 'Kameron-Bold',
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: 0,
  },
  headlineSmall: {
    fontFamily: 'Kameron-Bold',
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
  },

  // Title
  titleLarge: {
    fontFamily: 'Kameron-Bold',
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0,
  },
  titleMedium: {
    fontFamily: 'Kameron',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  titleSmall: {
    fontFamily: 'Kameron',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },

  // Label
  labelLarge: {
    fontFamily: 'Kameron',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontFamily: 'Kameron',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontFamily: 'Kameron',
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.5,
  },

  // Body
  bodyLarge: {
    fontFamily: 'Kameron',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  bodyMedium: {
    fontFamily: 'Kameron',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontFamily: 'Kameron',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
});

// Helper function to combine typography styles with additional styles
export const combineTypography = (variant: keyof typeof typography, additionalStyles?: any) => {
  return [typography[variant], additionalStyles];
};
