import React, { useState } from 'react';
import { View, StyleSheet, Platform, Animated, Easing } from 'react-native';
import { Card, Text, TextInput, HelperText, Button, IconButton, Divider } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
    const fadeAnim = useState(new Animated.Value(0))[0]; // Initial value for opacity: 0

   // Function to animate fade in
    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            easing: Easing.out(Easing.ease), // Added easing
            useNativeDriver: true,
        }).start();
    };

    // Function to animate fade out
    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            easing: Easing.out(Easing.ease), // Added easing
            useNativeDriver: true,
        }).start();
    };

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
      fadeIn(); // Fade in on error
      return;
    }

        if (Object.keys(errors).length > 0 && Object.keys(newErrors).length === 0) {
            fadeOut();
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
      marginBottom: theme.spacing.medium,
    },
    input: {
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing.small,
    },
    divider: {
      marginVertical: theme.spacing.medium,
      backgroundColor: theme.colors.surfaceVariant,
    },
    saveButton: {
      marginTop: theme.spacing.medium,
      borderRadius: theme.shape.borderRadius,
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
        error={!!errors[field]} // Show error state
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
      <Animated.View style={{ opacity: fadeAnim }}>
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
      </Animated.View>

      <DatePickerModal
        locale="en"
        mode="single"
        visible={datePickerVisible}
        onDismiss={() => {
          setDatePickerVisible(false);
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }}
        date={formData.dateOfBirth ? new Date(formData.dateOfBirth) : new Date()}
        onConfirm={(date) => {
          handleConfirmDate(date);
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }}
        validRange={{
          startDate: new Date(1900, 0, 1),
          endDate: new Date(),
        }}
        // Add animation

      />
    </Card>
  );
};
