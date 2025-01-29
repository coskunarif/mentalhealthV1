import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface, TextInput, Button, useTheme } from 'react-native-paper';
import { router } from 'expo-router';

export default function ForgotPassword() {
  const theme = useTheme();
  const [email, setEmail] = React.useState('');

  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            variant="headlineSmall"
            style={[
              styles.title,
              { color: theme.colors.onSurface }
            ]}
          >
            Reset Password
          </Text>
          <Text
            variant="bodyMedium"
            style={[
              styles.subtitle,
              { color: theme.colors.onSurfaceVariant }
            ]}
          >
            Enter your email address and we'll send you instructions to reset your password.
          </Text>
        </View>

        {/* Email Input */}
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          left={<TextInput.Icon icon="email" />}
          keyboardType="email-address"
          autoCapitalize="none"
          style={[
            styles.input,
            { backgroundColor: theme.colors.background }
          ]}
        />

        {/* Reset Password Button */}
        <Button
          mode="contained"
          onPress={() => {}}
          style={styles.resetButton}
          contentStyle={styles.buttonContent}
        >
          Send Reset Instructions
        </Button>

        {/* Back to Login */}
        <Button
          mode="text"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          Back to Login
        </Button>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 24,
  },
  header: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  input: {
    marginBottom: 8,
  },
  resetButton: {
    borderRadius: 28,
  },
  buttonContent: {
    height: 48,
  },
  backButton: {
    marginTop: 8,
  },
});
