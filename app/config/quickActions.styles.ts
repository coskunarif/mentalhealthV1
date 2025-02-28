import { StyleSheet } from 'react-native';
import { theme } from './theme';

export default StyleSheet.create({
  container: {
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing.medium,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.small,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    flexBasis: '48%',
    marginBottom: theme.spacing.small,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.shape.borderRadius,
    // Material-like elevation/shadow
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardContent: {
    padding: theme.spacing.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginBottom: theme.spacing.tiny,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    textAlign: 'center',
  },
});
