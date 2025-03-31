import { MD3LightTheme, MD3DarkTheme, configureFonts } from 'react-native-paper'; // Import MD3DarkTheme
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

// Define base fonts to be shared
const baseFonts = configureFonts({ config: { ...fontConfig } }) as any;

// --- Light Theme ---
export const lightTheme: AppTheme = {
  ...MD3LightTheme,
  version: 3 as const,
  isV3: true,
  fonts: baseFonts,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#5DA47A', // Keep custom primary
    background: '#F2F7F4', // Custom light background
    secondary: '#5DA47A', // Keep custom secondary
    tertiary: '#4C8A65', // Keep custom tertiary
    surface: '#FFFFFF', // Custom light surface
    surfaceVariant: '#F7FAF8', // Custom light surface variant
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onTertiary: '#FFFFFF',
    onSurface: '#1A1A1A', // Custom light onSurface
    onSurfaceVariant: '#2D2D2D', // Custom light onSurfaceVariant
    error: '#B00020', // Keep custom error
    onError: '#FFFFFF', // Keep custom onError
    onBackground: '#1A1A1A', // Custom light onBackground
    primaryContainer: '#B2D9C1', // Keep custom primaryContainer
    onPrimaryContainer: '#1A472A', // Keep custom onPrimaryContainer
    secondaryContainer: '#B2D9C1', // Keep custom secondaryContainer
    onSecondaryContainer: '#1A472A', // Keep custom onSecondaryContainer
    tertiaryContainer: '#90C2A6', // Keep custom tertiaryContainer
    onTertiaryContainer: '#003311', // Keep custom onTertiaryContainer
    errorContainer: '#F9DEDC', // Keep custom errorContainer
    onErrorContainer: '#410002', // Keep custom onErrorContainer
    outline: '#79747E', // Keep default outline
    outlineVariant: '#CAC4D0', // Keep default outlineVariant
    shadow: '#000000', // Keep default shadow
    scrim: '#000000', // Keep default scrim
    inverseSurface: '#2F3033', // Keep default inverseSurface
    inverseOnSurface: '#F1F0F4', // Keep default inverseOnSurface
    inversePrimary: '#9ECAFF', // Keep default inversePrimary
    surfaceDisabled: 'rgba(28, 27, 31, 0.12)', // Keep default surfaceDisabled
    onSurfaceDisabled: 'rgba(28, 27, 31, 0.38)', // Keep default onSurfaceDisabled
    backdrop: 'rgba(45, 48, 56, 0.3)', // Keep custom backdrop
    elevation: { // Keep custom elevation levels
      level0: 0,
      level1: 1,
      level2: 2,
      level3: 4,
      level4: 8,
      level5: 12,
    },
    status: { // Keep custom status colors
      success: '#4CAF50',
      warning: '#FFC107',
      error: '#F44336',
      info: '#2196F3'
    }
  },
  spacing: { // Keep custom spacing
    tiny: 4,
    small: 8,
    medium: 16,
    large: 24
  },
  componentSizes: { // Keep custom component sizes
    buttonHeight: 40,
    buttonMinWidth: 64,
    iconSize: 24,
    touchableMinHeight: 48,
    cardBorderRadius: 12,
    buttonBorderRadius: 20,
  },
  roundness: 8, // Keep custom roundness
  shape: { borderRadius: 8 }, // Keep custom shape
  chartColors: { // Keep custom chart colors (might need dark mode adjustment later)
    grid: '#CCCCCC',
    area: '#D1E4FF',
    point: '#36618E',
    progress: { active: '#36618E', inactive: '#D1E4FF' },
  },
  moodColors: { // Keep custom mood colors (might need dark mode adjustment later)
    peace: '#A8E6CF',
    joy: '#F8D568',
    love: '#FFB6C1', // Pink
    reason: '#BDB2FF', // Purple
    acceptance: '#AED9E0', // Light Blue
    shame: '#E6B8B8', // Desaturated Red
    guilt: '#F06292', // Pink-Red
    apathy: '#FFB74D', // Orange
    grief: '#FF8A65', // Coral
    fear: '#FFF176', // Yellow
    desire: '#A5D6A7', // Light Green
    anger: '#81D4FA', // Blue
    pride: '#B39DDB', // Lavender
    willfulness: '#9575CD', // Deeper Purple
    humiliation: '#E57373', // Red
    regret: '#F06292', // Pink-Red (same as guilt)
    anxiety: '#FFF176', // Yellow (same as fear)
    hate: '#81D4FA', // Blue (same as anger)
    aggression: '#81D4FA', // Blue (same as anger)
  },
  animation: { scale: 1.0 }, // Keep custom animation
  dark: false, // Specific to light theme
  scaleFont: (size: number) => size, // Keep custom scaleFont
  scaleSize: (size: number) => size, // Keep custom scaleSize
  withOpacity, // Keep helper function
};

