import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { Link } from 'expo-router';
import styles from './config/styles';
import type { AppTheme } from './types/theme';

export default function WelcomeScreen() {
  const theme = useTheme<AppTheme>();
  return (
    <SafeAreaView style={styles.welcome_screen_auth_container}>
      <View style={styles.screen_auth_content}>
        <View style={styles.welcome_screen_auth_header}>
          <Text style={styles.text_heading1}>Welcome</Text>
          <Text style={[styles.text_body, styles.welcome_subtitle]}>
            Begin your journey to better mental health
          </Text>
        </View>

        <View style={styles.welcome_screen_auth_form}>
          <Link href="/auth/sign-in" asChild>
            <Button
              mode="contained"
              style={[styles.button_primary, styles.welcome_button]}
              contentStyle={styles.welcome_buttonContent}
              labelStyle={styles.text_button}
            >
              Sign In
            </Button>
          </Link>

          <Link href="/auth/sign-up" asChild>
            <Button
              mode="outlined"
              style={styles.button_secondary}
              contentStyle={styles.welcome_buttonContent}
              labelStyle={[styles.text_button, { color: theme.colors.onSurfaceVariant }]}
            >
              Create Account
            </Button>
          </Link>
        </View>

        <View style={styles.welcome_screen_auth_footer}>
          <Text style={[styles.text_caption, { textAlign: 'center' }]}>
            By continuing, you agree to our{' '}
            <Link href="/legal/terms" asChild>
              <Text style={styles.text_link}>Terms of Service</Text>
            </Link>{' '}
            and{' '}
            <Link href="/legal/privacy" asChild>
              <Text style={styles.text_link}>Privacy Policy</Text>
            </Link>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
