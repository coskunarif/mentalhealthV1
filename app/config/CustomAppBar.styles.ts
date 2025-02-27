import { StyleSheet } from 'react-native';
import { theme } from './theme';

export default StyleSheet.create({
  header: {
    backgroundColor: theme.colors.surface,
  },
  title: {
    ...theme.fonts.headlineMedium,
    color: theme.colors.onSurface,
    marginLeft: theme.spacing.small,
  },
});
