import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { theme } from '../config/theme';

interface InputFieldProps {
  field: string;
  label: string;
  value: string;
  onChange: (field: string, value: string) => void;
  error?: string;
  keyboardType?: 'default' | 'phone-pad' | 'email-address';
  icon?: string;
  onIconPress?: () => void;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  field,
  label,
  value,
  onChange,
  error,
  keyboardType,
  icon,
  onIconPress,
  disabled,
}) => {
  return (
    <View style={styles.fieldGroup}>
      <TextInput
        label={label}
        value={value}
        onChangeText={(val) => onChange(field, val)}
        mode="outlined"
        error={!!error}
        style={styles.input}
        keyboardType={keyboardType}
        right={
          icon && (
            <TextInput.Icon
              icon={icon}
              onPress={onIconPress}
              color={theme.colors.primary}
            />
          )
        }
        disabled={disabled}
      />
      <HelperText type="error" visible={!!error}>
        {error}
      </HelperText>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldGroup: {
    marginBottom: theme.spacing.tiny,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
});

export default InputField;
