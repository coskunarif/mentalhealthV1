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
    level0: any;
    level1: any;
    level2: any;
    level3: any;
    level4: any;
    level5: any;
  };
    status: {
      success: string;
      warning: string;
      error: string;
      info: string;
    };
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
    shame: string;
    guilt: string;
    apathy: string;
    grief: string;
    fear: string;
    desire: string;
    anger: string;
    pride: string;
    willfulness: string;
    humiliation: string;
    regret: string;
    anxiety: string;
    hate: string;
    aggression: string;
  };
  spacing: {
    tiny: number;
    small: number;
    medium: number;
    large: number;
  };
    componentSizes: {
    buttonHeight: number;
    buttonMinWidth: number;
    iconSize: number;
    touchableMinHeight: number;
    cardBorderRadius: number;
    buttonBorderRadius: number;
  };
  scaleFont: (size: number) => number;
  scaleSize: (size: number) => number;
  withOpacity: (color: string, opacity: number) => string;
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
