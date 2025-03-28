import { StyleSheet } from 'react-native';
import { lightTheme as theme } from './theme'; // Import lightTheme as theme
import typographyStyles from './typography.styles';

export default StyleSheet.create({
  tooltip: {
    textAlign: 'center',
    marginTop: theme.spacing.small,
    color: theme.colors.onSurfaceVariant,
  },
  layout_scrollView: {
    flex: 1,
  },
  header_shadow: {
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  pyramid_container: {
    alignItems: 'center',
    gap: 3,
  },
  pyramid_item: {
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
    borderRadius: theme.shape.borderRadius,
  },
  pyramid_text: {
    color: theme.colors.onPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
  pyramid_bubbleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: theme.spacing.medium,
  },
  pyramid_bubble: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: theme.colors.outline,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  pyramid_bubbleText: {
    fontWeight: 'bold',
    color: theme.colors.onSurface,
  },
  mood_buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Changed from 'space-around'
    padding: theme.spacing.medium,
  },
  mood_button: {
    borderRadius: theme.shape.borderRadius,
  },
  mood_buttonText: {
    fontWeight: 'bold',
  },
});
