import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { layoutStyles, typographyStyles, buttonStyles } from '../config';
import formStyles from '../config/form.styles';
import type { AppTheme } from '../types/theme';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AuthIllustration, MaterialInput } from '../components';

export default function SignInScreen() {
  const theme = useTheme<AppTheme>();
  console.log('Theme in SignInScreen:', theme); // Debug log

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

const handleSignIn = async () => {
  console.log('Sign in button pressed');
  if (loading) return;
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/tabs/home');
    } catch (err) {
      setError('Invalid email or password');
      console.error('Sign in error:', err);
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
          <AuthIllustration type="login" />
          <View style={layoutStyles.common_screen_auth_header}>
            <Text style={typographyStyles.text_heading2}>Welcome Back</Text>
            <Text style={[typographyStyles.text_body, { marginTop: theme.spacing?.tiny || 4 }]}>
              Sign in to continue your journey
            </Text>
          </View>

          <MaterialInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Enter your email"
            error={error ? error : undefined}
          />

          <MaterialInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Enter your password"
            style={{ marginTop: theme.spacing?.small || 8 }}
          />

          <Button
            mode="contained"
            onPress={handleSignIn}
            loading={loading}
            style={[
              buttonStyles.button_primary,
              {
                marginTop: theme.spacing?.medium || 16,
                elevation: 3,
                height: 48,
              }
            ]}
            labelStyle={typographyStyles.text_button}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>

          <View style={layoutStyles.signIn_screen_auth_footer}>
            <Text style={typographyStyles.text_body}>Don't have an account? </Text>
            <Link href="/auth/sign-up" style={typographyStyles.text_link}>
              Sign Up
            </Link>
          </View>

          <View style={layoutStyles.signIn_screen_auth_footer}>
            <Link href="/auth/forgot-password" style={typographyStyles.text_link}>
              Forgot Password?
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}
