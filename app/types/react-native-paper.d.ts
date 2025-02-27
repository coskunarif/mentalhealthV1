import 'react-native-paper';

declare module 'react-native-paper' {
  export interface MD3Theme {
    shape: {
      borderRadius: number;
    };
    // You can also merge any other custom properties if needed.
  }
}
