import { StyleSheet } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { theme } from './theme';

const globalStyles = StyleSheet.create({
  // Layout & Containers
  layout_container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  } as ViewStyle,
  layout_content: {
    padding: theme.spacing.medium,
  } as ViewStyle,
  layout_scrollView: {} as ViewStyle,

  // Text Styles
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
  text_heading3: {
    ...theme.fonts.headlineSmall,
    color: theme.colors.onSurface,
    fontFamily: 'Kameron',
  } as TextStyle,
  text_body: {
    ...theme.fonts.bodyLarge,
    color: theme.colors.onSurface,
  } as TextStyle,
  text_subtitle: {
    ...theme.fonts.titleMedium,
    color: theme.colors.onSurface,
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
    ...theme.fonts.bodyLarge,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
  } as TextStyle,

  // Button Styles
  button_primary: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.shape.borderRadius,
    marginVertical: theme.spacing.small,
  } as ViewStyle,
  button_contained: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.shape.borderRadius,
  } as ViewStyle,
  button_outlined: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.outline,
    borderWidth: 1,
    borderRadius: theme.shape.borderRadius,
  } as ViewStyle,

  // Card & Surface
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

  // Auth Screens
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
  signIn_subtitle: {
    marginTop: 8,
    color: theme.colors.onSurfaceVariant,
    ...theme.fonts.bodyMedium,
  } as TextStyle,

  // Inputs & Forms
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

  // Home & Sections
  screen_home_container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  } as ViewStyle,
  home_sectionSurface: {
    marginBottom: theme.spacing.medium,
    padding: theme.spacing.medium,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: theme.colors.surface,
  } as ViewStyle,
  home_sectionTitle: {
    marginBottom: 12,
    color: theme.colors.onSurface,
    ...theme.fonts.headlineMedium,
  } as TextStyle,

  // Recent Activities
  recentActivities_container: {
    marginBottom: 24,
  } as ViewStyle,
  recentActivities_surface: {
    padding: 0,
  } as ViewStyle,
  recentActivities_item: {
    padding: theme.spacing.medium,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as ViewStyle,
  recentActivities_itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceVariant,
  } as ViewStyle,

  // Not Found Screen
  notFound_text: {
    marginTop: 16,
    ...theme.fonts.bodyMedium,
  } as TextStyle,
  notFound_button: {
    marginTop: 24,
  } as ViewStyle,

  // Mood & Pyramid
  header_shadow: {
    fontSize: 20,
    color: theme.colors.onSurfaceVariant,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 16,
  } as TextStyle,
  mood_gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.small,
    gap: 12,
  } as ViewStyle,
  mood_item: {
    width: '30%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.outline,
    padding: 8,
  } as ViewStyle,
  mood_sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 1,
  } as ViewStyle,
  // Legal screens
  screen_legal_header: {
    marginBottom: 24,
  } as ViewStyle,

  // Profile
  profile_header: {
    paddingVertical: theme.spacing.large,
    paddingHorizontal: theme.spacing.medium,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    marginBottom: theme.spacing.small,
  } as ViewStyle,
  profile_headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  profile_headerText: {
    marginLeft: theme.spacing.medium,
    flex: 1,
  } as ViewStyle,
  profile_name: {
    color: theme.colors.onSurface,
  } as TextStyle,
  profile_email: {
    color: theme.colors.onSurfaceVariant,
  } as TextStyle,
  profile_mainSection: {
    marginHorizontal: theme.spacing.medium,
    marginVertical: theme.spacing.small,
    borderRadius: 12,
    overflow: 'hidden',
  } as ViewStyle,
  profile_sectionTitle: {
    marginLeft: theme.spacing.medium,
    marginTop: theme.spacing.small,
    marginBottom: theme.spacing.small,
    color: theme.colors.onSurface,
    ...theme.fonts.headlineSmall,
  } as TextStyle,
  profile_subscriptionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.medium,
    paddingBottom: theme.spacing.small,
  } as ViewStyle,
  profile_statusLabel: {
    color: theme.colors.onSurfaceVariant,
  } as TextStyle,
  profile_statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  } as ViewStyle,
  profile_statusText: {
    fontSize: 14,
    fontWeight: '500',
  } as TextStyle,
  profile_statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.medium,
  } as ViewStyle,
  profile_statItem: {
    alignItems: 'center',
  } as ViewStyle,

  // Legal-Related
  legal_heading: {
    marginBottom: 16,
  } as TextStyle,
  legal_body: {
    marginBottom: 24,
  } as TextStyle,
  legal_subheading: {
    marginBottom: 8,
  } as TextStyle,
});

export default globalStyles;
