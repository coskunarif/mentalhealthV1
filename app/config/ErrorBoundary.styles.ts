import { StyleSheet } from 'react-native';
import { theme } from './theme';

export default StyleSheet.create({
  errorMessage: {
    marginTop: theme.spacing.small,
    marginBottom: theme.spacing.large,
    color: theme.colors.error,
  },
});
