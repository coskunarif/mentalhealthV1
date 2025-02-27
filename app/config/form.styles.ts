import { StyleSheet } from 'react-native';
import { theme } from './theme';
import type { ViewStyle, TextStyle } from 'react-native';

const formStyles = StyleSheet.create({
  component_input_container: {
    marginBottom: theme.spacing.large,
  } as ViewStyle,
  component_input_label: {
    ...theme.fonts.labelLarge,
    color: theme.colors.onSurface,
    fontWeight: 'bold',
    marginBottom: theme.spacing.small,
  } as TextStyle,
  component_input_field: {
    padding: theme.spacing.small,
    borderWidth: 1,
    borderColor: theme.colors.outline,
    borderRadius: theme.spacing.tiny,
    backgroundColor: theme.colors.surface,
    fontSize: 14,
    marginBottom: theme.spacing.small,
  } as ViewStyle,
  component_input_error: {
    color: theme.colors.error,
    marginTop: theme.spacing.tiny,
    ...theme.fonts.labelMedium,
  } as TextStyle,
});

export default formStyles;
