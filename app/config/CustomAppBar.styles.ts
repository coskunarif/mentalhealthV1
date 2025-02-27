import { StyleSheet } from 'react-native';
import { theme } from './theme';
import typographyStyles from './typography.styles';

const customAppBarStyles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.surface,
  },
  title: {
    ...typographyStyles.text_heading2,
  },
});

export default customAppBarStyles;
