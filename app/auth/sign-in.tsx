import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { layoutStyles, typographyStyles, buttonStyles } from '../config';
import formStyles from '../config/form.styles';
import type { AppTheme } from '../types/theme';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

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
        <View style={layoutStyles.signIn_screen_auth_form}>
          <View style={layoutStyles.signIn_screen_auth_header}>
            <Text style={typographyStyles.text_heading2}>Welcome Back</Text>
            <Text style={[typographyStyles.text_body, { marginTop: theme.spacing?.tiny || 4 }]}>
              Sign in to continue your journey
            </Text>
          </View>

          <TextInput
            label="Email Address"
            mode="outlined"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={formStyles.component_input_field}
            placeholder="Enter your email"
            placeholderTextColor={theme.colors.onSurfaceVariant}
          />

          <TextInput
            label="Password"
            mode="outlined"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={[formStyles.component_input_field, { marginTop: theme.spacing?.small || 8 }]}
            placeholder="Enter your password"
            placeholderTextColor={theme.colors.onSurfaceVariant}
          />

          {error ? (
            <Text style={formStyles.component_input_error}>{error}</Text>
          ) : null}

          <Button
            mode="contained"
            onPress={handleSignIn}
            loading={loading}
            style={[buttonStyles.button_primary, { marginTop: theme.spacing?.small || 8 }]}
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
