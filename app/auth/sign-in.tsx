import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { Link, router } from 'expo-router';
import styles from '../config/styles';
import type { AppTheme } from '../types/theme';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function SignInScreen() {
  const theme = useTheme<AppTheme>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async () => {
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
    <View style={styles.layout_container}>
      <View style={styles.screen_auth_container}>
        <View style={styles.screen_auth_form}>
          <View style={styles.screen_auth_header}>
            <Text style={styles.text_heading1}>Welcome Back</Text>
            <Text style={[styles.text_body, styles.signIn_subtitle]}>
              Sign in to continue your journey
            </Text>
          </View>

          <View style={styles.component_input_container}>
            <Text style={styles.component_input_label}>Email Address</Text>
            <TextInput
              mode="outlined"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.component_input_field}
              placeholder="Enter your email"
              placeholderTextColor={theme.colors.onSurfaceVariant}
            />
          </View>

          <View style={styles.component_input_container}>
            <Text style={styles.component_input_label}>Password</Text>
            <TextInput
              mode="outlined"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.component_input_field}
              placeholder="Enter your password"
              placeholderTextColor={theme.colors.onSurfaceVariant}
            />
            {error ? (
              <Text style={styles.component_input_error}>{error}</Text>
            ) : null}
          </View>

          <Button
            mode="contained"
            onPress={handleSignIn}
            loading={loading}
            style={[styles.button_primary, { marginTop: 8 }]}
            labelStyle={styles.text_button}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>

          <View style={styles.screen_auth_footer}>
            <Text style={styles.text_body}>Don't have an account? </Text>
            <Link href="/auth/sign-up" style={styles.text_link}>
              Sign Up
            </Link>
          </View>

          <View style={styles.screen_auth_footer}>
            <Link href="/auth/forgot-password" style={styles.text_link}>
              Forgot Password?
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}
