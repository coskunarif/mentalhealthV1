import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { layoutStyles, typographyStyles, buttonStyles } from '../config';
import formStyles from '../config/form.styles';
import type { AppTheme } from '../types/theme';
import { auth } from '../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

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
      <View style={layoutStyles.layout_content}>
        <View style={layoutStyles.common_screen_auth_header}>
          <Text style={typographyStyles.text_heading2}>Create Account</Text>
          <Text style={typographyStyles.text_body}>Sign up to start your journey</Text>
        </View>

        <View style={layoutStyles.common_screen_auth_form}>
          <TextInput
            label="Email"
            mode="outlined"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={formStyles.component_input_field}
          />

          <TextInput
            label="Password"
            mode="outlined"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={[formStyles.component_input_field, { marginTop: theme.spacing.small }]}
          />

          <TextInput
            label="Confirm Password"
            mode="outlined"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={[formStyles.component_input_field, { marginTop: theme.spacing.small }]}
          />

          {error ? (
            <Text style={formStyles.component_input_error}>{error}</Text>
          ) : null}

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
