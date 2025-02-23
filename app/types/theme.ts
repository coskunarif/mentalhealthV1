import { MD3Theme, configureFonts } from 'react-native-paper';
import { TextStyle } from 'react-native';

export interface ChartColors {
  grid: string;
  area: string;
  point: string;
  progress: {
    active: string;
    inactive: string;
  };
}

interface MD3Colors {
    primary: string;
    onPrimary: string;
    primaryContainer: string;
    onPrimaryContainer: string;
    secondary: string;
    onSecondary: string;
    background: string;
    surface: string;
    surfaceVariant: string;
    error: string;
    onError: string;
    errorContainer: string;
    onErrorContainer: string;
    outline: string;
    secondaryContainer: string;
    onSecondaryContainer: string;
    tertiary: string;
    onTertiary: string;
    tertiaryContainer: string;
    onTertiaryContainer: string;
    outlineVariant: string;
    shadow: string;
    scrim: string;
    inverseSurface: string;
    inverseOnSurface: string;
    inversePrimary: string;
    surfaceDisabled: string;
    onSurfaceDisabled: string;
    backdrop: string;
    onSurface: string;
    onSurfaceVariant: string;
    onBackground: string;
    elevation: {
      level0: string;
      level1: string;
      level2: string;
      level3: string;
      level4: string;
      level5: string;
    }
}


export interface AppTheme extends MD3Theme {
  version: 3;
  isV3: true;
  colors: MD3Colors;
  roundness: number;
  fonts: ReturnType<typeof configureFonts>;
  animation: { scale: number };
  dark: boolean;
  chartColors: ChartColors;
  moodColors: {
    peace: string;
    joy: string;
    love: string;
    reason: string;
    acceptance: string;
  };
  spacing: { // Add this back, since it's custom
    tiny: number;
    small: number;
    medium: number;
    large: number;
  };
  scaleFont: (size: number) => number;
  scaleSize: (size: number) => number;
}

export interface PlayerTheme {
  colors: {
    primary: string;
    onSurface: string;
    onSurfaceVariant: string;
    surfaceVariant: string;
    background: string;
  };
  fonts: {
    displayLarge: TextStyle;
    headlineMedium: TextStyle;
    titleMedium: TextStyle;
    bodyMedium: TextStyle;
  };
}
