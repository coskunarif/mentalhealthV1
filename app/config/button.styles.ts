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
    // Slight shadow for contained button
    elevation: theme.colors.elevation.level1, // <-- changed here
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  } as ViewStyle,
  button_outlined: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.outline,
    borderWidth: 1,
    borderRadius: theme.shape.borderRadius,
    marginVertical: theme.spacing.small,
  } as ViewStyle,
});

export default buttonStyles;
