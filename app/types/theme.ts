import { MD3Theme } from 'react-native-paper';
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

export interface AppTheme extends MD3Theme {
  chartColors: ChartColors;
  spacing: {
    medium: number;
    small: number;
    tiny: number;
  };
  shape: {
    borderRadius: number;
  };
  elevation: {
    level2: string;
  };
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
