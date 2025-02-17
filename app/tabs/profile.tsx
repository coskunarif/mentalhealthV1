import React, { useState, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Button, Surface, Snackbar, Dialog, Portal, List, Modal } from 'react-native-paper';
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

  // Modal visibility states
  const [isPersonalInfoModalVisible, setIsPersonalInfoModalVisible] = useState(false);
  const [isNotificationsModalVisible, setIsNotificationsModalVisible] = useState(false);
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);
  const [isLegalModalVisible, setIsLegalModalVisible] = useState(false);

  const handleSavePersonalInfo = useCallback(async (info: PersonalInformation) => {
    try {
      // TODO: Implement API call to save personal info
      console.log('Saving personal info:', info);
      setIsPersonalInfoModalVisible(false); // Close modal on success
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
      setIsLanguageModalVisible(false); // Close modal on success
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
    name: user?.displayName || "User Name",
    email: user?.email || "user@example.com",
    phoneNumber: "555-1234",
    dateOfBirth: "1990-01-01",
  };

  return (
    <View style={styles.layout_container}>
      <ScrollView style={styles.layout_scrollView}>
        {/* Profile Header */}
        <Surface style={styles.profile_header} elevation={1}>
          <View style={styles.profile_headerContent}>
            <MaterialCommunityIcons 
              name="account-circle" 
              size={64} 
              color={theme.colors.primary} 
            />
            <View style={styles.profile_headerText}>
              <Text style={[styles.text_heading2, styles.profile_name]}>
                {personalInfo.name}
              </Text>
              <Text style={styles.profile_email}>
                {personalInfo.email}
              </Text>
            </View>
          </View>
          
          <View style={styles.profile_subscriptionStatus}>
            <Text style={[styles.profile_statusLabel, theme.fonts.bodyMedium]}>
              Subscription Status:
            </Text>
            <View style={[styles.profile_statusBadge, { backgroundColor: theme.colors.secondary }]}>
              <Text style={[styles.profile_statusText, { color: theme.colors.onSecondary }]}>
                Active
              </Text>
            </View>
          </View>
        </Surface>

        {/* Settings List */}
        <List.Section>
          <List.Item
            title="Edit Personal Information"
            onPress={() => setIsPersonalInfoModalVisible(true)}
            left={() => <List.Icon icon="account-edit" />}
            right={() => <List.Icon icon="chevron-right" />}
          />
          <List.Item
            title="Notification Preferences"
            onPress={() => setIsNotificationsModalVisible(true)}
            left={() => <List.Icon icon="bell-outline" />}
            right={() => <List.Icon icon="chevron-right" />}
          />
          <List.Item
            title="Language & Region"
            onPress={() => setIsLanguageModalVisible(true)}
            left={() => <List.Icon icon="earth" />}
            right={() => <List.Icon icon="chevron-right" />}
          />
          <List.Item
            title="Help Center"
            onPress={() => setIsHelpModalVisible(true)}
            left={() => <List.Icon icon="help-circle-outline" />}
            right={() => <List.Icon icon="chevron-right" />}
          />
          <List.Item
            title="Privacy Policy & Terms of Service"
            onPress={() => setIsLegalModalVisible(true)}
            left={() => <List.Icon icon="file-document-outline" />}
            right={() => <List.Icon icon="chevron-right" />}
          />
        </List.Section>

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

      {/* Modals */}
      <Portal>
        {/* Personal Info Modal */}
        <Modal
          visible={isPersonalInfoModalVisible}
          onDismiss={() => setIsPersonalInfoModalVisible(false)}
          contentContainerStyle={styles.modal_container}
        >
          <EditPersonalInfoForm 
            info={personalInfo}
            onSave={handleSavePersonalInfo}
          />
        </Modal>

        {/* Notifications Modal */}
        <Modal
          visible={isNotificationsModalVisible}
          onDismiss={() => setIsNotificationsModalVisible(false)}
          contentContainerStyle={styles.modal_container}
        >
          <NotificationPreferences onToggle={handleNotificationToggle} />
        </Modal>

        {/* Language & Region Modal */}
        <Modal
          visible={isLanguageModalVisible}
          onDismiss={() => setIsLanguageModalVisible(false)}
          contentContainerStyle={styles.modal_container}
        >
          <LanguageRegionSettings onLanguageChange={handleLanguageChange} />
        </Modal>

        {/* Help Center Modal */}
        <Modal
          visible={isHelpModalVisible}
          onDismiss={() => setIsHelpModalVisible(false)}
          contentContainerStyle={styles.modal_container}
        >
          <HelpCenterCard onContactSupport={handleContactSupport} />
        </Modal>

        {/* Legal Modal */}
        <Modal
          visible={isLegalModalVisible}
          onDismiss={() => setIsLegalModalVisible(false)}
          contentContainerStyle={styles.modal_container}
        >
          <LegalLinks />
        </Modal>

        {/* Sign Out Dialog */}
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

      {/* Error Snackbar */}
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
