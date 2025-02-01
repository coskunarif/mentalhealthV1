import { StyleSheet } from 'react-native';
import { typography } from './typography';
import { colors } from './colors';

export const globalStyles = StyleSheet.create({
  // Base text styles
  text: {
    fontFamily: 'Kameron',
  },
  textBold: {
    fontFamily: 'Kameron-Bold',
  },

  // Typography styles
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

  // Title styles
  titleLarge: {
    ...typography.titleLarge,
    color: colors.primary800,
  },
  titleMedium: {
    ...typography.titleMedium,
    color: colors.primary800,
  },
  titleSmall: {
    ...typography.titleSmall,
    color: colors.primary800,
  },

  // Body text styles
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

  // Label styles
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

  // Common UI Patterns
  container: {
    flex: 1,
    backgroundColor: colors.primary50,
  },
  safeArea: {
    flex: 1,
  },
  progressSection: {
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary200,
    backgroundColor: colors.primary100,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary200,
  },
  contentSection: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 24,
  },
  optionButton: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: colors.surface,
    borderColor: colors.primary200,
  },
  optionButtonSelected: {
    backgroundColor: colors.primary100,
    borderColor: colors.primary,
    elevation: 2,
  },
  navigationSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
    paddingBottom: 32,
  },
  button: {
    minWidth: 120,
  },
  buttonLabel: {
    fontFamily: 'Kameron',
    fontSize: 16,
  },
});
