import { MD3LightTheme, configureFonts } from 'react-native-paper';
import type { AppTheme, ChartColors } from '../types/theme';
import appColors from './colors';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Scaling function based on screen width
const scaleFont = (size: number) => {
  const scale = width / 375; // 375 is a common base screen width
  return Math.round(size * scale);
};

const baseFont = {
  fontFamily: 'Kameron',
};

const baseBoldFont = {
  fontFamily: 'Kameron-Bold',
};

const fontConfig = {
  displayLarge: { ...baseBoldFont, fontSize: scaleFont(34), lineHeight: scaleFont(40) },
  displayMedium: { ...baseBoldFont, fontSize: scaleFont(28), lineHeight: scaleFont(36) },
  displaySmall: { ...baseBoldFont, fontSize: scaleFont(20), lineHeight: scaleFont(32) },
  headlineLarge: { ...baseBoldFont, fontSize: scaleFont(22), lineHeight: scaleFont(28) },
  headlineMedium: { ...baseBoldFont, fontSize: scaleFont(20), lineHeight: scaleFont(26) },
  headlineSmall: { ...baseBoldFont, fontSize: scaleFont(18), lineHeight: scaleFont(24) },
  titleLarge: { ...baseBoldFont, fontSize: scaleFont(18), lineHeight: scaleFont(24) },
  titleMedium: { ...baseFont, fontSize: scaleFont(16), lineHeight: scaleFont(22) },
  titleSmall: { ...baseFont, fontSize: scaleFont(14), lineHeight: scaleFont(20) },
  bodyLarge: { ...baseFont, fontSize: scaleFont(16), lineHeight: scaleFont(22) },
  bodyMedium: { ...baseFont, fontSize: scaleFont(16), lineHeight: scaleFont(22) },
  bodySmall: { ...baseFont, fontSize: scaleFont(16), lineHeight: scaleFont(22) },
  labelLarge: { ...baseFont, fontSize: scaleFont(14), lineHeight: scaleFont(20) },
  labelMedium: { ...baseFont, fontSize: scaleFont(12), lineHeight: scaleFont(18) },
  labelSmall: { ...baseFont, fontSize: scaleFont(11), lineHeight: scaleFont(16) },
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
  spacing: {
    medium: 16,
    small: 8,
    tiny: 4,
  },
  shape: {
    borderRadius: 8,
  },
  elevation: {
    level2: '#2',
  },
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
