import { StyleSheet } from 'react-native';
import { theme } from './theme';

const customAppBarStyles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.small,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: theme.spacing.tiny,
  },
  title: {
    ...theme.fonts.titleMedium,
    fontSize: 20,
    color: theme.colors.onSurface,
    fontWeight: '500',
  },
  subtitle: {
    ...theme.fonts.bodyMedium,
    color: theme.colors.onSurfaceVariant,
    marginTop: 2, // Changed from -4 to 2 for better spacing
  }
});

export default customAppBarStyles;
