import { MD3LightTheme, configureFonts } from 'react-native-paper';
import type { AppTheme, ChartColors } from '../types/theme';
import appColors from './colors';

const baseFont = {
  fontFamily: 'Kameron',
};

const baseBoldFont = {
  fontFamily: 'Kameron-Bold',
};

const fontConfig = {
  displayLarge: { ...baseBoldFont, fontSize: 34, lineHeight: 40 },
  displayMedium: { ...baseBoldFont, fontSize: 28, lineHeight: 36 },
  displaySmall: { ...baseBoldFont, fontSize: 24, lineHeight: 32 },
  headlineLarge: { ...baseBoldFont, fontSize: 22, lineHeight: 28 },
  headlineMedium: { ...baseBoldFont, fontSize: 20, lineHeight: 26 },
  headlineSmall: { ...baseBoldFont, fontSize: 18, lineHeight: 24 },
  titleLarge: { ...baseBoldFont, fontSize: 18, lineHeight: 24 },
  titleMedium: { ...baseFont, fontSize: 16, lineHeight: 22 },
  titleSmall: { ...baseFont, fontSize: 14, lineHeight: 20 },
  bodyLarge: { ...baseFont, fontSize: 16, lineHeight: 22 },
  bodyMedium: { ...baseFont, fontSize: 16, lineHeight: 22 },
  bodySmall: { ...baseFont, fontSize: 16, lineHeight: 22 },
  labelLarge: { ...baseFont, fontSize: 14, lineHeight: 20 },
  labelMedium: { ...baseFont, fontSize: 12, lineHeight: 18 },
  labelSmall: { ...baseFont, fontSize: 11, lineHeight: 16 },
};

const chartColors: ChartColors = {
  grid: appColors.colors.dominant,
  area: appColors.colors.secondary,
  point: appColors.colors.accent,
  progress: {
    active: appColors.colors.secondary,
    inactive: appColors.colors.dominant,
  },
};

const customTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: appColors.colors.secondary,
    primaryContainer: appColors.colors.dominant,
    secondary: appColors.colors.secondary,
    secondaryContainer: appColors.colors.dominant,
    tertiary: appColors.colors.accent,
    tertiaryContainer: appColors.colors.dominant,
    surface: appColors.colors.surface,
    surfaceVariant: appColors.colors.surfaceVariant,
    surfaceDisabled: appColors.colors.surfaceVariant, // Assuming you want disabled surfaces to be the same as the variant
    background: appColors.colors.dominant,
    error: appColors.colors.error,
    errorContainer: '#FDECEA', // You might want to define this in colors.ts as well
    onPrimary: appColors.colors.onSecondary,
    onPrimaryContainer: appColors.colors.onDominant,
    onSecondary: appColors.colors.onSecondary,
    onSecondaryContainer: appColors.colors.onDominant,
    onTertiary: appColors.colors.onAccent,
    onTertiaryContainer: appColors.colors.onDominant,
    onSurface: appColors.colors.onSurface,
    onSurfaceVariant: appColors.colors.onSurfaceVariant,
    onSurfaceDisabled: appColors.colors.onSurfaceVariant, // Assuming you want disabled text to be the same as variant
    onError: '#FFFFFF', // Standard on error color
    onErrorContainer: '#410E0B', // Standard on error container color
    onBackground: appColors.colors.onDominant,
    outline: '#E5E7EB', // Keep this as is, or define in colors.ts
    outlineVariant: '#C4C7CC', // Keep this as is, or define in colors.ts
    inverseSurface: '#000000', // Keep
    inverseOnSurface: '#FFFFFF', // Keep
    inversePrimary: '#7DC69F', // Keep
    shadow: 'rgba(0, 0, 0, 0.1)',
    scrim: 'rgba(0, 0, 0, 0.3)',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    elevation: {
      level0: 'transparent',
      level1: '#F3F4F6', // You might want to use surfaceVariant or dominant here
      level2: '#E5E7EB',
      level3: '#D1D5DB',
      level4: '#9CA3AF',
      level5: '#6B7280',
    },
  },
  fonts: configureFonts({ config: fontConfig }),
};

export const colors = customTheme.colors;

export const theme: AppTheme = {
  ...customTheme,
  chartColors,
};

export default {
  theme,
  colors,
};
