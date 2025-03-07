import { StyleSheet } from 'react-native';
import { theme } from './theme';
import typographyStyles from './typography.styles';

const customAppBarStyles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.surface,
  },
  title: {
    // Instead of using text_heading2 which is too large for an app bar
    ...typographyStyles.text_heading3, // Or create a specific app bar title style
    fontSize: 20, // More appropriate for app bar titles per Material Design
  },
});

export default customAppBarStyles;
