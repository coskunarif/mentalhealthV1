import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { styles } from '../config/styles';
import { auth } from '../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignUpScreen() {
  const router = useRouter();
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
    <View style={styles.layout.container}>
      <View style={styles.layout.content}>
        <View style={styles.screen.auth.header}>
          <Text style={styles.text.heading1}>Create Account</Text>
          <Text style={styles.text.body}>Sign up to start your journey</Text>
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
          </View>

          <View style={styles.component.input.container}>
            <Text style={styles.component.input.label}>Confirm Password</Text>
            <TextInput
              mode="outlined"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              style={styles.component.input.field}
            />
            {error ? (
              <Text style={styles.component.input.error}>{error}</Text>
            ) : null}
          </View>

          <Button
            mode="contained"
            onPress={handleSignUp}
            loading={loading}
            style={styles.button.primary}
          >
            Sign Up
          </Button>

          <View style={styles.screen.auth.footer}>
            <Text style={styles.text.body}>Already have an account? </Text>
            <Link href="/auth/sign-in" style={styles.text.link as any}>
              Sign In
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}
