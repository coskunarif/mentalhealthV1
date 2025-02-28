import { StyleSheet } from 'react-native';
import { theme } from './theme';

export default StyleSheet.create({
  sliderCard: {
    padding: theme.spacing.small,
    marginVertical: theme.spacing.tiny / 4,
  },
  component_card_elevated: {
    elevation: 4, // Increased from 2
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
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
    paddingHorizontal: theme.spacing.tiny, // Aligns labels with slider track
  },
  mood_gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: theme.spacing.small, // Added for edge spacing
  },
  mood_item: {
    flexBasis: '30%',
    flexGrow: 1,
    maxWidth: '33%',
    aspectRatio: 1,
    padding: theme.scaleSize(16), // Scales with device
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing.tiny, // Added for spacing between items
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
