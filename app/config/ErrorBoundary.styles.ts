import { StyleSheet } from 'react-native';
import { lightTheme as theme } from './theme'; // Import lightTheme as theme

export default StyleSheet.create({
  errorMessage: {
    marginTop: theme.spacing.small,
    marginBottom: theme.spacing.large,
    color: theme.colors.error,
  },
});
