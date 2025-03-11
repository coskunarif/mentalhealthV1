import { StyleSheet, Platform } from 'react-native';
import { theme } from './theme';

const customAppBarStyles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.surface,
    height: Platform.OS === 'ios' ? 56 : 60, // More compact height
    paddingHorizontal: 4, // Reduced horizontal padding
    justifyContent: 'center', // Ensure vertical centering
  },
  backButton: {
    marginLeft: 4, // Adjust to be closer
    marginRight: 4, // Reduce space between arrow and title
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 8, // Reduced from previous value
    height: '100%', // Ensure full height for centering
  },
  title: {
    ...theme.fonts.titleMedium,
    fontSize: 18, // Slightly smaller for better proportion
    color: theme.colors.onSurface,
    fontWeight: '500',
    letterSpacing: 0.15,
  },
  subtitle: {
    ...theme.fonts.bodyMedium,
    fontSize: 14, // Proper subtitle size
    color: theme.colors.onSurfaceVariant,
    marginTop: 2, // Closer to the title
    letterSpacing: 0.25,
  }
});

export default customAppBarStyles;
