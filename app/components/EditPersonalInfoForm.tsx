// File: app\components\EditPersonalInfoForm.tsx
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import {
  Card,
  Text,
  TextInput,
  HelperText,
  Button,
  Divider,
} from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import type { PersonalInformation } from '../types/personalInformation';
import { useAppTheme } from '../hooks/useAppTheme'; // Import hook
import buttonStyles from '../config/button.styles';
import styles from '../config/EditPersonalInfoForm.styles';
import { UserService } from '../services/user.service';

interface EditPersonalInfoFormProps {
  info: PersonalInformation;
  onSave: (info: PersonalInformation) => Promise<void>;
  userId: string;
}

export const EditPersonalInfoForm: React.FC<EditPersonalInfoFormProps> = ({
  info,
  onSave,
  userId,
}) => {
  const theme = useAppTheme(); // Use hook
  const [formData, setFormData] = useState<PersonalInformation>(info);
  const [errors, setErrors] = useState<
    Partial<Record<keyof PersonalInformation, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await UserService.getUserProfile(userId);
        if (userData) {
          const formattedData: PersonalInformation = {
            name: userData.displayName || '',
            email: userData.email || '',
            phoneNumber: userData.phoneNumber || '',
            dateOfBirth: userData.dateOfBirth || ''
          };
          setFormData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const formatPhoneNumber = (value: string): string => {
    let phone = value.replace(/[^\d+ ]/g, '');
    if (!phone.startsWith('+')) {
      phone = '+' + phone;
    }
    return phone.substring(0, 16);
  };

  const validateField = (
    field: keyof PersonalInformation,
    value: string | undefined
  ): string => {
    if (!value && field !== 'email') {
      return `${
        field === 'name' ? 'Name' : 'Field'
      } is required`;
    }
    switch (field) {
      case 'name':
        return value && value.trim().length < 2
          ? 'Name must be at least 2 characters'
          : '';
      case 'phoneNumber': {
        if (!value) return '';
        const normalized = value.replace(/\s+/g, '');
        return !/^\+?\d{9,15}$/.test(normalized)
          ? 'Enter a valid phone number (9-15 digits, optional +)'
          : '';
      }
      case 'dateOfBirth': {
        if (!value) return '';
        const date = new Date(value);
        return isNaN(date.getTime()) || date > new Date()
          ? 'Enter a valid past date'
          : '';
      }
      default:
        return '';
    }
  };

  const handleChange = (field: keyof PersonalInformation, value: string) => {
    if (field === 'phoneNumber') {
      value = formatPhoneNumber(value);
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  // Keep signature for TS, but handle runtime object { date: Date } using type assertion
  const handleConfirmDate = (date: Date) => {
    // Assert type to access the 'date' property based on runtime behavior
    const paramsDate = (date as any)?.date;

    // Check if the extracted date is valid
    if (paramsDate && paramsDate instanceof Date && !isNaN(paramsDate.getTime())) {
      const formattedDate = paramsDate.toISOString().split('T')[0];
      handleChange('dateOfBirth', formattedDate);
    } else {
      // Log if the received data structure is unexpected or date is invalid
      console.warn('DatePickerModal onConfirm received invalid or unexpected data. Parameter:', date, 'Extracted date:', paramsDate);
    }
    setDatePickerVisible(false);
  };

  const handleSubmit = async () => {
    const newErrors: Partial<Record<keyof PersonalInformation, string>> = {};
    (Object.keys(formData) as Array<keyof PersonalInformation>).forEach(
      (field) => {
        const error = validateField(field, formData[field]);
        if (error) newErrors[field] = error;
      }
    );
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

  const renderInput = (
    field: keyof PersonalInformation,
    label: string,
    keyboardType: any = 'default',
    disabled: boolean = false,
    icon?: string,
    onIconPress?: () => void
  ) => (
    <View style={styles.formFieldGroup}>
      <TextInput
        mode="outlined"
        label={label}
        value={formData[field] || ''}
        onChangeText={(value) => handleChange(field, value)}
        keyboardType={keyboardType}
        editable={field === 'dateOfBirth' ? false : true}
        showSoftInputOnFocus={field === 'dateOfBirth' ? false : undefined}
        disabled={disabled}
        style={styles.formInput}
        error={!!errors[field]}
        outlineColor={theme.colors.outline}
        activeOutlineColor={theme.colors.primary}
        theme={{
          colors: {
            background: theme.colors.surface,
            onSurfaceVariant: theme.colors.onSurfaceVariant,
          }
        }}
        right={
          icon ? (
            <TextInput.Icon
              icon={icon}
              onPress={onIconPress}
              color={errors[field] ? theme.colors.error : theme.colors.primary}
            />
          ) : undefined
        }
        {...(field === 'phoneNumber' ? { maxLength: 16 } : {})}
      />
      {errors[field] && (
        <HelperText type="error" visible={!!errors[field]} style={{ marginTop: -theme.spacing.tiny, marginBottom: theme.spacing.small }}>
          {errors[field]}
        </HelperText>
      )}
    </View>
  );

  return (
    <Card style={styles.formContainer} elevation={2} mode="elevated">
      <View style={styles.formSection}>
        {renderInput('name', 'Full Name')}
        {renderInput(
          'dateOfBirth',
          'Date of Birth',
          'default',
          false,
          'calendar',
          () => setDatePickerVisible(true)
        )}
      </View>

      <Divider style={styles.formDivider} />

      <View style={styles.formSection}>
        {renderInput('email', 'Email Address', 'email-address', true)}
        {renderInput('phoneNumber', 'Phone Number', 'phone-pad', false, 'phone')}
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={isSubmitting}
        disabled={isSubmitting}
        style={[styles.formSaveButton]}
        contentStyle={{ height: 48 }}
        labelStyle={{ ...theme.fonts.labelLarge, letterSpacing: 0.5 }}
      >
        {isSubmitting ? 'Saving...' : 'Save Changes'}
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

export default EditPersonalInfoForm;
