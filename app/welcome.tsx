import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Link } from 'expo-router';
import { styles } from './config/styles';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.screen.auth.container}>
      <View style={styles.screen.auth.content}>
        <View style={styles.screen.auth.header}>
          <Text style={styles.text.heading1}>Welcome</Text>
          <Text style={[styles.text.body, { marginTop: 8, color: '#666' }]}>
            Begin your journey to better mental health
          </Text>
        </View>

        <View style={styles.screen.auth.form}>
          <Link href="/auth/sign-in" asChild>
            <Button
              mode="contained"
              style={[styles.button.primary, { marginBottom: 16 }]}
              contentStyle={{ height: 48 }}
              labelStyle={styles.text.button}
            >
              Sign In
            </Button>
          </Link>

          <Link href="/auth/sign-up" asChild>
            <Button
              mode="outlined"
              style={styles.button.secondary}
              contentStyle={{ height: 48 }}
              labelStyle={[styles.text.button, { color: '#666' }]}
            >
              Create Account
            </Button>
          </Link>
        </View>

        <View style={styles.screen.auth.footer}>
          <Text style={[styles.text.caption, { textAlign: 'center' }]}>
            By continuing, you agree to our{' '}
            <Link href="/legal/terms" asChild>
              <Text style={styles.text.link}>Terms of Service</Text>
            </Link>{' '}
            and{' '}
            <Link href="/legal/privacy" asChild>
              <Text style={styles.text.link}>Privacy Policy</Text>
            </Link>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
