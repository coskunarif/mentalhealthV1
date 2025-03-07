import { StyleSheet } from 'react-native';
import { theme } from './theme';

export default StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 16,
    color: theme.colors.onSurface,
    paddingHorizontal: 16,
    letterSpacing: 0.15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 8,
  },
  card: {
    flex: 1,
    minWidth: 140,
    maxWidth: '45%',
    margin: 8,
    borderRadius: theme.componentSizes.cardBorderRadius,
    // Proper Material elevation
    elevation: theme.colors.elevation.level1,
    backgroundColor: theme.colors.surface,
  },
  cardContent: {
    alignItems: 'center',
    padding: 16,
    gap: 12, // Create proper spacing between icon and text
  },
  icon: {
    marginBottom: 4, // Reduced from 8
    color: theme.colors.primary, // Use theme color instead of hardcoded
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.onSurface,
    letterSpacing: 0.1,
  },
});
