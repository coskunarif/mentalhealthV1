import { MD3LightTheme, configureFonts } from 'react-native-paper';
import type { AppTheme, ChartColors } from '../types/theme';

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
  bodyMedium: { ...baseFont, fontSize: 14, lineHeight: 20 },
  bodySmall: { ...baseFont, fontSize: 12, lineHeight: 18 },
  labelLarge: { ...baseFont, fontSize: 14, lineHeight: 20 },
  labelMedium: { ...baseFont, fontSize: 12, lineHeight: 18 },
  labelSmall: { ...baseFont, fontSize: 11, lineHeight: 16 },
};

const chartColors: ChartColors = {
  grid: '#E8F5EE',
  area: '#5DA47A',
  point: '#FFB74D',
  progress: {
    active: '#5DA47A',
    inactive: '#E8F5EE'
  }
};

const customTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#5DA47A',
    primaryContainer: '#E9F2EE',
    secondary: '#4A8362',
    secondaryContainer: '#C8DCD2',
    tertiary: '#4A8362',
    tertiaryContainer: '#C8DCD2',
    surface: '#FFFFFF',
    surfaceVariant: '#F3F4F6',
    surfaceDisabled: '#F3F4F6',
    background: '#FFFFFF',
    error: '#B00020',
    errorContainer: '#FDECEA',
    onPrimary: '#FFFFFF',
    onPrimaryContainer: '#002116',
    onSecondary: '#FFFFFF',
    onSecondaryContainer: '#002116',
    onTertiary: '#FFFFFF',
    onTertiaryContainer: '#002116',
    onSurface: '#000000',
    onSurfaceVariant: '#6B7280',
    onSurfaceDisabled: '#6B7280',
    onError: '#FFFFFF',
    onErrorContainer: '#410E0B',
    onBackground: '#000000',
    outline: '#E5E7EB',
    outlineVariant: '#C4C7CC',
    inverseSurface: '#000000',
    inverseOnSurface: '#FFFFFF',
    inversePrimary: '#7DC69F',
    shadow: 'rgba(0, 0, 0, 0.1)',
    scrim: 'rgba(0, 0, 0, 0.3)',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    elevation: {
      level0: 'transparent',
      level1: '#F3F4F6',
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
    colors
}
