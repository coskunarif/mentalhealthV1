import { StyleSheet } from 'react-native';
import { theme } from './theme';

export default StyleSheet.create({
  container: {
    marginHorizontal: theme.spacing.medium,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.shape.borderRadius,
    elevation: 1,
  },
  subheader: {
    ...theme.fonts.titleMedium,
    color: theme.colors.primary,
    paddingTop: theme.spacing.small,
  },
  accordion: {
    backgroundColor: 'transparent',
    paddingHorizontal: theme.spacing.small,
  },
  accordionTitle: {
    ...theme.fonts.bodyLarge,
    color: theme.colors.onSurface,
    fontWeight: '500',
  },
  answerText: {
    ...theme.fonts.bodyMedium,
    color: theme.colors.onSurfaceVariant,
    padding: theme.spacing.small,
    paddingTop: 0,
    lineHeight: theme.fonts.bodyMedium.lineHeight * 0.9,
  },
  contactTitle: {
    ...theme.fonts.bodyLarge,
    color: theme.colors.onSurface,
  },
  contactDescription: {
    ...theme.fonts.bodyMedium,
    color: theme.colors.primary,
  },
  divider: {
    backgroundColor: theme.colors.surfaceVariant,
  },
  sectionDivider: {
    backgroundColor: theme.colors.surfaceVariant,
    marginVertical: theme.spacing.medium,
  },
  chatButton: {
    margin: theme.spacing.medium,
  },
});
