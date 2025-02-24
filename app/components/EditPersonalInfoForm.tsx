// File: app/components/EditPersonalInfoForm.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, TextInput, HelperText, Button, Divider } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import type { PersonalInformation } from '../types/personalInformation';
import { theme } from '../config/theme';
import globalStyles from '../config/styles';

interface EditPersonalInfoFormProps {
  info: PersonalInformation;
  onSave: (info: PersonalInformation) => Promise<void>;
}

export const EditPersonalInfoForm: React.FC<EditPersonalInfoFormProps> = ({ info, onSave }) => {
  const [formData, setFormData] = useState<PersonalInformation>(info);
  const [errors, setErrors] = useState<Partial<Record<keyof PersonalInformation, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  // Validate individual fields
  const validateField = (field: keyof PersonalInformation, value: string | undefined): string => {
    if (!value) {
      return field === 'name' ? 'Name is required' : '';
    }
    switch (field) {
      case 'name':
        return value.trim().length < 2 ? 'Name must be at least 2 characters' : '';
      case 'phoneNumber':
        return value && !/^\+?[\d\s-]{10,}$/.test(value) ? 'Please enter a valid phone number' : '';
      default:
        return '';
    }
  };

  const handleChange = (field: keyof PersonalInformation, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleConfirmDate = (date: Date) => {
    const formattedDate = date.toISOString().split('T')[0];
    handleChange('dateOfBirth', formattedDate);
    setDatePickerVisible(false);
  };

  const handleSubmit = async () => {
    // Validate all fields
    const newErrors: Partial<Record<keyof PersonalInformation, string>> = {};
    (Object.keys(formData) as Array<keyof PersonalInformation>).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      await onSave(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      margin: theme.spacing.medium,
      padding: theme.spacing.medium,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.colors.surface,
      // iOS shadow:
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    section: {
      marginBottom: theme.spacing.medium,
    },
    divider: {
      marginVertical: theme.spacing.medium,
      backgroundColor: theme.colors.surfaceVariant,
    },
    saveButton: {
      marginTop: theme.spacing.medium,
      borderRadius: theme.shape.borderRadius,
    },
    fieldGroup: {
      marginBottom: theme.spacing.medium,
    },
    input: {
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing.small,
    },
  });

  const renderInput = (
    field: keyof PersonalInformation,
    label: string,
    keyboardType: any = 'default',
    disabled: boolean = false,
    icon?: string,
    onIconPress?: () => void
  ) => (
    <View style={styles.fieldGroup}>
      <TextInput
        mode="outlined"
        label={label}
        value={formData[field] || ''}
        onChangeText={(value) => handleChange(field, value)}
        keyboardType={keyboardType}
        disabled={disabled}
        style={styles.input}
        error={!!errors[field]}
        right={
          icon ? (
            <TextInput.Icon
              icon={icon}
              onPress={onIconPress}
              color={theme.colors.onSurface}
            />
          ) : undefined
        }
      />
      {errors[field] && (
        <HelperText type="error" visible={!!errors[field]}>
          {errors[field]}
        </HelperText>
      )}
    </View>
  );

  return (
    <Card style={styles.container} elevation={2}>
      <View style={styles.section}>
        {renderInput('name', 'Full Name')}
        {renderInput('dateOfBirth', 'Date of Birth', 'default', false, 'calendar', () =>
          setDatePickerVisible(true)
        )}
      </View>

      <Divider style={styles.divider} />

      <View style={styles.section}>
        {renderInput('email', 'Email Address', 'email-address', true)}
        {renderInput('phoneNumber', 'Phone Number', 'phone-pad', false, 'phone')}
      </View>

      <Button
        onPress={handleSubmit}
        loading={isSubmitting}
        disabled={isSubmitting}
        style={[globalStyles.button_primary, styles.saveButton]}
      >
        Save Changes
      </Button>

      <DatePickerModal
        locale="en"
        mode="single"
        visible={datePickerVisible}
        onDismiss={() => setDatePickerVisible(false)}
        date={
          formData.dateOfBirth &&
          !isNaN(new Date(formData.dateOfBirth).getTime())
            ? new Date(formData.dateOfBirth)
            : new Date()
        }
        onConfirm={handleConfirmDate}
        validRange={{
          startDate: new Date(1900, 0, 1),
          endDate: new Date(),
        }}
      />
    </Card>
  );
};
