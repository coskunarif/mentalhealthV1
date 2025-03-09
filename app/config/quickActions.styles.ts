// Update QuickActions.styles.ts
import { StyleSheet } from 'react-native';
import { theme } from './theme';

export default StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  fabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6, // Material Design elevation for FABs
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    backgroundColor: theme.colors.primary,
  },
  labelContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  labelText: {
    fontSize: 12,
    fontWeight: '500',
    color: theme.colors.onSurface,
    textAlign: 'center',
  },
});
