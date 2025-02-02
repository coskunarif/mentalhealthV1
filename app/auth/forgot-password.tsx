import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, Surface, TextInput, Button, useTheme, Snackbar } from 'react-native-paper';
import { router } from 'expo-router';
import { globalStyles } from '../config/styles';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function ForgotPassword() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const showMessage = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const handleResetPassword = async () => {
    if (!email) {
      showMessage('Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      showMessage('Password reset instructions sent to your email');
      setEmail('');
    } catch (error: any) {
      showMessage(error.message || 'Failed to send reset instructions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Surface style={globalStyles.authContainer}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={globalStyles.fill}
      >
        <ScrollView 
          contentContainerStyle={[
            globalStyles.authContent,
            globalStyles.centerContent
          ]}
        >
          <View style={globalStyles.authFormContainer}>
            <Text style={globalStyles.authHeading}>
              Reset Password
            </Text>
            
            <Text style={globalStyles.authSubheading}>
              Enter your email address and we'll send you instructions to reset your password.
            </Text>

            <View style={globalStyles.authFormFields}>
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
                disabled={loading}
              />

              <View style={globalStyles.authActions}>
                <Button
                  mode="contained"
                  onPress={handleResetPassword}
                  loading={loading}
                  disabled={loading}
                  style={globalStyles.authPrimaryButton}
                  contentStyle={globalStyles.buttonContent}
                  labelStyle={globalStyles.labelLarge}
                >
                  {loading ? 'Sending...' : 'Send Reset Instructions'}
                </Button>

                <Button
                  mode="text"
                  onPress={() => router.back()}
                  style={globalStyles.authTextButton}
                  labelStyle={globalStyles.labelLarge}
                  disabled={loading}
                >
                  Back to Login
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          style={globalStyles.authSnackbar}
          action={{
            label: 'Close',
            onPress: () => setSnackbarVisible(false),
          }}
        >
          <Text style={[globalStyles.bodyMedium, { color: theme.colors.onError }]}>
            {snackbarMessage}
          </Text>
        </Snackbar>
      </KeyboardAvoidingView>
    </Surface>
  );
}
