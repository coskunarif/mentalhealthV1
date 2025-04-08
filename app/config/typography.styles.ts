import { StyleSheet } from 'react-native';
import { lightTheme as theme } from './theme'; // Import lightTheme as theme
import type { TextStyle } from 'react-native';

const typographyStyles = StyleSheet.create({
  text_heading1: {
    ...theme.fonts.displayLarge,
    fontFamily: 'Nunito', // Changed from Kameron
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.small,
  } as TextStyle,
  text_heading2: {
    ...theme.fonts.headlineMedium,
    fontFamily: 'Nunito', // Changed from Kameron
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.small,
  } as TextStyle,
  text_heading3: {
    ...theme.fonts.headlineSmall,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    fontFamily: 'Nunito', // Changed from Kameron
  } as TextStyle,
  text_body: {
    ...theme.fonts.bodyLarge,
    color: theme.colors.onSurface,
  } as TextStyle,
  text_subtitle: {
    ...theme.fonts.bodyMedium,
    color: theme.colors.onSurfaceVariant,
    marginBottom: theme.spacing.medium,
  } as TextStyle,
  text_caption: {
    ...theme.fonts.labelMedium,
    color: theme.colors.onSurfaceVariant,
  } as TextStyle,
  text_link: {
    color: theme.colors.primary,
    textDecorationLine: 'underline',
  } as TextStyle,
text_button: {
  fontFamily: 'Nunito',
  fontSize: 14,
  fontWeight: '500',
  letterSpacing: 0.1,
  textTransform: 'uppercase', // Material Design button standard
  lineHeight: 20,
} as TextStyle,
  header_shadow: {
    fontSize: 20,
    color: theme.colors.onSurfaceVariant,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 16,
  } as TextStyle,
});

export default typographyStyles;
