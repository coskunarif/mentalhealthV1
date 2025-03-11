import { StyleSheet } from 'react-native';
import { theme } from './theme';

export default StyleSheet.create({
  header: {
    height: 56, // Material Design standard
    minHeight: 56,
    paddingHorizontal: 0, // Use default padding
  },
  backButton: {
    marginLeft: 0, // Default 16dp margin from Appbar.BackAction
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: theme.colors.onSurface,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    marginTop: 2,
  },
});
