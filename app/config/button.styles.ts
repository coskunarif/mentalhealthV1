// Updated styles with improved grid spacing, elevation, and new slider elements

import { StyleSheet } from 'react-native';
import { theme } from './theme';
import { ViewStyle } from 'react-native';

export default StyleSheet.create({
  button_contained: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.shape.borderRadius,
    // Add subtle inner shadow for depth
    borderBottomWidth: 1,
    borderBottomColor: theme.withOpacity(theme.colors.shadow, 0.2),
  } as ViewStyle,

  button_primary: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.shape.borderRadius,
    marginVertical: theme.spacing.small,
    height: 48, // Fixed height for consistency
    justifyContent: 'center',
    alignItems: 'center',
    // Enhanced elevation for better visual hierarchy
    elevation: theme.colors.elevation.level2,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // Add tap state styling
    position: 'relative',
    overflow: 'hidden', // Ensure ripple stays within bounds
  } as ViewStyle,

  button_outlined: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.primary,
    borderWidth: 1.5, // Slightly thicker border for better visibility
    borderRadius: theme.shape.borderRadius,
    marginVertical: theme.spacing.small,
    height: 48, // Fixed height for consistency
    justifyContent: 'center',
    alignItems: 'center',
    // Add subtle elevation for depth
    elevation: 1,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  } as ViewStyle,
});
