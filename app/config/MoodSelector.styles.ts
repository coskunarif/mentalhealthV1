// Updated styles with improved grid spacing, elevation, and new slider elements

import { StyleSheet } from 'react-native';
import { theme } from './theme';

export default StyleSheet.create({
  mood_gridContainer: {
    paddingHorizontal: theme.spacing.medium,
    paddingBottom: theme.spacing.large * 3, // Increased bottom padding for button container
    alignItems: 'stretch', // Ensure items stretch properly
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
    padding: theme.spacing.small,
    // Standardized elevation for all mood items
    elevation: theme.colors.elevation.level1,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
    zIndex: 1,
  },
  badgeText: {
    color: theme.colors.onPrimary,
    fontSize: 10,
    fontWeight: 'bold',
  },
  mood_slider_card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.shape.borderRadius,
    marginVertical: theme.spacing.small,
    padding: theme.spacing.medium,
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
  mood_sliderTicksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12, // Align with slider thumb edges
  },
  mood_sliderTick: {
    width: 1,
    height: 6,
    backgroundColor: theme.colors.outlineVariant,
  },
  mood_buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: theme.colors.background,
  paddingVertical: 16, // Material Design standard padding
  paddingHorizontal: 16, // Material Design standard padding
  // Material Design elevation overlay
  elevation: 8, // Higher elevation for more prominence
  shadowColor: theme.colors.shadow,
  shadowOffset: { width: 0, height: -1 },
  shadowOpacity: 0.14,
  shadowRadius: 4,
  zIndex: 5,
  // Material Design divider
  borderTopWidth: 1,
  borderTopColor: theme.colors.outlineVariant,
},
  modalBackdrop: {
    backgroundColor: theme.withOpacity(theme.colors.backdrop, 0.9), // Increased from 0.8 to 0.9
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.large,
    paddingTop: theme.spacing.large * 1.5, // Increased top padding (36 units)
    margin: theme.spacing.medium,
    marginTop: theme.spacing.large,
    borderRadius: theme.shape.borderRadius,
    elevation: theme.colors.elevation.level4,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    maxHeight: '75%',
  },
});
