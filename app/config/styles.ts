import { StyleSheet, Platform } from 'react-native';
import { colors, withOpacity } from './colors';
import { typography } from './typography';
import { GlobalStyles } from '../types/styles';

const spacing = {
  xxs: 4,
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 40,
} as const;

const horizontalMargin = 16;

const touchableSize = {
  minWidth: 48,
  minHeight: 48,
  spacing: spacing.xs,
} as const;

export const globalStyles = StyleSheet.create<GlobalStyles>({
  // ============= Typography =============
  text: typography.bodyMedium,
  textBold: {
    ...typography.bodyMedium,
    fontWeight: 'bold',
  },
  heading1: typography.headlineLarge,
  heading2: typography.headlineMedium,
  heading3: typography.headlineSmall,
  bodyLarge: typography.bodyLarge,
  bodyMedium: typography.bodyMedium,
  bodySmall: typography.bodySmall,
  labelLarge: typography.labelLarge,
  labelMedium: typography.labelMedium,
  titleLarge: typography.titleLarge,
  titleMedium: typography.titleMedium,
  headlineLarge: typography.headlineLarge,
  headlineMedium: typography.headlineMedium,
  headlineSmall: typography.headlineSmall,
  displaySmall: typography.displaySmall,

  // ============= Layout =============
  screen: {
    flex: 1,
    backgroundColor: colors.primary50,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
  },
  contentContainer: {
    flex: 1,
    padding: spacing.md,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fill: {
    flex: 1,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: spacing.sm,
    padding: spacing.md,
    elevation: 2,
  },

  // ============= Cards =============
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  statCard: {
    backgroundColor: colors.surface,
    borderRadius: spacing.sm,
    padding: spacing.md,
    elevation: 2,
    flex: 1,
    minWidth: 150,
    aspectRatio: 1,
  },

  // ============= Forms & Inputs =============
  form: {
    gap: 16,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary200,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: 'Kameron',
    fontSize: 16,
  },
  searchInput: {
    backgroundColor: colors.surfaceVariant,
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 48,
  },

  // ============= Buttons =============
  button: {
    minHeight: touchableSize.minHeight,
    borderRadius: spacing.xs,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    minWidth: touchableSize.minWidth * 2.5,
  },
  buttonSecondary: {
    borderColor: colors.primary,
    backgroundColor: colors.surface,
    borderWidth: 1,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonLabel: {
    ...typography.labelLarge,
    textAlign: 'center',
  },
  buttonLabelPrimary: {
    ...typography.labelLarge,
    textAlign: 'center',
    color: colors.onPrimary,
  },
  buttonLabelSecondary: {
    ...typography.labelLarge,
    textAlign: 'center',
    color: colors.primary,
  },
  iconButton: {
    width: touchableSize.minWidth,
    height: touchableSize.minHeight,
    borderRadius: touchableSize.minWidth / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary100,
  },

  // ============= Lists =============
  list: {
    paddingHorizontal: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary100,
  },
  listItemContent: {
    flex: 1,
    marginLeft: 16,
  },

  // ============= Progress =============
  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: withOpacity(colors.primary, 0.08),
  },
  progressSection: {
    paddingTop: Platform.OS === 'ios' ? spacing.xl : spacing.lg,
    paddingHorizontal: horizontalMargin,
    paddingBottom: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: withOpacity(colors.primary, 0.08),
    minHeight: touchableSize.minHeight,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary900,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  progressText: {
    ...typography.titleLarge,
    color: colors.primary700,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  progress: {
    marginVertical: 8,
  },

  // ============= Survey Screen =============
  surveyScreen: {
    flex: 1,
    backgroundColor: colors.surfaceVariant,
  },
  surveySafeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  contentSection: {
    flex: 1,
    paddingHorizontal: horizontalMargin,
    paddingTop: spacing.sm,
    backgroundColor: colors.surfaceVariant,
  },
  questionSection: {
    marginBottom: spacing.md,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  questionText: {
    ...typography.titleLarge,
    color: colors.primary800,
    textAlign: 'left',
  },
  optionsContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    gap: touchableSize.spacing,
  },
  optionButton: {
    padding: spacing.sm,
    borderRadius: spacing.sm,
    backgroundColor: colors.surface,
    marginBottom: spacing.xs,
    width: '100%',
    minHeight: touchableSize.minHeight,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary900,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  optionButtonSelected: {
    backgroundColor: colors.primary50,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  optionText: {
    ...typography.bodyLarge,
    color: colors.onSurfaceVariant,
    textAlign: 'left',
    width: '100%',
  },
  optionTextSelected: {
    color: colors.primary800,
  },
  navigationSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.sm,
    paddingHorizontal: horizontalMargin,
    paddingBottom: Platform.OS === 'ios' ? spacing.md : spacing.sm,
    backgroundColor: colors.surface,
    borderTopLeftRadius: spacing.md,
    borderTopRightRadius: spacing.md,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
    gap: spacing.xs,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary900,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  navigationButton: {
    flex: 1,
    minWidth: touchableSize.minWidth * 2.25,
    maxWidth: 160,
    minHeight: touchableSize.minHeight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.xs,
  },
  navigationButtonLeft: {
    marginRight: spacing.xs,
  },
  navigationButtonRight: {
    marginLeft: spacing.xs,
  },
  navigationButtonLabel: {
    ...typography.labelLarge,
    textAlign: 'center',
    color: colors.onPrimary,
  },

  // ============= Auth Screens =============
  authContainer: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.md,
  },
  authContent: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.md,
  },
  authHeader: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  authTitle: {
    ...typography.headlineLarge,
    color: colors.onSurface,
    marginBottom: spacing.xs,
  },
  authSubtitle: {
    ...typography.bodyLarge,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  authForm: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    gap: spacing.md,
  },
  authInput: {
    backgroundColor: colors.surfaceVariant,
    borderRadius: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  authActions: {
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  authLink: {
    ...typography.labelLarge,
    color: colors.primary,
    textAlign: 'center',
  },
  authLogoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  authLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authLogoText: {
    ...typography.headlineLarge,
    color: colors.onPrimary,
  },
  authAppTitle: {
    ...typography.headlineMedium,
    color: colors.onSurface,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  authHeading: {
    ...typography.headlineLarge,
    color: colors.onSurface,
    marginBottom: spacing.sm,
  },
  authSubheading: {
    ...typography.bodyLarge,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  authFormContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  authFormFields: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  authPrimaryButton: {
    backgroundColor: colors.primary,
    borderRadius: spacing.xs,
    paddingVertical: spacing.sm,
  },
  authTextButton: {
    backgroundColor: 'transparent',
    paddingVertical: spacing.xs,
  },
  authSnackbar: {
    backgroundColor: colors.surfaceVariant,
    marginBottom: spacing.lg,
  },
  authErrorText: {
    ...typography.bodySmall,
    color: colors.error,
    marginTop: -spacing.xs,
    marginBottom: spacing.sm,
  },
  authAppIcon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },

  // ============= Screen-Specific Patterns =============
  // Player Screen
  playerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  playerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    marginVertical: 32,
  },

  // Home Screen
  homeContainer: {
    flex: 1,
    backgroundColor: colors.surfaceVariant,
  },
  homeContent: {
    padding: horizontalMargin,
    gap: spacing.lg,
  },
  homeScreenHeader: {
    ...typography.headlineSmall,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },

  // ============= Home Screen =============
  // Progress Visualization
  progressCard: {
    backgroundColor: colors.surface,
    borderRadius: spacing.lg,
    padding: spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary900,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  radarChartContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: spacing.lg,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.primary900,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  radarLabel: {
    ...typography.bodySmall,
    color: colors.onSurfaceVariant,
    position: 'absolute',
    textAlign: 'center',
  },
  // Day Progress
  dayProgressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xs,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary900,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  dayCircle: {
    width: touchableSize.minWidth * 0.833,
    height: touchableSize.minWidth * 0.833,
    borderRadius: touchableSize.minWidth * 0.417,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  // Next Session
  nextSessionCard: {
    borderRadius: spacing.xl,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary900,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  nextSessionContent: {
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // Action Buttons
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    height: 160,
  },
  actionButtonWrapper: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: spacing.lg,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.primary900,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  actionButtonContent: {
    padding: spacing.lg,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionButtonText: {
    ...typography.bodyLarge,
    color: colors.onSurface,
    textAlign: 'center',
    lineHeight: 24,
  },
  // Recent Activities
  recentActivitiesContainer: {
    gap: spacing.md,
  },
  recentActivityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.surface,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary900,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  recentActivityTitle: {
    ...typography.titleMedium,
    color: colors.onSurface,
  },
  recentActivitySubtitle: {
    ...typography.bodyMedium,
    color: colors.onSurfaceVariant,
  },
  recentActivityDuration: {
    ...typography.labelMedium,
    color: colors.primary,
  },

  // ============= Profile Screen =============
  profileContainer: {
    flex: 1,
    backgroundColor: colors.surfaceVariant,
  },
  profileContent: {
    padding: spacing.xl,
    gap: spacing.xl,
  },
  profileHeader: {
    alignItems: 'center',
    gap: spacing.md,
  },
  profilePhoneNumber: {
    ...typography.bodyLarge,
    color: colors.onSurfaceVariant,
    marginTop: spacing.xs,
  },
  profileName: {
    ...typography.headlineLarge,
    color: colors.onSurface,
    fontWeight: '600',
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
  },
  profileStatItem: {
    alignItems: 'center',
    gap: spacing.xxs,
  },
  profileStatValue: {
    ...typography.displaySmall,
    color: colors.primary,
    fontWeight: '600',
  },
  profileStatLabel: {
    ...typography.titleMedium,
    color: colors.onSurfaceVariant,
  },
  profileSettings: {
    gap: spacing.xs,
  },
  profileSettingItem: {
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceVariant,
  },
  profileSettingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  profileSettingIcon: {
    margin: 0,
  },
  profileSettingLabel: {
    ...typography.bodyLarge,
    flex: 1,
    marginLeft: spacing.xs,
    color: colors.onSurfaceVariant,
  },
  centerContentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
  },
  buttonIcon: {
    marginRight: spacing.xs,
  },

  // ============= Missing GlobalStyles Properties =============
  // These keys were required by the GlobalStyles interface.
  formContainer: {},
  inputError: {},
  errorText: {},
  playerProgress: {},
  playerTime: {},
});
