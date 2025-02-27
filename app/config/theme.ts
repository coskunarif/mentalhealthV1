import { configureFonts, MD3Colors } from 'react-native-paper';
import type { AppTheme } from '../types/theme';
import { MD3Typescale, MD3Type } from 'react-native-paper/lib/typescript/types';

// Helper function to create opacity variants
const withOpacity = (color: string, opacity: number) => {
  // Convert hex to rgba
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const fontConfig: Partial<Record<keyof MD3Typescale, MD3Type>> = {
  titleMedium: {
    fontFamily: 'Nunito',
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0,
  },
  bodyMedium: {
    fontFamily: 'Nunito',
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
  },
  displayLarge: {
    fontFamily: 'Nunito',
    fontWeight: "400",
    fontSize: 57,
    lineHeight: 64,
    letterSpacing: 0,
  },
  displayMedium: {
    fontFamily: 'Nunito',
    fontWeight: "400",
    fontSize: 45,
    lineHeight: 52,
    letterSpacing: 0,
  },
  displaySmall: {
    fontFamily: 'Nunito',
    fontWeight: "400",
    fontSize: 36,
    lineHeight: 44,
    letterSpacing: 0,
  },
  headlineLarge: {
    fontFamily: 'Nunito',
    fontWeight: "400",
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: 0,
  },
  headlineMedium: {
    fontFamily: 'Nunito',
    fontWeight: "400",
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: 0,
  },
  headlineSmall: {
    fontFamily: 'Nunito',
    fontWeight: "400",
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
  },
  titleLarge: {
    fontFamily: 'Nunito',
    fontWeight: "400",
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0,
  },
  titleSmall: {
    fontFamily: 'Nunito',
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  bodyLarge: {
    fontFamily: 'Nunito',
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  bodySmall: {
    fontFamily: 'Nunito',
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  labelLarge: {
    fontFamily: 'Nunito',
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontFamily: 'Nunito',
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontFamily: 'Nunito',
    fontWeight: "500",
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
};

export const theme: AppTheme = {
  version: 3 as const,
  isV3: true,
  // Update fonts to use Nunito
  fonts: configureFonts({
    config: {
      ...fontConfig,
      displayLarge: { fontFamily: 'Nunito', ...fontConfig.displayLarge },
      displayMedium: { fontFamily: 'Nunito', ...fontConfig.displayMedium },
      displaySmall: { fontFamily: 'Nunito', ...fontConfig.displaySmall },
      headlineLarge: { fontFamily: 'Nunito', ...fontConfig.headlineLarge },
      headlineMedium: { fontFamily: 'Nunito', ...fontConfig.headlineMedium },
      headlineSmall: { fontFamily: 'Nunito', ...fontConfig.headlineSmall },
      titleLarge: { fontFamily: 'Nunito', ...fontConfig.titleLarge },
      titleMedium: { fontFamily: 'Nunito', ...fontConfig.titleMedium },
      titleSmall: { fontFamily: 'Nunito', ...fontConfig.titleSmall },
      bodyLarge: { fontFamily: 'Nunito', ...fontConfig.bodyLarge },
      bodyMedium: { fontFamily: 'Nunito', ...fontConfig.bodyMedium },
      bodySmall: { fontFamily: 'Nunito', ...fontConfig.bodySmall },
      labelLarge: { fontFamily: 'Nunito', ...fontConfig.labelLarge },
      labelMedium: { fontFamily: 'Nunito', ...fontConfig.labelMedium },
      labelSmall: { fontFamily: 'Nunito', ...fontConfig.labelSmall },
    }
  }) as any,
  colors: {
    primary: '#5DA47A',
    background: '#F2F7F4', // 60% - Very light background
    secondary: '#5DA47A', // 30% - Primary Green
    tertiary: '#4C8A65', // 10% - Darker shade of primary

    // Surface colors
    surface: '#FFFFFF',
    surfaceVariant: '#F7FAF8',

    // Text colors
    onPrimary: '#FFFFFF', // White text on primary green
    onSecondary: '#FFFFFF',
    onTertiary: '#FFFFFF',
    onSurface: '#1A1A1A',
    onSurfaceVariant: '#2D2D2D',
    // Status Colors
    error: '#B00020',
    onError: '#FFFFFF',
    onBackground: '#1A1A1A',
    primaryContainer: '#B2D9C1', // Lighter shade of primary
    onPrimaryContainer: '#1A472A', // Darker shade for text on primaryContainer
    secondaryContainer: '#B2D9C1', // Lighter shade of secondary
    onSecondaryContainer: '#1A472A', // Darker shade for text on secondaryContainer
    tertiaryContainer: '#90C2A6', // Lighter shade of tertiary
    onTertiaryContainer: '#003311', // Darker shade for text on tertiaryContainer
    errorContainer: '#F9DEDC',
    onErrorContainer: '#410002',
    outline: '#79747E',
    outlineVariant: '#CAC4D0',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#2F3033',
    inverseOnSurface: '#F1F0F4',
    inversePrimary: '#9ECAFF',
    surfaceDisabled: 'rgba(28, 27, 31, 0.12)',
    onSurfaceDisabled: 'rgba(28, 27, 31, 0.38)',
    backdrop: 'rgba(45, 48, 56, 0.4)',
    elevation: {
      level0: 0,
      level1: 1,
      level2: 2, // Was using this one
      level3: 3,
      level4: 4,
      level5: 5,
    }
  },
  spacing: {
    tiny: 4,
    small: 8,
    medium: 16,
    large: 24,
  },
  roundness: 8,
  shape: {
    borderRadius: 8,
  },
  chartColors: {
    grid: '#CCCCCC',
    area: '#D1E4FF',
    point: '#36618E',
    progress: {
      active: '#36618E',
      inactive: '#D1E4FF',
    },
  },
  moodColors: {
    peace: '#A8E6CF',
    joy: '#F8D568',
    love: '#FFB6C1',
    reason: '#BDB2FF',
    acceptance: '#AED9E0',
    shame: '#E6B8B8', // Added from recommendation
    guilt: '#F06292', // Keep consistent with colors.ts for now
    apathy: '#FFB74D', // Keep consistent with colors.ts for now
    grief: '#FF8A65', // Keep consistent with colors.ts for now
    fear: '#FFF176', // Keep consistent with colors.ts for now
    desire: '#A5D6A7', // Keep consistent with colors.ts for now
    anger: '#81D4FA', // Keep consistent with colors.ts for now
    pride: '#B39DDB', // Keep consistent with colors.ts for now
    willfulness: '#9575CD', // Keep consistent with colors.ts for now
    humiliation: '#E57373', // Added, same as shame for now
    regret: '#F06292', // Added, same as guilt for now
    anxiety: '#FFF176', // Added, same as fear for now
    hate: '#81D4FA', // Added, same as anger for now
    aggression: '#81D4FA', // Added, same as anger for now
  },
  animation: {
    scale: 1.0, // You can adjust this value if needed
  },
  dark: false,
  scaleFont: (size: number) => size,
  scaleSize: (size: number) => size,
  withOpacity,
};
