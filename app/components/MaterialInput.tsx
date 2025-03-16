import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, HelperText, useTheme } from 'react-native-paper';
import type { AppTheme } from '../types/theme';

interface MaterialInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  placeholder?: string;
  style?: any;
}

const MaterialInput = ({
  label,
  value,
  onChangeText,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  placeholder,
  style
}: MaterialInputProps) => {
  const theme = useTheme<AppTheme>();

  return (
    <View style={[styles.container, style]}>
      <TextInput
        mode="outlined"
        label={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType as any}
        autoCapitalize={autoCapitalize}
        placeholder={placeholder}
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.surface,
            borderRadius: 4,
          }
        ]}
        outlineColor={theme.colors.outline}
        activeOutlineColor={theme.colors.primary}
        theme={{
          colors: {
            background: theme.colors.surface,
            onSurfaceVariant: theme.colors.onSurfaceVariant,
          }
        }}
      />
      {error ? (
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  input: {
    height: 56,
    overflow: 'hidden',
  },
});

export default MaterialInput;
