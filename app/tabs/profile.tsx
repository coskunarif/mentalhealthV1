import React, { useState, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Button, Surface, Snackbar, Dialog, Portal } from 'react-native-paper';
import { EditPersonalInfoForm } from '../components/EditPersonalInfoForm';
import { NotificationPreferences } from '../components/NotificationPreferences';
import { LanguageRegionSettings } from '../components/LanguageRegionSettings';
import { HelpCenterCard } from '../components/HelpCenterCard';
import { LegalLinks } from '../components/LegalLinks';
import type { PersonalInformation } from '../types/personalInformation';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../config/styles';
import { theme } from '../config/theme';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  const router = useRouter();

  const handleSavePersonalInfo = useCallback(async (info: PersonalInformation) => {
    try {
      // TODO: Implement API call to save personal info
      console.log('Saving personal info:', info);
    } catch (err: any) {
      setError(err?.message || "Failed to save personal information");
      throw err;
    }
  }, []);

  const handleNotificationToggle = useCallback(async (settingId: string, value: boolean) => {
    try {
      // TODO: Implement API call to update notification settings
      console.log('Updating notification setting:', settingId, value);
    } catch (err: any) {
      setError(err?.message || "Failed to update notification settings");
      throw err;
    }
  }, []);

  const handleLanguageChange = useCallback(async (languageCode: string) => {
    try {
      // TODO: Implement API call to update language settings
      console.log('Changing language to:', languageCode);
    } catch (err: any) {
      setError(err?.message || "Failed to change language");
      throw err;
    }
  }, []);

  const handleContactSupport = useCallback(() => {
    // TODO: Implement live chat functionality
    console.log('Opening live chat');
  }, []);

  const handleSignOut = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!signOut) throw new Error('Sign out function not available');
      await signOut();
      router.replace("/auth/sign-in");
    } catch (err: any) {
      setError(err?.message || "Failed to sign out. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const personalInfo = {
    name: "John Doe",
    email: "johndoe@example.com",
    phoneNumber: "555-1234",
    dateOfBirth: "1990-01-01",
  };

  return (
    <View style={styles.layout_container}>
      <ScrollView style={styles.layout_scrollView}>
        {/* Personal Information Form */}
        <EditPersonalInfoForm 
          info={personalInfo}
          onSave={handleSavePersonalInfo}
        />

        {/* Subscription Section */}
        <Surface style={styles.profile_mainSection} elevation={1}>
          <View style={styles.profile_sectionHeader}>
            <MaterialCommunityIcons 
              name="crown" 
              size={24} 
              color={theme.colors.secondary} 
            />
            <Text style={[styles.profile_sectionTitle, theme.fonts.titleMedium]}>
              Premium Subscription
            </Text>
          </View>
          <View style={styles.profile_subscriptionStatus}>
            <Text style={[styles.profile_statusLabel, theme.fonts.bodyMedium]}>
              Status:
            </Text>
            <View style={[styles.profile_statusBadge, { backgroundColor: theme.colors.secondary }]}>
              <Text style={[styles.profile_statusText, { color: theme.colors.onSecondary }]}>
                Active
              </Text>
            </View>
          </View>
          <Text style={[styles.profile_subscriptionDetails, theme.fonts.bodyMedium]}>
            Next billing date: March 15, 2024
          </Text>
          <Button
            mode="contained"
            onPress={() => router.push('/subscription/manage')}
            style={styles.profile_actionButton}
            labelStyle={theme.fonts.labelLarge}
          >
            Manage Subscription
          </Button>
        </Surface>

        {/* Notification Preferences */}
        <NotificationPreferences onToggle={handleNotificationToggle} />

        {/* Language & Region Settings */}
        <LanguageRegionSettings onLanguageChange={handleLanguageChange} />

        {/* Help Center */}
        <HelpCenterCard onContactSupport={handleContactSupport} />

        {/* Legal Links */}
        <LegalLinks />

        {/* Sign Out Button */}
        <Surface style={[styles.profile_mainSection, styles.profile_signOutSection]} elevation={1}>
          <Button
            mode="outlined"
            onPress={() => setShowSignOutDialog(true)}
            loading={isLoading}
            disabled={isLoading}
            icon="logout"
            style={styles.profile_signOutButton}
            labelStyle={theme.fonts.labelLarge}
          >
            {isLoading ? 'Signing Out...' : 'Sign Out'}
          </Button>
        </Surface>
      </ScrollView>

      {/* Sign Out Confirmation Dialog */}
      <Portal>
        <Dialog visible={showSignOutDialog} onDismiss={() => setShowSignOutDialog(false)}>
          <Dialog.Title style={theme.fonts.titleLarge}>Sign Out</Dialog.Title>
          <Dialog.Content>
            <Text style={theme.fonts.bodyMedium}>
              Are you sure you want to sign out?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button 
              onPress={() => setShowSignOutDialog(false)}
              labelStyle={theme.fonts.labelLarge}
            >
              Cancel
            </Button>
            <Button 
              onPress={() => {
                setShowSignOutDialog(false);
                handleSignOut();
              }}
              labelStyle={theme.fonts.labelLarge}
            >
              Sign Out
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Snackbar
        visible={!!error}
        onDismiss={() => setError(null)}
        action={{
          label: 'Dismiss',
          onPress: () => setError(null),
        }}
      >
        <Text style={theme.fonts.bodyMedium}>{error}</Text>
      </Snackbar>
    </View>
  );
}
