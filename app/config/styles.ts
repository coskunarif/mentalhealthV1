// File: app\config\styles.ts
import { StyleSheet } from 'react-native';
import type { FlexAlignType, TextStyle, ViewStyle } from 'react-native';
import { theme } from '../config/theme';

const styles = StyleSheet.create({
  // ---------------------------
  // Layout & General Containers
  // ---------------------------
  layout_container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  } as ViewStyle,
  layout_content: {
    padding: theme.spacing.medium,
  } as ViewStyle,
  layout_scrollView: {
    // left flexible to allow content-based sizing or horizontal paging
  } as ViewStyle,

  // ---------------------------
  // Headings & Text
  // ---------------------------
  text_heading1: {
    ...theme.fonts.displayLarge,
    fontWeight: 'bold' as const,
    color: theme.colors.onSurface,
    fontFamily: 'Kameron',
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
    fontWeight: 'bold' as const,
    color: theme.colors.onSurface,
    fontFamily: 'Kameron',
  } as TextStyle,
  text_body: {
    ...theme.fonts.bodyLarge,
    color: theme.colors.onSurface,
  } as TextStyle,
  text_caption: {
    ...theme.fonts.labelMedium,
    color: theme.colors.onSurfaceVariant,
  } as TextStyle,
  text_subtitle: {
    ...theme.fonts.bodyMedium,
    color: theme.colors.onSurfaceVariant,
    marginBottom: theme.spacing.medium,
  } as TextStyle,
  text_link: {
    color: theme.colors.primary,
    textDecorationLine: 'underline' as const,
  } as TextStyle,
  text_button: {
    ...theme.fonts.bodyLarge,
    fontWeight: 'bold' as const,
    color: theme.colors.onSurface,
  } as TextStyle,

  // ---------------------------
  // Buttons
  // ---------------------------
  button_primary: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.shape.borderRadius,
    marginVertical: theme.spacing.small,
    contentStyle: { paddingVertical: theme.spacing.small },
    labelStyle: { ...theme.fonts.bodyMedium, fontWeight: 'bold' },
  } as ViewStyle,
  button_contained: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.shape.borderRadius,
  } as ViewStyle,
  button_outlined: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: 'transparent',
    borderRadius: theme.shape.borderRadius,
  } as ViewStyle,

  // ---------------------------
  // Auth-Specific (Sign-In, etc.)
  // ---------------------------
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
    alignItems: 'center' as FlexAlignType,
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
    alignItems: 'center' as FlexAlignType,
    marginTop: 16,
    marginBottom: 8,
  } as ViewStyle,
  signIn_subtitle: {
    marginTop: 8,
    color: theme.colors.onSurfaceVariant,
    ...theme.fonts.bodyMedium,
  } as TextStyle,

  // ---------------------------
  // Inputs & Form Elements
  // ---------------------------
  component_input_container: {
    marginBottom: theme.spacing.large,
  } as ViewStyle,
  component_input_label: {
    ...theme.fonts.labelLarge,
    color: theme.colors.onSurface,
    fontWeight: 'bold' as const,
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

  // ---------------------------
  // Surfaces & Cards
  // ---------------------------
  header_surface: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.medium - 4,
    elevation: theme.colors.elevation.level2,
    flexDirection: 'row' as const,
    alignItems: 'center' as FlexAlignType,
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

  // ---------------------------
  // Error Handling
  // ---------------------------
  errorBoundary_message: {
    marginTop: 8,
    marginBottom: 24,
  } as TextStyle,

  // ---------------------------
  // Home & Sections
  // ---------------------------
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

  // ---------------------------
  // Quick Activities / Recent
  // ---------------------------
  recentActivities_container: {
    marginBottom: 24,
  } as ViewStyle,
  recentActivities_surface: {
    padding: 0,
  } as ViewStyle,
  recentActivities_item: {
    padding: theme.spacing.medium,
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as FlexAlignType,
  } as ViewStyle,
  recentActivities_itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceVariant,
  } as ViewStyle,

  // ---------------------------
  // Not Found Screen
  // ---------------------------
  notFound_text: {
    marginTop: 16,
    ...theme.fonts.bodyMedium,
  } as TextStyle,
  notFound_button: {
    marginTop: 24,
  } as ViewStyle,

  // ---------------------------
  // Mood & Pyramid
  // ---------------------------
  mood_slider_card: {
    marginVertical: 1,
  } as ViewStyle,
  mood_headerRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as FlexAlignType,
    gap: 3,
    marginBottom: 2,
  } as ViewStyle,
  header_shadow: {
    fontSize: 20,
    color: theme.colors.onSurfaceVariant,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 16,
  } as TextStyle,
  mood_gridContainer: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between' as const,
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
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    paddingHorizontal: 1,
  } as ViewStyle,

  pyramid_container: {
    alignItems: 'center',
    marginVertical: theme.spacing.large,
    paddingHorizontal: theme.spacing.medium,
  } as ViewStyle,
  pyramid_item: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    alignSelf: 'center',
  } as ViewStyle,
  pyramid_bubbleContainer: {
    position: 'relative',
    minHeight: 200,
    width: '100%',
    marginTop: theme.spacing.large + theme.spacing.medium - 2,
    marginBottom: 100,
  } as ViewStyle,
  pyramid_bubble: {
    position: 'absolute',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  } as ViewStyle,
  pyramid_text: {
    ...theme.fonts.bodyLarge,
    color: theme.colors.onPrimary,
    fontWeight: 'bold',
    fontSize: 14,
  } as TextStyle,
  pyramid_bubbleText: {
    color: theme.colors.onPrimary,
    fontWeight: 'bold',
    textAlign: 'center',
  } as TextStyle,

  mood_buttonContainer: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.medium - 4,
    gap: 12,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 1000,
    elevation: 5,
  } as ViewStyle,
  mood_button: {
    flex: 1,
    borderRadius: 25,
    height: 45,
  } as ViewStyle,
  mood_buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 4,
    textTransform: 'none' as const,
  } as TextStyle,

  // ---------------------------
  // Profile
  // ---------------------------
  profile_header: {
    paddingVertical: theme.spacing.large,
    paddingHorizontal: theme.spacing.medium,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    marginBottom: theme.spacing.small,
  } as ViewStyle,
  profile_headerContent: {
    flexDirection: 'row' as const,
    alignItems: 'center' as FlexAlignType,
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
    flexDirection: 'row' as const,
    alignItems: 'center' as FlexAlignType,
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
    flexDirection: 'row' as const,
    justifyContent: 'space-around' as const,
    marginVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.medium,
  } as ViewStyle,
  profile_statItem: {
    alignItems: 'center' as FlexAlignType,
  } as ViewStyle,
  profile_statNumber: {
    ...theme.fonts.titleLarge,
    color: theme.colors.onSurface,
    fontWeight: 'bold',
  } as TextStyle,
  profile_statLabel: {
    ...theme.fonts.labelMedium,
    color: theme.colors.onSurfaceVariant,
    marginTop: 4,
  } as TextStyle,
  profile_signOutSection: {
    marginBottom: 24,
  } as ViewStyle,
  profile_signOutButton: {
    margin: theme.spacing.medium,
  } as ViewStyle,

  // ---------------------------
  // Legal-Related (restored)
  // ---------------------------
  screen_legal_header: {
    marginBottom: 24,
  } as ViewStyle,
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

export default styles;
