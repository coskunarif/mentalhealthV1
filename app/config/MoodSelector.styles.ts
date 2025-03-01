import { StyleSheet } from 'react-native';
import { theme } from './theme';

export default StyleSheet.create({
  mood_gridContainer: {
    paddingHorizontal: theme.spacing.small,
  },
  mood_item: {
    flex: 1,
    margin: theme.spacing.small,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.colors.surface,
    position: 'relative',
    elevation: theme.colors.elevation.level0,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
    minWidth: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: theme.colors.onPrimary,
    fontSize: 10,
    fontWeight: 'bold',
  },
  mood_slider_card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.shape.borderRadius,
    marginVertical: theme.spacing.tiny,
    padding: theme.spacing.small,
  },
  component_card_elevated: {
    elevation: theme.colors.elevation.level2,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  mood_headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mood_sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.tiny,
  },
  mood_buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  mood_button: {
    borderRadius: theme.shape.borderRadius,
    marginHorizontal: theme.spacing.small,
  },
});
