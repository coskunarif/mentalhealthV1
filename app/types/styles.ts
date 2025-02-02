import { TextStyle, ViewStyle, ImageStyle } from 'react-native';

export interface LayoutStyles {
  fill: ViewStyle;
  screen: ViewStyle;
  safeArea: ViewStyle;
  container: ViewStyle;
  contentContainer: ViewStyle;
  centerContent: ViewStyle;
  centerContentContainer: ViewStyle;
  row: ViewStyle;
  column: ViewStyle;
  card: ViewStyle;
  spaceBetween: ViewStyle;
  list: ViewStyle;
  listItem: ViewStyle;
  listItemContent: ViewStyle;
}

export interface ButtonStyles {
  button: ViewStyle;
  buttonContent: ViewStyle;
  buttonLabel: TextStyle;
  buttonIcon: ViewStyle;
  buttonPrimary: ViewStyle;
  buttonSecondary: ViewStyle;
  buttonLabelPrimary: TextStyle;
  buttonLabelSecondary: TextStyle;
  navigationButton: ViewStyle;
  navigationButtonLeft: ViewStyle;
  navigationButtonRight: ViewStyle;
  navigationButtonLabel: TextStyle;
  iconButton: ViewStyle;
}

export interface AuthStyles {
  authContainer: ViewStyle;
  authContent: ViewStyle;
  authHeader: ViewStyle;
  authTitle: TextStyle;
  authSubtitle: TextStyle;
  authForm: ViewStyle;
  authInput: ViewStyle;
  authActions: ViewStyle;
  authLink: TextStyle;
  authLogoContainer: ViewStyle;
  authLogo: ViewStyle;
  authLogoText: TextStyle;
  authAppTitle: TextStyle;
  authHeading: TextStyle;
  authSubheading: TextStyle;
  authFormContainer: ViewStyle;
  authFormFields: ViewStyle;
  authPrimaryButton: ViewStyle;
  authTextButton: ViewStyle;
  authSnackbar: ViewStyle;
  authErrorText: TextStyle;
  authAppIcon: ImageStyle;
}

export interface SurveyStyles {
  surveyScreen: ViewStyle;
  surveySafeArea: ViewStyle;
  progressSection: ViewStyle;
  progressText: TextStyle;
  progressBar: ViewStyle;
  progress: ViewStyle;
  contentSection: ViewStyle;
  questionSection: ViewStyle;
  questionText: TextStyle;
  optionsContainer: ViewStyle;
  optionButton: ViewStyle;
  optionButtonSelected: ViewStyle;
  optionText: TextStyle;
  optionTextSelected: TextStyle;
  navigationSection: ViewStyle;
}

export interface HomeStyles {
  homeContainer: ViewStyle;
  homeContent: ViewStyle;
  homeScreenHeader: TextStyle;
  exerciseCard: ViewStyle;
  progressCard: ViewStyle;
  radarChartContainer: ViewStyle;
  radarLabel: TextStyle;
  dayProgressContainer: ViewStyle;
  dayCircle: ViewStyle;
  nextSessionCard: ViewStyle;
  nextSessionContent: ViewStyle;
  actionButtonsContainer: ViewStyle;
  actionButtonWrapper: ViewStyle;
  actionButtonContent: ViewStyle;
  actionButtonText: TextStyle;
  recentActivitiesContainer: ViewStyle;
  recentActivityItem: ViewStyle;
  recentActivityTitle: TextStyle;
  recentActivitySubtitle: TextStyle;
  recentActivityDuration: TextStyle;
  statsGrid: ViewStyle;
  statCard: ViewStyle;
}

export interface ProfileStyles {
  profileContainer: ViewStyle;
  profileContent: ViewStyle;
  profileHeader: ViewStyle;
  profilePhoneNumber: TextStyle;
  profileName: TextStyle;
  profileStats: ViewStyle;
  profileStatItem: ViewStyle;
  profileStatValue: TextStyle;
  profileStatLabel: TextStyle;
  profileSettings: ViewStyle;
  profileSettingItem: ViewStyle;
  profileSettingContent: ViewStyle;
  profileSettingIcon: ViewStyle;
  profileSettingLabel: TextStyle;
}

export interface PlayerStyles {
  playerContainer: ViewStyle;
  playerControls: ViewStyle;
  playerProgress: ViewStyle;
  playerTime: TextStyle;
}

export interface GlobalTypography {
  text: TextStyle;
  textBold: TextStyle;
  heading1: TextStyle;
  heading2: TextStyle;
  heading3: TextStyle;
  bodyLarge: TextStyle;
  bodyMedium: TextStyle;
  bodySmall: TextStyle;
  labelLarge: TextStyle;
  labelMedium: TextStyle;
  titleLarge: TextStyle;
  titleMedium: TextStyle;
  headlineLarge: TextStyle;
  headlineMedium: TextStyle;
  headlineSmall: TextStyle;
  displaySmall: TextStyle;
}

export interface FormStyles {
  form: ViewStyle;
  formContainer: ViewStyle;
  input: ViewStyle;
  inputError: ViewStyle;
  errorText: TextStyle;
  searchInput: ViewStyle;
}

export interface GlobalStyles extends 
  GlobalTypography,
  LayoutStyles,
  ButtonStyles,
  AuthStyles,
  HomeStyles,
  ProfileStyles,
  SurveyStyles,
  FormStyles,
  PlayerStyles {}
