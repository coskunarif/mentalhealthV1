import { StyleSheet } from 'react-native';
import { lightTheme as theme } from './theme'; // Import lightTheme as theme
import typographyStyles from './typography.styles';

export default StyleSheet.create({
  legal_heading: {
    ...typographyStyles.text_heading2,
    marginBottom: theme.spacing.small,
  },
  legal_body: {
    ...typographyStyles.text_body,
    marginBottom: theme.spacing.medium,
  },
  legal_subheading: {
    ...typographyStyles.text_heading3,
    marginBottom: theme.spacing.small,
  },
});
