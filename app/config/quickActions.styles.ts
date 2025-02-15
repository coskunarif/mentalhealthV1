// File: app/components/QuickActions.styles.ts
import { StyleSheet } from 'react-native';
import { theme } from '../config/theme';

const spacing = {
  xSmall: 4,
  small: 8,
  medium: 16,
};

const shape = {
  borderRadius: 8,
};

export default StyleSheet.create({
  surface: {
    marginBottom: spacing.medium,
    padding: spacing.medium,
    borderRadius: shape.borderRadius,
    elevation: 2, // Directly using a number for elevation
    backgroundColor: theme.colors.surface,
  },
  headerText: {
    marginBottom: spacing.small,
    color: theme.colors.onSurface,
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // allows wrap on smaller screens
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    flexBasis: '48%',
    marginVertical: spacing.xSmall,
    borderRadius: shape.borderRadius,
  },
  buttonLabel: {
    fontSize: 14, // example
    textTransform: 'none',
  },
});
