import { MD3LightTheme, configureFonts } from 'react-native-paper';
import type { AppTheme } from '../types/theme';
import { MD3Typescale, MD3Type } from 'react-native-paper/lib/typescript/types';

const withOpacity = (color: string, opacity: number) => {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const fontConfig: Partial<Record<keyof MD3Typescale, MD3Type>> = {
  titleMedium: { fontFamily: 'Nunito', fontWeight: '600', fontSize: 20, lineHeight: 28, letterSpacing: 0 },
  bodyMedium: { fontFamily: 'Nunito', fontWeight: '400', fontSize: 16, lineHeight: 24, letterSpacing: 0 },
  displayLarge: { fontFamily: 'Kameron', fontWeight: '400', fontSize: 57, lineHeight: 64, letterSpacing: 0 },
  displayMedium: { fontFamily: 'Kameron', fontWeight: '400', fontSize: 45, lineHeight: 52, letterSpacing: 0 },
  displaySmall: { fontFamily: 'Kameron', fontWeight: '400', fontSize: 36, lineHeight: 44, letterSpacing: 0 },
  headlineLarge: { fontFamily: 'Kameron', fontWeight: '400', fontSize: 32, lineHeight: 40, letterSpacing: 0 },
  headlineMedium: { fontFamily: 'Kameron', fontWeight: '400', fontSize: 28, lineHeight: 36, letterSpacing: 0 },
  headlineSmall: { fontFamily: 'Kameron', fontWeight: '400', fontSize: 24, lineHeight: 32, letterSpacing: 0 },
  titleLarge: { fontFamily: 'Nunito', fontWeight: '400', fontSize: 22, lineHeight: 28, letterSpacing: 0 },
  titleSmall: { fontFamily: 'Nunito', fontWeight: '500', fontSize: 14, lineHeight: 20, letterSpacing: 0.1 },
  bodyLarge: { fontFamily: 'Nunito', fontWeight: '400', fontSize: 16, lineHeight: 24, letterSpacing: 0.5 },
  bodySmall: { fontFamily: 'Nunito', fontWeight: '400', fontSize: 12, lineHeight: 16, letterSpacing: 0.4 },
  labelLarge: { fontFamily: 'Nunito', fontWeight: '500', fontSize: 14, lineHeight: 20, letterSpacing: 0.1 },
  labelMedium: { fontFamily: 'Nunito', fontWeight: '500', fontSize: 12, lineHeight: 16, letterSpacing: 0.5 },
  labelSmall: { fontFamily: 'Nunito', fontWeight: '500', fontSize: 11, lineHeight: 16, letterSpacing: 0.5 },
};

export const theme: AppTheme = {
  ...MD3LightTheme,
  version: 3 as const,
  isV3: true,
  fonts: configureFonts({ config: { ...fontConfig } }) as any,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#5DA47A',
    background: '#F2F7F4',
    secondary: '#5DA47A',
    tertiary: '#4C8A65',
    surface: '#FFFFFF',
    surfaceVariant: '#F7FAF8',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onTertiary: '#FFFFFF',
    onSurface: '#1A1A1A',
    onSurfaceVariant: '#2D2D2D',
    error: '#B00020',
    onError: '#FFFFFF',
    onBackground: '#1A1A1A',
    primaryContainer: '#B2D9C1',
    onPrimaryContainer: '#1A472A',
    secondaryContainer: '#B2D9C1',
    onSecondaryContainer: '#1A472A',
    tertiaryContainer: '#90C2A6',
    onTertiaryContainer: '#003311',
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
    backdrop: 'rgba(45, 48, 56, 0.3)',
    elevation: {
      level0: 0,
      level1: 1, // Cards, surfaces
      level2: 2, // Buttons
      level3: 4, // FABs, bottom sheets
      level4: 8, // Navigation drawers
      level5: 12, // Dialogs
    },
    status: {
      success: '#4CAF50',
      warning: '#FFC107',
      error: '#F44336',
      info: '#2196F3'
    }
  },
  spacing: {
    tiny: 4,
    small: 8,
    medium: 16,
    large: 24
  },

  // Add specific material design component sizes:
  componentSizes: {
    buttonHeight: 40,
    buttonMinWidth: 64,
    iconSize: 24,
    touchableMinHeight: 48,
    cardBorderRadius: 12,
    buttonBorderRadius: 20,
  },
  roundness: 8,
  shape: { borderRadius: 8 },
  chartColors: {
    grid: '#CCCCCC',
    area: '#D1E4FF',
    point: '#36618E',
    progress: { active: '#36618E', inactive: '#D1E4FF' },
  },
  moodColors: {
    peace: '#A8E6CF',
    joy: '#F8D568',
    love: '#FFB6C1',
    reason: '#BDB2FF',
    acceptance: '#AED9E0',
    shame: '#E6B8B8',
    guilt: '#F06292',
    apathy: '#FFB74D',
    grief: '#FF8A65',
    fear: '#FFF176',
    desire: '#A5D6A7',
    anger: '#81D4FA',
    pride: '#B39DDB',
    willfulness: '#9575CD',
    humiliation: '#E57373',
    regret: '#F06292',
    anxiety: '#FFF176',
    hate: '#81D4FA',
    aggression: '#81D4FA',
  },
  animation: { scale: 1.0 },
  dark: false,
  scaleFont: (size: number) => size,
  scaleSize: (size: number) => size,
  withOpacity,
};

export const CARD_ELEVATION = {
  DEFAULT: theme.colors.elevation.level1,
  RAISED: theme.colors.elevation.level2,
  FLOATING: theme.colors.elevation.level3
};
