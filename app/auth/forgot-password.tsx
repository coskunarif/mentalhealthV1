import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { layoutStyles, typographyStyles, buttonStyles } from '../config';
import formStyles from '../config/form.styles';
import { auth } from '../lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { AuthIllustration, MaterialInput } from '../components';
import type { AppTheme } from '../types/theme';

export default function ForgotPasswordScreen() {
  const theme = useTheme<AppTheme>();
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

  const styles = StyleSheet.create({
    successContainer: {
      backgroundColor: theme.withOpacity(theme.colors.primary, 0.1),
      borderRadius: 8,
      padding: theme.spacing.small,
      marginTop: theme.spacing.small,
    },
    successText: {
      ...typographyStyles.text_body,
      color: theme.colors.primary,
    }
  });

  return (
    <View style={layoutStyles.layout_container}>
      <View style={layoutStyles.common_screen_auth_container}>
        <View style={[
          layoutStyles.common_screen_auth_form,
          {
            elevation: 1,
            backgroundColor: theme.colors.surface,
            borderRadius: theme.componentSizes.cardBorderRadius,
            shadowColor: theme.colors.shadow,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            padding: theme.spacing.large,
            width: '100%',
            maxWidth: 400,
          }
        ]}>
          <AuthIllustration type="reset" />
          <View style={layoutStyles.common_screen_auth_header}>
            <Text style={typographyStyles.text_heading1}>Reset Password</Text>
            <Text style={typographyStyles.text_body}>Enter your email to receive a password reset link</Text>
          </View>
          <MaterialInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Enter your email address"
            error={error ? error : undefined}
          />
          {success && (
            <View style={styles.successContainer}>
              <Text style={styles.successText}>Reset link sent! Check your email inbox.</Text>
            </View>
          )}
          <Button
            mode="contained"
            onPress={handleResetPassword}
            loading={loading}
            style={[buttonStyles.button_primary, { marginTop: theme.spacing.medium, height: 48, elevation: 3 }]}
            labelStyle={typographyStyles.text_button}
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
