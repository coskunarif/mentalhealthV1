import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { layoutStyles, typographyStyles, buttonStyles } from '../config';
import type { AppTheme } from '../types/theme';
import { auth } from '../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { AuthIllustration, MaterialInput } from '../components';

export default function SignUpScreen() {
  const theme = useTheme<AppTheme>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    if (loading) return;
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace('/tabs/home');
    } catch (err) {
      setError('Failed to create account. Please try again.');
      console.error('Sign up error:', err);
    } finally {
      setLoading(false);
    }
  };

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
          <AuthIllustration type="signup" />
          <View style={layoutStyles.common_screen_auth_header}>
            <Text style={typographyStyles.text_heading2}>Create Account</Text>
            <Text style={typographyStyles.text_body}>Sign up to start your journey</Text>
          </View>
          <MaterialInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Enter your email"
          />
          <MaterialInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Create a secure password"
            style={{ marginTop: theme.spacing.small }}
          />
          <MaterialInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholder="Re-enter your password"
            style={{ marginTop: theme.spacing.small }}
            error={error ? error : undefined}
          />
          <Button
            mode="contained"
            onPress={handleSignUp}
            loading={loading}
            style={[buttonStyles.button_primary, { marginTop: theme.spacing.small }]}
          >
            Sign Up
          </Button>
          <View style={layoutStyles.common_screen_auth_footer}>
            <Text style={typographyStyles.text_body}>Already have an account? </Text>
            <Link href="/auth/sign-in" style={typographyStyles.text_link}>
              Sign In
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}
