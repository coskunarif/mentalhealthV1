import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Button, Surface, Snackbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/auth';
import styles from '../config/styles';

export default function ProfileScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signOut();
      // Navigation will be handled by the root navigator
    } catch (err) {
      setError('Failed to sign out. Please try again.');
      console.error('Sign out error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.layout_container}>
      <View style={styles.screen_profile_header}>
        <Text style={styles.text_heading2}>Profile</Text>
        <Text style={[styles.text_body, styles.profile_subtitle]}>
          Manage your account settings
        </Text>
      </View>

      <ScrollView
        style={styles.layout_scrollView}
        contentContainerStyle={styles.screen_profile_content}
      >
        <Surface
          elevation={1}
          style={[styles.component_card_elevated, styles.profile_section]}
        >
          <Text style={styles.text_heading3}>Account</Text>
          <Text style={[styles.text_body, styles.profile_sectionSubtitle]}>
            Update your account information
          </Text>
          <Button
            mode="outlined"
            onPress={() => router.push('/account/settings')}
            style={[styles.button_secondary, styles.profile_button]}
          >
            Account Settings
          </Button>
        </Surface>

        <Surface
          elevation={1}
          style={[styles.component_card_elevated, styles.profile_section]}
        >
          <Text style={styles.text_heading3}>Notifications</Text>
          <Text style={[styles.text_body, styles.profile_sectionSubtitle]}>
            Manage your notification preferences
          </Text>
          <Button
            mode="outlined"
            onPress={() => router.push('/notifications/settings')}
            style={[styles.button_secondary, styles.profile_button]}
          >
            Notification Settings
          </Button>
        </Surface>

        <Surface
          elevation={1}
          style={styles.component_card_elevated}
        >
          <Text style={styles.text_heading3}>Sign Out</Text>
          <Text style={[styles.text_body, styles.profile_sectionSubtitle]}>
            Sign out of your account
          </Text>
          <Button
            mode="outlined"
            onPress={handleSignOut}
            loading={isLoading}
            disabled={isLoading}
            style={[styles.button_secondary, styles.profile_button]}
          >
            {isLoading ? 'Signing Out...' : 'Sign Out'}
          </Button>
        </Surface>
      </ScrollView>
      <Snackbar
        visible={!!error}
        onDismiss={() => setError(null)}
        action={{
          label: 'Dismiss',
          onPress: () => setError(null),
        }}
      >
        {error}
      </Snackbar>
    </View>
  );
}
