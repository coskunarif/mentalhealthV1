import { StyleSheet } from 'react-native';
import { theme } from './theme';
import type { ViewStyle } from 'react-native';

const layoutStyles = StyleSheet.create({
  layout_container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  } as ViewStyle,
  layout_content: {
    padding: theme.spacing.medium,
  } as ViewStyle,
  layout_scrollView: {} as ViewStyle,
  // Auth / Common screens
  common_screen_auth_container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  common_screen_auth_form: {
    width: '100%',
    maxWidth: 400,
    padding: theme.spacing.medium,
  } as ViewStyle,
  common_screen_auth_header: {
    marginBottom: theme.spacing.large + theme.spacing.small,
    alignItems: 'center',
  } as ViewStyle,
  common_screen_auth_footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  } as ViewStyle,
  signIn_screen_auth_form: {
    width: '100%',
    maxWidth: 400,
    padding: theme.spacing.large,
  } as ViewStyle,
  signIn_screen_auth_header: {
    marginBottom: theme.spacing.large + theme.spacing.small,
    alignItems: 'center',
  } as ViewStyle,
  signIn_screen_auth_footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  } as ViewStyle,
});

export default layoutStyles;
