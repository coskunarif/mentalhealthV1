import { StyleSheet } from 'react-native';
import { lightTheme as theme } from './theme'; // Import lightTheme as theme
import type { ViewStyle } from 'react-native';

const cardStyles = StyleSheet.create({
  header_surface: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.medium - 4,
    elevation: theme.colors.elevation?.level2 || 2,
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  component_card_elevated: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.spacing.medium,
    padding: theme.spacing.medium,
    marginVertical: theme.spacing.small,
    elevation: 1,
  } as ViewStyle,
  component_card_container: {
    padding: theme.spacing.medium - 6,
    borderRadius: theme.spacing.tiny + 1,
    backgroundColor: theme.colors.surface,
    marginVertical: theme.spacing.small,
  } as ViewStyle,
});

export default cardStyles;
