import { StyleSheet } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { theme } from './theme';

const globalStyles = StyleSheet.create({
  layout_container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  } as ViewStyle,
  layout_content: {
    padding: theme.spacing.medium,
  } as ViewStyle,
  text_heading1: {
    ...theme.fonts.displayLarge,
    fontFamily: 'Kameron',
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.small,
  } as TextStyle,
  text_heading2: {
    ...theme.fonts.headlineMedium,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.small,
  } as TextStyle,
  text_body: {
    ...theme.fonts.bodyLarge,
    color: theme.colors.onSurface,
  } as TextStyle,
  button_primary: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.shape.borderRadius,
    marginVertical: theme.spacing.small,
  } as ViewStyle,
  text_subtitle: {
    ...theme.fonts.titleMedium,
    color: theme.colors.onSurface,
  } as TextStyle,
  text_heading3: {
    ...theme.fonts.headlineSmall,
    color: theme.colors.onSurface,
  } as TextStyle,
  button_outlined: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.outline,
    borderWidth: 1,
  } as ViewStyle,
  button_contained: {
    backgroundColor: theme.colors.primary,
  } as ViewStyle,
  text_caption: {
    ...theme.fonts.labelMedium,
    color: theme.colors.onSurfaceVariant,
  } as TextStyle,
});

export default globalStyles;
