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
      ...(styles.styles.component.input.container as any),
      backgroundColor: theme.colors.surface,
    },
    outline: {
      ...(styles.styles.component.input.outline as any),
      borderColor: error ? theme.colors.error : theme.colors.outline,
    },
    content: {
      ...(styles.styles.component.input.content as any),
      color: theme.colors.onSurface,
    },
  });

  return (
    <>
      <TextInput
        mode="outlined"
        label={label}
        error={error}
        style={[inputStyles.input, style as any]}
        outlineStyle={inputStyles.outline}
        contentStyle={inputStyles.content}
        {...props}
      />
      {helperText ? (
        <Text style={{ marginTop: 4, color: error ? 'red' : '#49454f', fontSize: 12 }}>
          {helperText}
        </Text>
      ) : null}
    </>
  );
}
