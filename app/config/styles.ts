import { StyleSheet, Dimensions, Platform } from 'react-native';
import { typography } from './typography';
import { colors, withOpacity } from './colors';

const { width } = Dimensions.get('window');

export const globalStyles = StyleSheet.create({
  // ============= Typography =============
  text: {
    fontFamily: 'Kameron',
    color: colors.onSurfaceVariant,
  },
  textBold: {
    fontFamily: 'Kameron-Bold',
    color: colors.onSurfaceVariant,
  },

  // Display & Headings
  heading1: {
    ...typography.displayLarge,
    color: colors.primary800,
  },
  heading2: {
    ...typography.displayMedium,
    color: colors.primary800,
  },
  heading3: {
    ...typography.displaySmall,
    color: colors.primary800,
  },
  heading4: {
    ...typography.headlineLarge,
    color: colors.primary800,
  },
  heading5: {
    ...typography.headlineMedium,
    color: colors.primary800,
  },
  heading6: {
    ...typography.headlineSmall,
    color: colors.primary800,
  },

  // Body Text
  bodyLarge: {
    ...typography.bodyLarge,
    color: colors.onSurfaceVariant,
  },
  bodyMedium: {
    ...typography.bodyMedium,
    color: colors.onSurfaceVariant,
  },
  bodySmall: {
    ...typography.bodySmall,
    color: colors.onSurfaceVariant,
  },

  // Labels
  labelLarge: {
    ...typography.labelLarge,
    color: colors.primary800,
  },
  labelMedium: {
    ...typography.labelMedium,
    color: colors.primary800,
  },
  labelSmall: {
    ...typography.labelSmall,
    color: colors.primary800,
  },

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
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // ============= Cards =============
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
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
  statsCard: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: colors.primary100,
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
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 120,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonSecondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonLabel: {
    fontFamily: 'Kameron',
    fontSize: 16,
    textAlign: 'center',
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
    paddingTop: Platform.OS === 'ios' ? 54 : 32,
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: withOpacity(colors.primary, 0.08),
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
    fontSize: 20,
    lineHeight: 28,
    marginBottom: 12,
    color: colors.primary700,
    fontFamily: 'Kameron-Bold',
    textAlign: 'center',
  },
  progress: {
    marginVertical: 8,
  },

  // ============= Survey Screen =============
  contentSection: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: colors.surfaceVariant,
  },
  questionSection: {
    marginBottom: 24,
  },
  navigationSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
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
  optionButton: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: colors.surface,
    marginBottom: 8,
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
  navButton: {
    minWidth: 100,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },

  // ============= Screen-Specific Patterns =============
  // Auth Screens
  authContainer: {
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  authHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },

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
  homeHeader: {
    padding: 24,
    backgroundColor: colors.primary100,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    padding: 16,
  },
  statCard: {
    flex: 1,
    minWidth: width / 2 - 24,
    aspectRatio: 1,
    padding: 16,
    borderRadius: 16,
    backgroundColor: colors.surface,
  },
});
