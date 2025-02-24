import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Button, Surface, Snackbar, Dialog, Portal, List } from 'react-native-paper';
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
        {/* Profile Header with Stats */}
        <Surface style={styles.profile_header} elevation={2}>
          <View style={styles.profile_headerContent}>
            <MaterialCommunityIcons 
              name="account-circle" 
              size={80} 
              color={theme.colors.primary} 
            />
            <View style={[styles.profile_headerText, { marginLeft: theme.spacing.medium }]}>
              <Text style={[styles.text_heading2, styles.profile_name]}>
                {personalInfo.name}
              </Text>
              <Text style={styles.profile_email}>
                {personalInfo.email}
              </Text>
            </View>
          </View>

          {/* Mental Health Stats */}
          <View style={[styles.profile_statsContainer, { justifyContent: 'space-around' }]}>
            <View style={styles.profile_statItem}>
              <Text style={styles.profile_statNumber}>12</Text>
              <Text style={styles.profile_statLabel}>Sessions</Text>
            </View>
            <View style={styles.profile_statItem}>
              <Text style={styles.profile_statNumber}>5</Text>
              <Text style={styles.profile_statLabel}>Streak</Text>
            </View>
            <View style={styles.profile_statItem}>
              <Text style={styles.profile_statNumber}>8</Text>
              <Text style={styles.profile_statLabel}>Surveys</Text>
            </View>
          </View>

          {/* Subscription Status */}
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

        {/* Account Information */}
        <Surface style={styles.profile_mainSection} elevation={1}>
          <Text style={styles.profile_sectionTitle}>Account Information</Text>
          <List.Section>
            <List.Item
              title="Edit Personal Information"
              onPress={() => router.push('/components/EditPersonalInfoScreen')}
              left={() => <List.Icon icon="account-edit" />}
              right={() => <List.Icon icon="chevron-right" />}
            />
            <List.Item
              title="Manage Subscription"
              onPress={() => router.push('/components/ManageSubscriptionScreen')}
              left={() => <List.Icon icon="credit-card" />}
              right={() => <List.Icon icon="chevron-right" />}
            />
          </List.Section>
        </Surface>

        {/* Options */}
        <Surface style={styles.profile_mainSection} elevation={1}>
          <Text style={styles.profile_sectionTitle}>Options</Text>
          <List.Section>
            <List.Item
              title="Language & Region"
              onPress={() => router.push('/components/LanguageRegionScreen')}
              left={() => <List.Icon icon="earth" />}
              right={() => <List.Icon icon="chevron-right" />}
            />
            <List.Item
              title="Notification Preferences"
              onPress={() => router.push('/components/NotificationPreferencesScreen')}
              left={() => <List.Icon icon="bell-outline" />}
              right={() => <List.Icon icon="chevron-right" />}
            />
            <List.Item
              title="Help Center"
              onPress={() => router.push('/components/HelpCenterScreen')}
              left={() => <List.Icon icon="help-circle-outline" />}
              right={() => <List.Icon icon="chevron-right" />}
            />
            <List.Item
              title="Privacy Policy & Terms of Service"
              onPress={() => router.push('/components/LegalScreen')}
              left={() => <List.Icon icon="file-document-outline" />}
              right={() => <List.Icon icon="chevron-right" />}
            />
          </List.Section>
        </Surface>

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
