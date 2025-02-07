import { StyleSheet } from 'react-native';
import type { FlexAlignType, TextStyle, ViewStyle } from 'react-native';
import { theme } from '../config/theme';

const styles = StyleSheet.create({
  // colors: theme.colors, // No need to include colors here
  layout_container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  } as ViewStyle,
  layout_content: {
    flex: 1,
    padding: 16,
  } as ViewStyle,
  layout_header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as FlexAlignType,
    padding: 16,
  } as ViewStyle,
  layout_footer: {
    padding: 16,
    alignItems: 'center' as FlexAlignType,
  } as ViewStyle,
  layout_row: {
    flexDirection: 'row' as const,
    alignItems: 'center' as FlexAlignType,
  } as ViewStyle,
  layout_scrollView: {
    flex: 1,
  } as ViewStyle,
  layout_form: {
    flex: 1,
    padding: 16,
  } as ViewStyle,
  text_heading1: {
    ...theme.fonts.displayLarge,
    fontWeight: 'bold' as const,
    color: theme.colors.onSurface,
    fontFamily: 'Kameron',
  } as TextStyle,
  text_heading2: {
    ...theme.fonts.displayMedium,
    fontWeight: 'bold' as const,
    color: theme.colors.onSurface,
    fontFamily: 'Kameron',
  } as TextStyle,
  text_heading3: {
     ...theme.fonts.displaySmall,
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
    borderRadius: 12,
    marginVertical: 8,
  } as ViewStyle,
  button_secondary: {
    borderColor: theme.colors.primary,
    borderRadius: 12,
    marginVertical: 8,
  } as ViewStyle,
  button_contained: {
    backgroundColor: theme.colors.primary,
  } as ViewStyle,
  button_outlined: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
  } as ViewStyle,
  button_icon: {
    padding: 8,
    borderRadius: 20,
  } as ViewStyle,
  component_card_elevated: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  } as ViewStyle,
  component_card_listItem: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  } as ViewStyle,
  component_card_selected: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
  } as ViewStyle,
  component_card_interactive: {} as ViewStyle,
  component_card_container: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.surface,
    marginVertical: 8,
  } as ViewStyle,
  component_card_content: {
    padding: 10,
  } as ViewStyle,
  component_form_input: {
    marginBottom: 16,
  } as ViewStyle,
  component_form_error: {
    color: theme.colors.error,
    ...theme.fonts.labelSmall,
    marginTop: 4,
  } as TextStyle,
  component_input_container: {
    marginBottom: 16,
  } as ViewStyle,
  component_input_outline: {
    borderWidth: 1,
    borderRadius: 8,
  } as ViewStyle,
  component_input_content: {
    paddingVertical: 8,
    ...theme.fonts.bodyLarge,
    fontFamily: 'Regular',
  } as TextStyle,
  component_input_label: {
     ...theme.fonts.labelLarge,
    fontFamily: 'Medium',
    marginBottom: 4,
  } as TextStyle,
  component_input_helper: {
    ...theme.fonts.labelSmall,
    fontFamily: 'Regular',
    marginTop: 4,
  } as TextStyle,
  component_input_error: {
    color: theme.colors.error,
  } as TextStyle,
  component_input_field: {
    padding: 8,
    borderWidth: 1,
    borderColor: theme.colors.outline,
    borderRadius: 4,
  } as ViewStyle,
  component_link: {
    color: theme.colors.primary,
    textDecorationLine: 'underline' as const,
  } as TextStyle,
  component_footer_container: {
    padding: 16,
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
    marginTop: 10,
  } as TextStyle,
  component_footer_link: {
    ...theme.fonts.bodyMedium,
    color: theme.colors.primary,
    textDecorationLine: 'underline' as const,
  } as TextStyle,
  component_recommendations_container: {
    padding: 16,
  } as ViewStyle,
  component_recommendations_card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: theme.colors.surface,
    marginVertical: 8,
  } as ViewStyle,
  component_recommendations_grid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between' as const,
    padding: 16,
  } as ViewStyle,
  component_recommendations_scrollView: {} as ViewStyle,
  component_iconButton_container: {
    padding: 8,
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
    padding: 16,
  } as ViewStyle,
  screen_auth_container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  } as ViewStyle,
  screen_auth_form: {
    flex: 1,
    padding: 24,
  } as ViewStyle,
  screen_auth_header: {
    marginBottom: 48,
  } as ViewStyle,
  screen_auth_footer: {
    padding: 24,
    alignItems: 'center' as FlexAlignType,
  } as ViewStyle,
  screen_auth_content: {
    flex: 1,
    padding: 16,
  } as ViewStyle,
  screen_profile_container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  } as ViewStyle,
  screen_profile_header: {
    padding: 16,
    alignItems: 'center' as FlexAlignType,
  } as ViewStyle,
  screen_profile_content: {
    padding: 16,
  } as ViewStyle,
  screen_home_container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  } as ViewStyle,
  screen_home_header: {
    marginBottom: 24,
  } as ViewStyle,
  screen_home_content: {
    padding: 16,
  } as ViewStyle,
  screen_mood_container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  } as ViewStyle,
  screen_mood_header: {
    marginBottom: 24,
  } as ViewStyle,
  screen_mood_content: {
    padding: 16,
  } as ViewStyle,
  screen_mood_grid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between' as const,
  } as ViewStyle,
  screen_legal_container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  } as ViewStyle,
    screen_legal_header: {
        marginBottom: 24,
    } as ViewStyle,
    screen_legal_content: {
        padding: 16,
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
      padding: 16
    } as ViewStyle,
    radarChart_labelsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 16
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
      padding: 16,
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
  mood_sliderContainer: {
    marginBottom: 16,
  } as ViewStyle,
  mood_sliderLabels: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    marginTop: 8,
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
      marginBottom: 24
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
    profile_section: {
      marginBottom: 24
    } as ViewStyle,
    profile_sectionSubtitle: {
      marginTop: 8,
       ...theme.fonts.bodyMedium
    } as TextStyle,
    profile_button: {
      marginTop: 16
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
    } as TextStyle
});

export default styles;
