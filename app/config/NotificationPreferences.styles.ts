import { StyleSheet } from 'react-native';
import { lightTheme as theme } from './theme'; // Import lightTheme as theme

export default StyleSheet.create({
  container: {
    margin: theme.spacing.medium,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.shape.borderRadius,
  },
  itemTitle: {
    ...theme.fonts.bodyLarge,
    color: theme.colors.onSurface,
  },
  itemDescription: {
    ...theme.fonts.bodyMedium,
    color: theme.colors.onSurfaceVariant,
  },
  listItem: {
    paddingVertical: theme.spacing.small,
  },
  divider: {
    backgroundColor: theme.colors.surfaceVariant,
  },
});
