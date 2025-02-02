import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Surface, TextInput, Button, useTheme, Snackbar } from 'react-native-paper';
import { router } from 'expo-router';
import { useAuth } from '../../context/auth';
import { globalStyles } from '../config/styles';

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
    <Surface style={globalStyles.authContainer}>
      <View style={globalStyles.authContent}>
        {/* App Logo */}
        <View style={globalStyles.authLogoContainer}>
          <Surface style={globalStyles.authLogo}>
            <Text style={globalStyles.authLogoText}>MH</Text>
          </Surface>
          <Text style={globalStyles.authAppTitle}>
            Mental Health App
          </Text>
        </View>

        {/* Welcome Text */}
        <Text style={globalStyles.authHeading}>
          Welcome Back
        </Text>
        <Text style={globalStyles.authSubheading}>
          Sign in to continue your journey to mental wellness
        </Text>

        {/* Email Input */}
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          left={<TextInput.Icon icon="email" />}
          keyboardType="email-address"
          autoCapitalize="none"
          style={globalStyles.authInput}
          contentStyle={globalStyles.bodyMedium}
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
          style={globalStyles.authInput}
          contentStyle={globalStyles.bodyMedium}
        />

        {/* Action Buttons */}
        <View style={globalStyles.authActions}>
          <Button
            mode="contained"
            onPress={handleSignIn}
            loading={isLoading}
            style={globalStyles.authPrimaryButton}
            contentStyle={globalStyles.buttonContent}
            labelStyle={globalStyles.labelLarge}
          >
            Sign In
          </Button>
          <Button
            mode="text"
            onPress={() => router.push('/auth/sign-up' as any)}
            style={globalStyles.authTextButton}
            labelStyle={globalStyles.labelLarge}
          >
            Don't have an account? Create here
          </Button>
          <Button
            mode="text"
            onPress={() => router.push('/auth/forgot-password' as any)}
            style={globalStyles.authTextButton}
            labelStyle={globalStyles.labelLarge}
          >
            Forgot Password?
          </Button>
        </View>

        {/* Snackbar */}
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          style={globalStyles.authSnackbar}
        >
          <Text style={[globalStyles.bodyMedium, { color: theme.colors.onError }]}>
            {snackbarMessage}
          </Text>
        </Snackbar>
      </View>
    </Surface>
  );
}