// --- Dark Theme ---
export const darkTheme: AppTheme = {
  ...MD3DarkTheme,
  version: 3 as const,
  isV3: true,
  fonts: baseFonts, // Use the same fonts
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#7DCEA0', // Lighter shade of primary for dark mode
    background: '#121212', // Standard dark background
    secondary: '#7DCEA0', // Lighter shade
    tertiary: '#6ABB87', // Lighter shade
    surface: '#1E1E1E', // Slightly lighter dark surface
    surfaceVariant: '#2C2C2C', // Darker surface variant
    onPrimary: '#00381A', // Dark text on light primary
    onSecondary: '#00381A', // Dark text on light secondary
    onTertiary: '#00381A', // Dark text on light tertiary
    onSurface: '#E0E0E0', // Light text on dark surface
    onSurfaceVariant: '#BDBDBD', // Lighter text on dark surface variant
    error: '#CF6679', // Standard dark error color
    onError: '#140C0D',
    onBackground: '#E0E0E0', // Light text on dark background
    primaryContainer: '#3A6B4F', // Darker primary container
    onPrimaryContainer: '#B2D9C1', // Lighter text
    secondaryContainer: '#3A6B4F', // Darker secondary container
    onSecondaryContainer: '#B2D9C1', // Lighter text
    tertiaryContainer: '#2F5742', // Darker tertiary container
    onTertiaryContainer: '#90C2A6', // Lighter text
    errorContainer: '#B00020', // Keep light error container for contrast? Or adjust
    onErrorContainer: '#F9DEDC',
    outline: '#938F99',
    outlineVariant: '#49454F',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#E3E2E6',
    inverseOnSurface: '#303033',
    inversePrimary: '#006A60',
    surfaceDisabled: 'rgba(227, 226, 230, 0.12)',
    onSurfaceDisabled: 'rgba(227, 226, 230, 0.38)',
    backdrop: 'rgba(49, 48, 51, 0.4)',
    elevation: { // Use dark theme elevation values or keep custom? Using default dark for now.
      level0: MD3DarkTheme.colors.elevation.level0,
      level1: MD3DarkTheme.colors.elevation.level1,
      level2: MD3DarkTheme.colors.elevation.level2,
      level3: MD3DarkTheme.colors.elevation.level3,
      level4: MD3DarkTheme.colors.elevation.level4,
      level5: MD3DarkTheme.colors.elevation.level5,
    },
    status: { // Keep custom status colors (might need adjustment)
      success: '#81C784',
      warning: '#FFB74D',
      error: '#E57373',
      info: '#64B5F6'
    }
  },
  spacing: lightTheme.spacing, // Use same spacing
  componentSizes: lightTheme.componentSizes, // Use same component sizes
  roundness: lightTheme.roundness, // Use same roundness
  shape: lightTheme.shape, // Use same shape
  chartColors: { // Adjust chart colors for dark mode
    grid: '#555555',
    area: '#3A6B4F', // Darker area
    point: '#7DCEA0', // Lighter point
    progress: { active: '#7DCEA0', inactive: '#3A6B4F' },
  },
  moodColors: lightTheme.moodColors, // Use same mood colors (might need adjustment later)
  animation: lightTheme.animation, // Use same animation
  dark: true, // Specific to dark theme
  scaleFont: lightTheme.scaleFont, // Use same scaleFont
  scaleSize: lightTheme.scaleSize, // Use same scaleSize
  withOpacity, // Keep helper function
};


export const CARD_ELEVATION = { // Reference lightTheme for simplicity, or make dynamic
  DEFAULT: lightTheme.colors.elevation.level1,
  RAISED: lightTheme.colors.elevation.level2,
  FLOATING: lightTheme.colors.elevation.level3
};

// Removed default export

export default lightTheme; // Add lightTheme as the default export
