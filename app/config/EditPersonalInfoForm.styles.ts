import { StyleSheet } from 'react-native';
import { theme } from './theme';

export default StyleSheet.create({
  formContainer: {
    margin: theme.spacing.medium,
    padding: theme.spacing.medium,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  formSection: {
    marginBottom: theme.spacing.small,
  },
  formDivider: {
    marginVertical: theme.spacing.tiny,
    backgroundColor: theme.colors.surfaceVariant,
  },
  formSaveButton: {
    marginTop: theme.spacing.medium,
  },
  formFieldGroup: {
    marginBottom: theme.spacing.small,
  },
  formInput: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.small,
  },
});
