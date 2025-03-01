// Enhanced button styling with improved elevation and transitions

import { StyleSheet } from 'react-native';
import { theme } from './theme';
import type { ViewStyle } from 'react-native';

const buttonStyles = StyleSheet.create({
  button_contained: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.shape.borderRadius,
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
  } as ViewStyle,
});

export default buttonStyles;
