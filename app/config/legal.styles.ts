import { StyleSheet } from 'react-native';
import { theme } from './theme';
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
