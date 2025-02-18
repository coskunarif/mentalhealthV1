import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Surface, Text, TextInput, HelperText, Button, IconButton, Divider } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { PersonalInformation } from '../types/personalInformation';
import { theme } from '../config/theme';

interface EditPersonalInfoFormProps {
  info: PersonalInformation;
  onSave: (info: PersonalInformation) => Promise<void>;
}

export const EditPersonalInfoForm: React.FC<EditPersonalInfoFormProps> = ({ info, onSave }) => {
  const [formData, setFormData] = useState<PersonalInformation>(info);
  const [errors, setErrors] = useState<Partial<Record<keyof PersonalInformation, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  // Enhanced validation with better feedback
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
    // Validate all fields before submission
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

  const renderInput = (
    field: keyof PersonalInformation,
    label: string,
    options: {
      disabled?: boolean;
      icon?: string;
      keyboardType?: "default" | "phone-pad" | "email-address";
      onIconPress?: () => void;
    } = {}
  ) => (
    <View style={styles.fieldGroup}>
      <TextInput
        label={label}
        value={formData[field]}
        onChangeText={(val) => handleChange(field, val)}
        mode="outlined"
        error={!!errors[field]}
        style={styles.input}
        disabled={options.disabled}
        keyboardType={options.keyboardType}
        right={options.icon && (
          <TextInput.Icon 
            icon={options.icon}
            onPress={options.onIconPress}
          />
        )}
      />
      <HelperText type="error" visible={!!errors[field]}>
        {errors[field]}
      </HelperText>
    </View>
  );

  return (
    <Surface style={styles.container} elevation={2}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="account" size={24} color={theme.colors.primary} />
          <Text style={styles.sectionTitle}>Personal Information</Text>
        </View>
        {renderInput('name', 'Full Name')}
        {renderInput('dateOfBirth', 'Date of Birth', {
          icon: 'calendar',
          onIconPress: () => setDatePickerVisible(true)
        })}
      </View>

      <Divider style={styles.divider} />

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="contacts" size={24} color={theme.colors.primary} />
          <Text style={styles.sectionTitle}>Contact Information</Text>
        </View>
        {renderInput('email', 'Email Address', { 
          disabled: true,
          keyboardType: 'email-address'
        })}
        {renderInput('phoneNumber', 'Phone Number', { 
          keyboardType: 'phone-pad',
          icon: 'phone'
        })}
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={isSubmitting}
        disabled={isSubmitting}
        style={styles.saveButton}
        contentStyle={styles.saveButtonContent}
      >
        Save Changes
      </Button>

      <DatePickerModal
        locale="en"
        mode="single"
        visible={datePickerVisible}
        onDismiss={() => setDatePickerVisible(false)}
        date={formData.dateOfBirth ? new Date(formData.dateOfBirth) : new Date()}
        onConfirm={handleConfirmDate}
        validRange={{
          startDate: new Date(1900, 0, 1),
          endDate: new Date(),
        }}
      />
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: theme.spacing.medium,
    padding: theme.spacing.medium,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.colors.surface,
  },
  section: {
    marginBottom: theme.spacing.medium,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.small,
  },
  sectionTitle: {
    ...theme.fonts.titleMedium,
    color: theme.colors.primary,
    marginLeft: theme.spacing.small,
    fontWeight: '600',
  },
  fieldGroup: {
    marginBottom: theme.spacing.small,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  divider: {
    marginVertical: theme.spacing.medium,
  },
  saveButton: {
    marginTop: theme.spacing.medium,
    borderRadius: theme.shape.borderRadius,
  },
  saveButtonContent: {
    paddingVertical: 8,
  },
});
