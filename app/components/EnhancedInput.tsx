import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TextInput, TextInputProps, useTheme } from 'react-native-paper';
import type { AppTheme } from '../types/theme';
import styles from '../config/styles';

interface EnhancedInputProps extends Omit<TextInputProps, 'theme'> {
  label?: string;
  error?: boolean;
  helperText?: string;
}

export default function EnhancedInput({
  label,
  error,
  helperText,
  style,
  ...props
}: EnhancedInputProps): JSX.Element {
  const theme = useTheme<AppTheme>();
  const inputStyles = StyleSheet.create({
    input: {
      ...styles.component_input_container,
      backgroundColor: theme.colors.surface,
    },
    outline: {
      ...styles.component_input_outline,
      borderColor: error ? theme.colors.error : theme.colors.outline,
    },
    content: {
      ...styles.component_input_content,
      color: theme.colors.onSurface,
    },
  });

  return (
    <>
      <TextInput
        mode="outlined"
        label={label}
        error={error}
        style={[inputStyles.input, style]}
        outlineStyle={inputStyles.outline}
        contentStyle={inputStyles.content}
        {...props}
      />
      {helperText ? (
        <Text style={{ marginTop: 4, color: error ? theme.colors.error : theme.colors.onSurfaceVariant, fontSize: 12 }}>
          {helperText}
        </Text>
      ) : null}
    </>
  );
}
