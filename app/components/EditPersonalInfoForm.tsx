import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, TextInput, HelperText, Button } from 'react-native-paper';
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

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
  };

  const validateName = (name: string) => {
    return name.trim().length >= 2;
  };

  const validateDateOfBirth = (date: string) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) return false;

    const birthDate = new Date(date);
    const today = new Date();
    return birthDate < today && birthDate.getFullYear() > 1900;
  };

  const handleChange = (field: keyof PersonalInformation, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async () => {
    const newErrors: Partial<Record<keyof PersonalInformation, string>> = {};

    if (!validateName(formData.name)) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    if (formData.phoneNumber && !validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (formData.dateOfBirth && !validateDateOfBirth(formData.dateOfBirth)) {
      newErrors.dateOfBirth = 'Please enter a valid date (YYYY-MM-DD)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(formData);
    } catch (error) {
      // Handle error if needed
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.sectionTitle}>Edit Personal Information</Title>
        
        <TextInput
          label="Name"
          value={formData.name}
          onChangeText={(value) => handleChange('name', value)}
          style={styles.input}
          error={!!errors.name}
          mode="outlined"
        />
        <HelperText type="error" visible={!!errors.name}>
          {errors.name}
        </HelperText>

        <TextInput
          label="Email"
          value={formData.email}
          disabled
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="Phone Number"
          value={formData.phoneNumber}
          onChangeText={(value) => handleChange('phoneNumber', value)}
          style={styles.input}
          error={!!errors.phoneNumber}
          mode="outlined"
          keyboardType="phone-pad"
        />
        <HelperText type="error" visible={!!errors.phoneNumber}>
          {errors.phoneNumber}
        </HelperText>

        <TextInput
          label="Date of Birth"
          value={formData.dateOfBirth}
          onChangeText={(value) => handleChange('dateOfBirth', value)}
          style={styles.input}
          error={!!errors.dateOfBirth}
          mode="outlined"
          placeholder="YYYY-MM-DD"
        />
        <HelperText type="error" visible={!!errors.dateOfBirth}>
          {errors.dateOfBirth}
        </HelperText>

        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={isSubmitting}
          disabled={isSubmitting}
          style={styles.saveButton}
          labelStyle={theme.fonts.labelLarge}
        >
          Save Changes
        </Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: theme.spacing.medium,
    marginTop: theme.spacing.small,
    padding: theme.spacing.small,
    borderRadius: theme.shape.borderRadius,
    elevation: 2,
    backgroundColor: theme.colors.surface,
  },
  sectionTitle: {
    marginBottom: theme.spacing.medium,
    color: theme.colors.primary,
    fontSize: theme.fonts.headlineMedium.fontSize,
    fontFamily: theme.fonts.headlineMedium.fontFamily,
    fontWeight: theme.fonts.headlineMedium.fontWeight,
  },
  input: {
    marginBottom: theme.spacing.tiny,
    backgroundColor: theme.colors.surface,
  },
  saveButton: {
    marginTop: theme.spacing.medium,
  },
});
