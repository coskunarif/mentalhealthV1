// File: app\config\EditPersonalInfoForm.styles.ts
import { StyleSheet } from 'react-native';
import { lightTheme as theme } from './theme'; // Import lightTheme as theme

export default StyleSheet.create({
  formContainer: {
    marginHorizontal: theme.spacing.medium,
    marginVertical: theme.spacing.small,
    padding: theme.spacing.medium,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.colors.surface,
  },
  formSection: {
    marginBottom: theme.spacing.medium,
  },
  formDivider: {
    marginVertical: theme.spacing.small,
  },
  formFieldGroup: {
    marginBottom: theme.spacing.small,
  },
  formInput: {
    backgroundColor: theme.colors.surface,
  },
  formSaveButton: {
    marginTop: theme.spacing.medium,
    borderRadius: theme.componentSizes.buttonBorderRadius, // Use consistent button radius
    elevation: 2, // Proper elevation for primary buttons
  },
});
