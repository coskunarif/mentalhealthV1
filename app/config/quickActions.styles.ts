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
    borderRadius: 12,
    elevation: 1,
  },
  cardContent: {
    alignItems: 'center',
    padding: 16,
  },
  icon: {
    marginBottom: 8,
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.onSurface,
    letterSpacing: 0.1,
  },
});
