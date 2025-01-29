import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface, TextInput, Button, useTheme, Snackbar } from 'react-native-paper';
import { router } from 'expo-router';
import { useAuth } from '../../context/auth';

export default function Welcome() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { signIn } = useAuth();
  
  const showMessage = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      showMessage("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    try {
      await signIn(email, password);
      // No need to navigate, the index page will handle navigation based on auth state
    } catch (error: any) {
      showMessage(error.message || "Sign in failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        {/* App Logo */}
        <View style={styles.logoContainer}>
          <Surface
            style={[
              styles.logo,
              { backgroundColor: theme.colors.primary }
            ]}
          >
            <Text
              variant="displayMedium"
              style={[
                styles.logoText,
                { color: theme.colors.onPrimary }
              ]}
            >
              MH
            </Text>
          </Surface>
          <Text
            variant="headlineSmall"
            style={[
              styles.appTitle,
              { color: theme.colors.onSurface }
            ]}
          >
            Mental Health App
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

        {/* Password Input */}
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry={!showPassword}
          left={<TextInput.Icon icon="lock" />}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          style={[
            styles.input,
            { backgroundColor: theme.colors.background }
          ]}
        />

        {/* Sign In Button */}
        <Button
          mode="contained"
          onPress={handleSignIn}
          loading={isLoading}
          style={styles.signInButton}
          contentStyle={styles.buttonContent}
        >
          Sign In
        </Button>

        {/* Forgot Password */}
        <Button
          mode="text"
          onPress={() => router.push('/auth/forgot-password' as any)}
          style={styles.textButton}
        >
          Forgot Password?
        </Button>

        {/* Create Account Link */}
        <Button
          mode="text"
          onPress={() => router.push('/auth/sign-up' as any)}
          style={styles.textButton}
        >
          Don't have an account? Create here
        </Button>

        {/* Snackbar for error messages */}
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          style={styles.snackbar}
        >
          {snackbarMessage}
        </Snackbar>
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
    gap: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    padding: 16,
    borderRadius: 16,
    elevation: 4,
  },
  logoText: {
    fontWeight: 'bold',
  },
  appTitle: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 8,
  },
  signInButton: {
    marginTop: 8,
    borderRadius: 28,
  },
  buttonContent: {
    height: 48,
  },
  textButton: {
    marginTop: 8,
  },
  snackbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
