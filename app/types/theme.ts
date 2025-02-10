import { MD3Theme } from 'react-native-paper';

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
}
