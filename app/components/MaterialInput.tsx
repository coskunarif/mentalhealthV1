import React from 'react';
import { TextInput, HelperText, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
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
  const [focused, setFocused] = React.useState(false);
  
  return (
    <View style={[styles.container, style]}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType as any}
        autoCapitalize={autoCapitalize}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.onSurfaceVariant}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        mode="flat"
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.surfaceVariant,
            borderRadius: theme.componentSizes.buttonBorderRadius / 2,
          },
          focused && {
            elevation: 2,
            backgroundColor: theme.withOpacity(theme.colors.primaryContainer, 0.2),
          }
        ]}
        theme={{
          colors: {
            primary: theme.colors.primary,
            background: focused ? 
              theme.withOpacity(theme.colors.primaryContainer, 0.2) : 
              theme.colors.surfaceVariant,
          }
        }}
        underlineColor="transparent"
        activeUnderlineColor={theme.colors.primary}
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