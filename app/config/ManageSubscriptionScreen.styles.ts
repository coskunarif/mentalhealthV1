import { StyleSheet } from 'react-native';
import { lightTheme as theme } from './theme'; // Import lightTheme as theme

export default StyleSheet.create({
  container: {
    marginHorizontal: theme.spacing.medium,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing.medium,
  },
  sectionTitle: {
    ...theme.fonts.headlineSmall,
    color: theme.colors.onSurface,
    marginTop: theme.spacing.small,
    marginBottom: theme.spacing.small,
  },
  divider: {
    marginVertical: theme.spacing.small,
    backgroundColor: theme.colors.surfaceVariant,
    opacity: 0.7,
  },
  cancelButton: {
    marginTop: theme.spacing.small,
    marginHorizontal: theme.spacing.medium,
    borderRadius: theme.shape.borderRadius / 2,
  },
  selectButton: {
    alignSelf: 'center',
    marginRight: theme.spacing.small,
    borderRadius: theme.shape.borderRadius,
  },
  planTitle: { flex: 1 },
  planDescription: { flexShrink: 1 },
});
