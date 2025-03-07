// Updated styles with improved grid spacing, elevation, and new slider elements

import { StyleSheet } from 'react-native';
import { theme } from './theme';
import { ViewStyle } from 'react-native';

export default StyleSheet.create({
  button_contained: {
    backgroundColor: theme.colors.primary,
    borderRadius: 20, // Material Design M3 filled button radius
    // Remove inner shadow - not part of Material Design
  } as ViewStyle,

  button_primary: {
    backgroundColor: theme.colors.primary,
    borderRadius: 20, // Material Design M3 filled button radius
    marginVertical: theme.spacing.small,
    height: 40, // Material Design button height
    justifyContent: 'center',
    alignItems: 'center',
    // Material Design elevation
    elevation: 2,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    // Material Design state layer
    position: 'relative',
    overflow: 'hidden',
  } as ViewStyle,

  button_outlined: {
    backgroundColor: 'transparent', // Outlined buttons have transparent bg in Material Design
    borderColor: theme.colors.primary,
    borderWidth: 1, // Standard border width
    borderRadius: 20, // Material Design M3 outlined button radius
    marginVertical: theme.spacing.small,
    height: 40, // Material Design button height
    justifyContent: 'center',
    alignItems: 'center',
    // Remove elevation from outlined buttons per Material Design
    elevation: 0,
    shadowOpacity: 0,
  } as ViewStyle,
});
