import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { styles } from '../config/styles';
import { auth } from '../lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ForgotPasswordScreen() {
  const router = useRouter();
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

  const handleBackToSignIn = () => {
    router.back();
  };

  return (
    <View style={styles.layout.container}>
      <View style={styles.layout.content}>
        <View style={styles.screen.auth.header}>
          <Text style={styles.text.heading1}>Reset Password</Text>
          <Text style={styles.text.body}>
            Enter your email to receive a password reset link
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
              style={styles.component.input.container}
            />
            {error ? (
              <Text style={styles.component.input.error}>{error}</Text>
            ) : null}
          </View>

          <Button
            mode="contained"
            onPress={handleResetPassword}
            loading={loading}
            style={styles.button.primary}
          >
            Send Reset Link
          </Button>

          <View style={styles.screen.auth.footer}>
            <Text style={styles.text.body}>Remember your password? </Text>
            <Link href="/auth/sign-in" style={styles.text.link as any}>
              Sign In
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}
