import { MD3Theme } from 'react-native-paper';

declare global {
  namespace ReactNativePaper {
    interface Theme extends MD3Theme {
      colors: MD3Theme['colors'] & {
        surface: string;
        onSurface: string;
        onSurfaceVariant: string;
        primary: string;
        onPrimary: string;
        background: string;
      };
    }
  }
}