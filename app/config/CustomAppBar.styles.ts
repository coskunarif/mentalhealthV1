import { StyleSheet } from 'react-native';
import { theme } from './theme';
import typographyStyles from './typography.styles';

const customAppBarStyles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.surface,
    height: 64, // Standard Material Design app bar height
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
    marginTop: -4,
  }
});

export default customAppBarStyles;
