import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { Link, router } from 'expo-router';
import styles from '../config/styles';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function SignInScreen() {
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
      <View style={styles.layout_content}>
        <View style={styles.screen_auth_header}>
          <Text style={styles.text_heading1}>Welcome Back</Text>
          <Text style={[styles.text_body, styles.signIn_subtitle]}>
            Sign in to continue your journey
          </Text>
        </View>

        <View style={styles.screen_auth_form}>
          <View style={styles.component_input_container}>
            <Text style={styles.component_input_label}>Email</Text>
            <TextInput
              mode="outlined"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.component_input_field}
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
            />
            {error ? (
              <Text style={styles.component_input_error}>{error}</Text>
            ) : null}
          </View>

          <Button
            mode="contained"
            onPress={handleSignIn}
            loading={loading}
            style={styles.button_primary}
          >
            Sign In
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
