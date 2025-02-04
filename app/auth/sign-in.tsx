import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { styles } from '../config/styles';
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
    <View style={styles.layout.container}>
      <View style={styles.layout.content}>
        <View style={styles.screen.auth.header}>
          <Text style={styles.text.heading1}>Welcome Back</Text>
          <Text style={[styles.text.body, { marginTop: 8 }]}>
            Sign in to continue your journey
          </Text>
        </View>

        <View style={styles.screen.auth.form}>
          <View style={styles.component.input.container}>
            <Text style={styles.component.input.label}>Email</Text>
            <TextInput
              mode="outlined"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.component.input.field}
            />
          </View>

          <View style={styles.component.input.container}>
            <Text style={styles.component.input.label}>Password</Text>
            <TextInput
              mode="outlined"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.component.input.field}
            />
            {error ? (
              <Text style={styles.component.input.error}>{error}</Text>
            ) : null}
          </View>

          <Button
            mode="contained"
            onPress={handleSignIn}
            loading={loading}
            style={styles.button.primary}
          >
            Sign In
          </Button>

          <View style={styles.screen.auth.footer}>
            <Text style={styles.text.body}>Don't have an account? </Text>
            <Link href="/auth/sign-up" style={styles.text.link as any}>
              Sign Up
            </Link>
          </View>

          <View style={styles.screen.auth.footer}>
            <Link href="/auth/forgot-password" style={styles.text.link as any}>
              Forgot Password?
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}
