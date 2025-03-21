import 'react-native-paper';

declare module 'react-native-paper' {
  export interface MD3Theme {
    shape: {
      borderRadius: number;
    };
    // Merge any other custom properties if needed.
  }
}

export default {};
