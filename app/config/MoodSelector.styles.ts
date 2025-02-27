import { StyleSheet } from 'react-native';
import { theme } from './theme';

export default StyleSheet.create({
  sliderCard: {
    padding: theme.spacing.small,
    marginVertical: theme.spacing.tiny / 4,
  },
  component_card_elevated: {
    elevation: 2,
  },
  mood_slider_card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.shape.borderRadius,
  },
  mood_headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.small,
  },
  mood_sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mood_gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  mood_item: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing.small,
  },
  mood_buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  mood_button: {
    borderRadius: theme.shape.borderRadius,
  },
  mood_buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'none',
  },
});
