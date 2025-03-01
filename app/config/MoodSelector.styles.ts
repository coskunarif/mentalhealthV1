// Updated styles with improved grid spacing, elevation, and new slider elements

import { StyleSheet } from 'react-native';
import { theme } from './theme';

export default StyleSheet.create({
  mood_gridContainer: {
    paddingHorizontal: theme.spacing.medium,
    paddingBottom: theme.spacing.large * 2, // Extra padding at bottom for fixed buttons
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
    // Light elevation for all mood items
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
    backgroundColor: theme.withOpacity(theme.colors.background, 0.95),
    borderTopWidth: 1,
    borderTopColor: theme.colors.outlineVariant,
    paddingTop: theme.spacing.medium,
    paddingBottom: theme.spacing.large,
  },
  modalBackdrop: {
    backgroundColor: theme.withOpacity(theme.colors.backdrop, 0.8),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.shape.borderRadius,
    width: '90%',
    maxHeight: '80%',
    padding: theme.spacing.large,
  },
});
