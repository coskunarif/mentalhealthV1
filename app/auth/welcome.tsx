import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Link } from 'expo-router';
import styles from '../config/styles';
import WelcomeCarousel from '../components/WelcomeCarousel';
import EnhancedButton from '../components/EnhancedButton';
import { useAuth } from '../../context/auth';

export default function Welcome() {
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    try {
      await signIn('demo@example.com', 'password'); // Using demo credentials for now
    } catch (error) {
      console.error('Sign in failed:', error);
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
          <EnhancedButton
            mode="contained"
            onPress={handleSignIn}
            fullWidth
          >
            Sign In with Email
          </EnhancedButton>

          <EnhancedButton
            mode="outlined"
            onPress={() => {
              // Handle Google sign in
              console.log('Google sign in');
            }}
            fullWidth
            style={styles.welcome_button}
          >
            Sign In with Google
          </EnhancedButton>
        </View>

        <View style={styles.screen_auth_footer}>
          <Text style={styles.text_body}>Don't have an account? </Text>
          <Link href="/auth/sign-up" style={styles.text_link}>
            <Text style={[styles.text_body, styles.text_link]}>
              Sign Up
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
