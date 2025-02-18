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

  // Validation helpers
  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
  };

  const validateName = (name: string) => name.trim().length >= 2;

  const handleChange = (field: keyof PersonalInformation, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleConfirmDate = (date: Date) => {
    // Format the date as YYYY-MM-DD
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    handleChange('dateOfBirth', `${yyyy}-${mm}-${dd}`);
    setDatePickerVisible(false);
  };

  const handleSubmit = async () => {
    const newErrors: Partial<Record<keyof PersonalInformation, string>> = {};
    if (!validateName(formData.name)) {
      newErrors.name = 'Name must be at least 2 characters long';
    }
    if (formData.phoneNumber && !validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
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

  return (
    <Surface style={styles.container} elevation={1}>
      <Text style={styles.subsectionTitle}>Personal Information</Text>
      <View style={styles.section}>
        <TextInput
          label="Name"
          value={formData.name}
          onChangeText={(val) => handleChange('name', val)}
          mode="outlined"
          error={!!errors.name}
          style={styles.input}
        />
        <HelperText type="error" visible={!!errors.name}>
          {errors.name}
        </HelperText>
      </View>

      <View style={styles.fieldGroup}>
        <TextInput
          label="Date of Birth"
          value={formData.dateOfBirth}
          mode="outlined"
          style={styles.input}
          editable={false}
          right={<TextInput.Icon 
            icon="calendar" 
            onPress={() => setDatePickerVisible(true)} 
            color={theme.colors.primary}
          />}
        />
        <HelperText type="error" visible={!!errors.dateOfBirth}>
          {errors.dateOfBirth}
        </HelperText>
      </View>

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

      <Divider style={styles.divider} />
      
      <Text style={styles.subsectionTitle}>Contact Information</Text>
      <View style={styles.section}>
        <TextInput
          label="Email"
          value={formData.email}
          disabled
          mode="outlined"
          style={styles.input}
        />
      </View>

      <View style={styles.fieldGroup}>
        <TextInput
          label="Phone Number"
          value={formData.phoneNumber}
          onChangeText={(val) => handleChange('phoneNumber', val)}
          mode="outlined"
          error={!!errors.phoneNumber}
          keyboardType="phone-pad"
          style={styles.input}
        />
        <HelperText type="error" visible={!!errors.phoneNumber}>
          {errors.phoneNumber}
        </HelperText>
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={isSubmitting}
        disabled={isSubmitting}
        style={styles.saveButton}
      >
        Save Changes
      </Button>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: theme.spacing.small,
    padding: theme.spacing.small,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.colors.surface,
  },
  subsectionTitle: {
    ...theme.fonts.titleMedium,
    color: theme.colors.onSurface,
    fontWeight: '600',
    marginBottom: theme.spacing.tiny,
  },
  section: {
    marginBottom: theme.spacing.small,
  },
  fieldGroup: {
    marginBottom: theme.spacing.tiny,
  },
  input: {
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.tiny,
  },
  divider: {
    marginVertical: theme.spacing.small,
  },
  saveButton: {
    marginTop: theme.spacing.tiny,
  },
});
