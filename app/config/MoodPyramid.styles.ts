import { StyleSheet } from 'react-native';
import { theme } from './theme';

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
    marginTop: theme.spacing.medium,
  },
  pyramid_item: {
    padding: theme.spacing.small,
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing.tiny,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pyramid_text: {
    color: theme.colors.onPrimary,
    fontWeight: 'bold',
  },
  pyramid_bubbleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: theme.spacing.medium,
  },
  pyramid_bubble: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pyramid_bubbleText: {
    fontWeight: 'bold',
    color: theme.colors.onSurface,
  },
  mood_buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: theme.spacing.medium,
  },
  mood_button: {
    borderRadius: theme.shape.borderRadius,
  },
  mood_buttonText: {
    fontWeight: 'bold',
  },
});
