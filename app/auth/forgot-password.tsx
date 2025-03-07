import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { layoutStyles, typographyStyles, buttonStyles } from '../config';
import formStyles from '../config/form.styles';
import { auth } from '../lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async () => {
    if (loading || !email) return;
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
      console.error('Password reset error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={layoutStyles.layout_container}>
      <View style={layoutStyles.layout_content}>
        <View style={layoutStyles.common_screen_auth_header}>
          <Text style={typographyStyles.text_heading1}>Reset Password</Text>
          <Text style={typographyStyles.text_body}>
            Enter your email to receive a password reset link
          </Text>
        </View>

        <View style={layoutStyles.common_screen_auth_form}>
          <View style={formStyles.component_input_container}>
            <Text style={formStyles.component_input_label}>Email</Text>
            <TextInput
              mode="outlined"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={formStyles.component_input_field}
            />
            {error ? (
              <Text style={formStyles.component_input_error}>{error}</Text>
            ) : null}
          </View>

          <Button
            mode="contained"
            onPress={handleResetPassword}
            loading={loading}
            style={buttonStyles.button_primary}
          >
            Send Reset Link
          </Button>

          <View style={layoutStyles.common_screen_auth_footer}>
            <Text style={typographyStyles.text_body}>Remember your password? </Text>
            <Link href="/auth/sign-in" style={typographyStyles.text_link}>
              Sign In
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}
