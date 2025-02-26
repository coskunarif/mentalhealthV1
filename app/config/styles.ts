import { StyleSheet } from 'react-native';
import type { FlexAlignType, TextStyle, ViewStyle } from 'react-native';
import { theme } from '../config/theme';
import colors from './colors';

const styles = StyleSheet.create({
  // colors: theme.colors, // No need to include colors here
  layout_container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  } as ViewStyle,
  layout_content: {
    padding: theme.spacing.medium,
  } as ViewStyle,
    header_surface: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.medium - 4,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  layout_header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as FlexAlignType,
    padding: theme.spacing.medium,
  } as ViewStyle,
  layout_footer: {
    padding: theme.spacing.medium,
    alignItems: 'center' as FlexAlignType,
  } as ViewStyle,
  layout_row: {
    flexDirection: 'row' as const,
    alignItems: 'center' as FlexAlignType,
    } as ViewStyle,
    layout_scrollView: {
        // flex: 1, // Removed flex: 1 to allow content-based sizing
    } as ViewStyle,
    layout_form: {
    flex: 1,
    padding: theme.spacing.medium,
  } as ViewStyle,
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
  text_label: {
    ...theme.fonts.labelLarge,
    color: theme.colors.onSurface,
    fontWeight: 'bold' as const,
  } as TextStyle,
  button_primary: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.shape.borderRadius,
    marginVertical: theme.spacing.small,
    contentStyle: { paddingVertical: theme.spacing.small },
    labelStyle: { ...theme.fonts.bodyMedium, fontWeight: 'bold' },
  } as ViewStyle,
  button_secondary: {
    borderColor: theme.colors.primary,
    borderRadius: theme.shape.borderRadius,
    marginVertical: theme.spacing.small,
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
  button_icon: {
    padding: theme.spacing.small,
    borderRadius: 20,
  } as ViewStyle,
  component_card_elevated: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.spacing.medium,
    padding: theme.spacing.medium,
    marginVertical: theme.spacing.small,
    elevation: 1,
  } as ViewStyle,
  component_card_listItem: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.spacing.medium,
    padding: theme.spacing.medium,
    marginVertical: theme.spacing.small,
    elevation: 1,
  } as ViewStyle,
  component_card_selected: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
  } as ViewStyle,
  component_card_interactive: {} as ViewStyle,
  component_card_container: {
    padding: theme.spacing.medium - 6,
    borderRadius: theme.spacing.tiny + 1,
    backgroundColor: theme.colors.surface,
    marginVertical: theme.spacing.small,
  } as ViewStyle,
  component_card_content: {
    padding: theme.spacing.medium - 6,
  } as ViewStyle,
  component_form_input: {
    marginBottom: theme.spacing.medium,
  } as ViewStyle,
  component_form_error: {
    color: theme.colors.error,
    ...theme.fonts.labelSmall,
    marginTop: theme.spacing.tiny,
  } as TextStyle,
  component_input_container: {
    marginBottom: theme.spacing.large,
  } as ViewStyle,
  component_input_outline: {
    borderWidth: 1,
    borderRadius: theme.spacing.medium - 4,
  } as ViewStyle,
  component_input_content: {
    paddingVertical: theme.spacing.medium - 4,
    ...theme.fonts.bodyLarge,
    fontFamily: 'Regular',
  } as TextStyle,
  component_input_label: {
    ...theme.fonts.labelLarge,
    fontFamily: 'Medium',
    marginBottom: theme.spacing.small,
    color: theme.colors.onSurface,
    fontWeight: 'bold',
  } as TextStyle,
  component_input_helper: {
    ...theme.fonts.labelSmall,
    fontFamily: 'Regular',
    marginTop: theme.spacing.tiny,
  } as TextStyle,
  component_input_error: {
    color: theme.colors.error,
    marginTop: theme.spacing.tiny,
    ...theme.fonts.labelMedium,
  } as TextStyle,
  component_input_field: {
    padding: theme.spacing.small, // Reduced padding for a compact look
    borderWidth: 1,
    borderColor: theme.colors.outline,
    borderRadius: theme.spacing.tiny, // A slightly smaller border radius
    backgroundColor: theme.colors.surface,
    fontSize: 14,
    marginBottom: theme.spacing.small,
  } as ViewStyle,
  component_link: {
    color: theme.colors.primary,
    textDecorationLine: 'underline' as const,
  } as TextStyle,
  component_footer_container: {
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.surface,
  } as ViewStyle,
  component_footer_content: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as FlexAlignType,
  } as ViewStyle,
  component_footer_copyright: {
    ...theme.fonts.labelMedium,
    color: theme.colors.onSurfaceVariant,
    marginTop: theme.spacing.medium - 6,
  } as TextStyle,
  component_footer_link: {
    ...theme.fonts.bodyMedium,
    color: theme.colors.primary,
    textDecorationLine: 'underline' as const,
  } as TextStyle,
  component_recommendations_container: {
    padding: theme.spacing.medium,
  } as ViewStyle,
  component_recommendations_card: {
    padding: theme.spacing.medium,
    borderRadius: theme.spacing.medium - 4,
    backgroundColor: theme.colors.surface,
    marginVertical: theme.spacing.small,
  } as ViewStyle,
  component_recommendations_grid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between' as const,
    padding: theme.spacing.medium,
  } as ViewStyle,
  component_recommendations_scrollView: {} as ViewStyle,
  component_iconButton_container: {
    padding: theme.spacing.small,
    borderRadius: 20,
  } as ViewStyle,
  component_iconButton_icon: {
    width: 24,
    height: 24,
  } as ViewStyle,
  component_progress_container: {
    height: 4,
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: 2,
  } as ViewStyle,
  component_progress_bar: {
    height: 4,
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
  } as ViewStyle,
  component_progress_grid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between' as const,
    padding: theme.spacing.medium,
  } as ViewStyle,
  common_screen_auth_container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  common_screen_auth_form: {
    width: '100%',
    maxWidth: 400,
    padding: theme.spacing.medium, // Reduced from 'large' to 'medium'
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
  signIn_screen_auth_container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
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
  welcome_screen_auth_container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
 welcome_screen_auth_form: {
    width: '100%',
    maxWidth: 400,
    padding: theme.spacing.large,
  } as ViewStyle,
 welcome_screen_auth_header: {
    marginBottom: theme.spacing.large + theme.spacing.small,
    alignItems: 'center',
  } as ViewStyle,
 welcome_screen_auth_footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  } as ViewStyle,
  screen_auth_content: {
    flex: 1,
    padding: theme.spacing.medium,
  } as ViewStyle,
  screen_profile_container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  } as ViewStyle,
  screen_profile_header: {
    padding: theme.spacing.medium,
    alignItems: 'center' as FlexAlignType,
  } as ViewStyle,
  screen_profile_content: {
    padding: theme.spacing.medium,
  } as ViewStyle,
  screen_home_container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  } as ViewStyle,
  screen_home_header: {
    marginBottom: 24,
  } as ViewStyle,
  screen_home_content: {
    padding: theme.spacing.medium,
  } as ViewStyle,
  screen_mood_container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  } as ViewStyle,
  screen_mood_header: {
    marginBottom: 24,
  } as ViewStyle,
  screen_mood_content: {
    padding: theme.spacing.medium,
  } as ViewStyle,
  screen_mood_grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: theme.spacing.medium,
  } as ViewStyle,
  screen_legal_container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  } as ViewStyle,
    screen_legal_header: {
        marginBottom: 24,
    } as ViewStyle,
    screen_legal_content: {
        padding: theme.spacing.medium,
    } as ViewStyle,
    welcome_subtitle: {
        marginTop: 8,
        color: theme.colors.onSurfaceVariant,
        ...theme.fonts.bodyMedium
    } as TextStyle,
    welcome_button: {
        marginBottom: 16,
    } as ViewStyle,
    welcome_buttonContent: {
        height: 48
    } as ViewStyle,
    signIn_subtitle: {
        marginTop: 8,
        color: theme.colors.onSurfaceVariant,
        ...theme.fonts.bodyMedium
    } as TextStyle,
    playerControls_container: {
        justifyContent: 'center',
        gap: 16
    } as ViewStyle,
    radarChart_container: {
      padding: theme.spacing.medium,
    } as ViewStyle,
    radarChart_labelsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: theme.spacing.medium,
    } as ViewStyle,
    radarChart_label: {
      width: '50%',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8
    } as ViewStyle,
    recentActivities_container: {
      marginBottom: 24
    } as ViewStyle,
    recentActivities_title: {
      marginBottom: 16
    } as TextStyle,
    recentActivities_surface: {
      padding: 0
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
    recommendedMeditations_title: {
      marginBottom: 16
    } as TextStyle,
    recommendedMeditations_duration: {
      marginTop: 4
    } as TextStyle,
    recommendedMeditations_category: {
      marginTop: 4
    } as TextStyle,
    seekableProgress_container: {
      flexDirection: 'row',
      alignItems: 'center'
    } as ViewStyle,
    seekableProgress_bar: {
      flex: 1,
      height: 4,
      marginHorizontal: 8,
      borderRadius: 2,
    } as ViewStyle,
    surveyOption: {
      marginVertical: 8,
      opacity: 1,
    } as ViewStyle,
    surveyOption_selected: {
      backgroundColor: theme.colors.primaryContainer,
      borderColor: theme.colors.primary,
      borderWidth: 2,
    } as ViewStyle,
    waveformVisualizer_container: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 40
    } as ViewStyle,
    waveformVisualizer_bar: {
      flex: 1,
      marginHorizontal: 2,
    } as ViewStyle,
    welcomeCarousel_item: {
      alignItems: 'center'
    } as ViewStyle,
    welcomeCarousel_description: {
      marginTop: 16,
      textAlign: 'center'
    } as TextStyle,
    welcomeCarousel_footer: {
      flexDirection: 'row',
      justifyContent: 'center'
    } as ViewStyle,
    welcomeCarousel_indicator: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 4
    } as ViewStyle,
    legal_heading: {
      marginBottom: 16
    } as TextStyle,
    legal_body: {
      marginBottom: 24
    } as TextStyle,
    legal_subheading: {
      marginBottom: 8
    } as TextStyle,
    mood_subtitle: {
      marginTop: 8
    } as TextStyle,
    mood_chartContainer: {
      marginTop: 24
    } as ViewStyle,
    mood_chartTitle: {
      marginBottom: 16
    } as TextStyle,
    mood_skipButton: {
      marginTop: 8
    } as ViewStyle,
    mood_card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.spacing.medium,
      padding: theme.spacing.medium,
      marginVertical: theme.spacing.small,
    },
    mood_sliderContainer: {
      marginBottom: theme.spacing.medium,
    } as ViewStyle,
  mood_sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 1,
  } as ViewStyle,
  player_headerSurface: {
    marginBottom: 24
  } as ViewStyle,
  player_contentSurface: {
    marginBottom: 24
  } as ViewStyle,
  player_duration: {
    marginTop: 4
  } as TextStyle,
  survey_title: {
    marginBottom: 24
  } as TextStyle,
  survey_footer: {
    gap: 16
  } as ViewStyle,
  home_progressChartContainer: {
    marginBottom: 32 // Increased marginBottom
  } as ViewStyle,
  home_exerciseProgressContainer: {
    marginBottom: 24
  } as ViewStyle,
  home_exerciseProgressTitle: {
    marginBottom: 16
  } as TextStyle,
  home_exerciseProgressGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  } as ViewStyle,
  home_exerciseProgressItem: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  home_startButton: {
    marginTop: 16
  } as ViewStyle,
  home_quickActionsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24
  } as ViewStyle,
  home_quickActionItem: {
    flex: 1
  } as ViewStyle,
  home_quickActionButton: {
    height: 80
  } as ViewStyle,
  profile_subtitle: {
    marginTop: 8,
    ...theme.fonts.bodyMedium
  } as TextStyle,
  profile_mainSection: {
    marginHorizontal: theme.spacing.medium,
    marginVertical: theme.spacing.small,
    borderRadius: 12,
    overflow: 'hidden',
  } as ViewStyle,
  profile_sectionContainer: {
    marginBottom: 24,
  } as ViewStyle,
  profile_actionButton: {
    marginTop: 16,
  } as ViewStyle,
  notFound_text: {
    marginTop: 16,
    ...theme.fonts.bodyMedium
  } as TextStyle,
  notFound_button: {
    marginTop: 24
  } as ViewStyle,
  breathExercise_container: {
    padding: 16
  } as ViewStyle,
  breathExercise_surface: {
    flex: 1
  } as ViewStyle,
  breathExercise_header: {
    alignItems: 'center',
    marginBottom: 24
  } as ViewStyle,
  breathExercise_timer: {
    marginTop: 16
  } as TextStyle,
  breathExercise_visualizer: {
    height: 120,
    marginBottom: 24
  } as ViewStyle,
  breathExercise_footer: {
    marginTop: 'auto'
  } as ViewStyle,
  breathExercise_instruction: {
    textAlign: 'center',
    marginBottom: 16
  } as TextStyle,
  errorBoundary_message: {
    marginTop: 8,
    marginBottom: 24,
  } as TextStyle,
  exerciseProgress_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.medium,
  } as ViewStyle,
  exerciseProgress_step: {
    alignItems: 'center',
    flex: 1,
  },
  exerciseProgress_circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  exerciseProgress_circleText: {
    ...theme.fonts.bodyMedium,
    fontWeight: 'bold',
  } as TextStyle,
  exerciseProgress_label: {
    ...theme.fonts.labelMedium,
    color: theme.colors.onSurfaceVariant,
    marginTop: 4,
  } as ViewStyle,
  exerciseProgress_bar: {
    height: 4,
    backgroundColor: theme.colors.surfaceVariant,
    flex: 1,
    marginHorizontal: -15,
  } as ViewStyle,
    player_container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.medium,
    } as ViewStyle,
    player_content: {
        width: '100%',
        alignItems: 'center',
    } as ViewStyle,
    player_title: {
        ...theme.fonts.displayMedium,
        color: theme.colors.secondary,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    } as TextStyle,
	player_subtitle: {
		...theme.fonts.headlineSmall,
		color: theme.colors.onSurfaceVariant,
		marginBottom: 4,
		textAlign: 'center'
	} as TextStyle,
    player_controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    } as ViewStyle,
    player_progress_container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: theme.spacing.large,
        marginBottom: theme.spacing.medium,
    } as ViewStyle,
    player_progress_bar_container: {
        flex: 1,
        height: 10,
        backgroundColor: theme.colors.surfaceVariant,
        marginHorizontal: theme.spacing.medium,
    } as ViewStyle,
    player_progress_bar: {
        height: 8,
        backgroundColor: theme.colors.secondary,
        borderRadius: 8,
    } as ViewStyle,
    player_time: {
        ...theme.fonts.bodyMedium,
        color: theme.colors.onSurfaceVariant
    } as TextStyle,
    player_button: {
        backgroundColor: theme.colors.primary,
        padding: 10,
        borderRadius: 25,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,
  mood_slider_card: {
    marginVertical: 1,
  } as ViewStyle,
  mood_headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.small,
    gap: 12,
  } as ViewStyle,
  mood_item: {
    width: '30%', // 3'lü grid için
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.outline,
    padding: 8,
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
  pyramid_itemSelected: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
  } as ViewStyle,
  pyramid_focusTitle: {
    marginTop: theme.spacing.large + theme.spacing.small,
    marginBottom: theme.spacing.medium,
  } as TextStyle,
  pyramid_bubbleText: {
    color: theme.colors.onPrimary,
    fontWeight: 'bold',
    textAlign: 'center',
  } as TextStyle,
  mood_buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    textTransform: 'none',
  } as TextStyle,
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
  profile_sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.medium,
  } as ViewStyle,
  profile_sectionTitle: {
    marginLeft: 8,
    color: theme.colors.onSurface,
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
    color: theme.colors.onSecondary,
    fontSize: 14,
    fontWeight: '500',
  } as TextStyle,
  profile_subscriptionDetails: {
    paddingHorizontal: theme.spacing.medium,
    paddingBottom: theme.spacing.medium,
    color: theme.colors.onSurfaceVariant,
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
  modal_container: {
    margin: theme.spacing.medium,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.medium,
    borderRadius: 12,
    maxHeight: '90%',
  } as ViewStyle,
});

export default styles;
