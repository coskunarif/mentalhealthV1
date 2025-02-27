import { StyleSheet } from 'react-native';
import { theme } from './theme';
import type { ViewStyle } from 'react-native';

// Consolidate contained and primary into one base style;
// if needed, the component can add extra margin.
const buttonStyles = StyleSheet.create({
  button_contained: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.shape.borderRadius,
  } as ViewStyle,
  // If a margin is needed, the component can wrap this style:
  button_primary: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.shape.borderRadius,
    marginVertical: theme.spacing.small,
  } as ViewStyle,
  button_outlined: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.outline,
    borderWidth: 1,
    borderRadius: theme.shape.borderRadius,
  } as ViewStyle,
});

export default buttonStyles;
