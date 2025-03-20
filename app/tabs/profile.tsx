import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Button, Surface, Snackbar, Dialog, List } from 'react-native-paper';
import type { PersonalInformation } from '../types/personalInformation';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { layoutStyles, miscStyles, typographyStyles } from '../config';
import { theme } from '../config/theme';
import { UserService } from '../services/user.service';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  const router = useRouter();

  // Simulated user stats
  const [userStats, setUserStats] = useState({
    sessions: 12,
    streak: 5,
    surveys: 8,
  });
  
  // Simulated subscription status
  const [subscriptionStatus, setSubscriptionStatus] = useState('Active');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };
    fetchUserData();
  }, [user?.uid]);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const stats = await UserService.getUserProfile(user?.uid);
        setUserStats({
          sessions: stats?.sessions || 0,
          streak: stats?.streak || 0,
          surveys: stats?.surveys || 0,
        });
      } catch (error) {
        console.error('Error fetching user stats:', error);
      }
    };
    if (user?.uid) {
      fetchUserStats();
    }
  }, [user?.uid]);

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

  const personalInfo: PersonalInformation = {
    name: user?.displayName || "User Name",
    email: user?.email || "user@example.com",
    phoneNumber: "555-1234",
    dateOfBirth: "1990-01-01",
  };

  return (
    <View style={layoutStyles.layout_container}>
      <ScrollView style={layoutStyles.layout_scrollView}>
        {/* Profile Header with Stats */}
<Surface 
          style={[miscStyles.profile_header, { elevation: 2, marginHorizontal: theme.spacing.medium }]} 
          elevation={2}
        >
          <View style={miscStyles.profile_headerContent}>
            <View style={miscStyles.profile_avatarContainer}>
              <MaterialCommunityIcons 
                name="account-circle"
                size={40}
                color={theme.colors.primary}
              />
            </View>
            <View style={miscStyles.profile_headerText}>
              <Text style={[typographyStyles.text_heading2, miscStyles.profile_name]}>
                {personalInfo.name}
              </Text>
              <Text style={miscStyles.profile_email}>
                {personalInfo.email}
              </Text>
            </View>
          </View>

          {/* Mental Health Stats */}
          <View style={miscStyles.profile_statsContainer}>
            <View style={miscStyles.profile_statItem}>
              <Text style={miscStyles.profile_statNumber}>{userStats.sessions}</Text>
              <Text style={miscStyles.profile_statLabel}>Sessions</Text>
            </View>
            <View style={miscStyles.profile_statItem}>
              <Text style={miscStyles.profile_statNumber}>{userStats.streak}</Text>
              <Text style={miscStyles.profile_statLabel}>Streak</Text>
            </View>
            <View style={miscStyles.profile_statItem}>
              <Text style={miscStyles.profile_statNumber}>{userStats.surveys}</Text>
              <Text style={miscStyles.profile_statLabel}>Surveys</Text>
            </View>
          </View>

          {/* Subscription Status */}
<View style={miscStyles.profile_subscriptionStatus}>
  <Text style={[miscStyles.profile_statusLabel, theme.fonts.bodyMedium]}>
    Subscription Status:
  </Text>
  <View
    style={[
      miscStyles.profile_statusBadge,
      {
        backgroundColor:
          subscriptionStatus === 'Active'
            ? theme.colors.primaryContainer
            : theme.colors.surfaceVariant,
      },
    ]}
  >
    <Text
      style={[
        miscStyles.profile_statusText,
        {
          color:
            subscriptionStatus === 'Active'
              ? theme.colors.onPrimaryContainer
              : theme.colors.onSurfaceVariant,
        },
      ]}
    >
      {subscriptionStatus}
    </Text>
  </View>
</View>
        </Surface>

        {/* Account Information */}
        <Surface style={miscStyles.profile_sectionCard} elevation={2}>
          <Text style={miscStyles.profile_sectionTitle}>Account Information</Text>
          <List.Section>
            <List.Item
              title="Edit Personal Information"
              onPress={() => router.push('/components/EditPersonalInfoScreen')}
              left={() => <List.Icon icon="account-edit" color={theme.colors.primary} />}
              right={() => <List.Icon icon="chevron-right" color={theme.colors.onSurfaceVariant} />}
              style={miscStyles.list_item}
              titleStyle={{ ...theme.fonts.bodyLarge }}
              rippleColor={theme.withOpacity(theme.colors.primary, 0.1)}
            />
            <List.Item
              title="Manage Subscription"
              onPress={() => router.push('/components/ManageSubscriptionScreen')}
              left={() => <List.Icon icon="credit-card" color={theme.colors.primary} />}
              right={() => <List.Icon icon="chevron-right" color={theme.colors.onSurfaceVariant} />}
              style={miscStyles.list_item}
              titleStyle={{ ...theme.fonts.bodyLarge }}
              rippleColor={theme.withOpacity(theme.colors.primary, 0.1)}
            />
          </List.Section>
        </Surface>

        {/* Options */}
        <Surface style={miscStyles.profile_sectionCard} elevation={2}>
          <Text style={miscStyles.profile_sectionTitle}>Options</Text>
          <List.Section>
            <List.Item
              title="Language & Region"
              onPress={() => router.push('/components/LanguageRegionScreen')}
              left={() => <List.Icon icon="earth" color={theme.colors.primary} />}
              right={() => <List.Icon icon="chevron-right" color={theme.colors.onSurfaceVariant} />}
              style={miscStyles.list_item}
              titleStyle={{ ...theme.fonts.bodyLarge }}
              rippleColor={theme.withOpacity(theme.colors.primary, 0.1)}
            />
            <List.Item
              title="Notification Preferences"
              onPress={() => router.push('/components/NotificationPreferencesScreen')}
              left={() => <List.Icon icon="bell-outline" color={theme.colors.primary} />}
              right={() => <List.Icon icon="chevron-right" color={theme.colors.onSurfaceVariant} />}
              style={miscStyles.list_item}
              titleStyle={{ ...theme.fonts.bodyLarge }}
              rippleColor={theme.withOpacity(theme.colors.primary, 0.1)}
            />
            <List.Item
              title="Help Center"
              onPress={() => router.push('/components/HelpCenterScreen')}
              left={() => <List.Icon icon="help-circle-outline" color={theme.colors.primary} />}
              right={() => <List.Icon icon="chevron-right" color={theme.colors.onSurfaceVariant} />}
              style={miscStyles.list_item}
              titleStyle={{ ...theme.fonts.bodyLarge }}
              rippleColor={theme.withOpacity(theme.colors.primary, 0.1)}
            />
            <List.Item
              title="Privacy Policy & Terms of Service"
              onPress={() => router.push('/components/LegalScreen')}
              left={() => <List.Icon icon="file-document-outline" color={theme.colors.primary} />}
              right={() => <List.Icon icon="chevron-right" color={theme.colors.onSurfaceVariant} />}
              style={miscStyles.list_item}
              titleStyle={{ ...theme.fonts.bodyLarge }}
              rippleColor={theme.withOpacity(theme.colors.primary, 0.1)}
            />
          </List.Section>
        </Surface>

        {/* Sign Out Button */}
        <Surface style={miscStyles.profile_sectionCard} elevation={2}>
          <Button
            mode="outlined"
            onPress={() => setShowSignOutDialog(true)}
            loading={isLoading}
            disabled={isLoading}
            icon="logout"
            style={{ marginTop: theme.spacing.small }}
            labelStyle={theme.fonts.labelLarge}
          >
            {isLoading ? 'Signing Out...' : 'Sign Out'}
          </Button>
        </Surface>
      </ScrollView>

      {/* Sign Out Dialog */}
      <Dialog 
        visible={showSignOutDialog} 
        onDismiss={() => setShowSignOutDialog(false)}
        style={{ 
          borderRadius: 28, // Material Design 3 dialog radius
          backgroundColor: theme.colors.surface,
        }}
      >
        <Dialog.Title style={[theme.fonts.headlineSmall, { color: theme.colors.onSurface }]}>
          Sign Out
        </Dialog.Title>
        <Dialog.Content>
          <Text style={[theme.fonts.bodyMedium, { color: theme.colors.onSurfaceVariant }]}>
            Are you sure you want to sign out?
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button 
            onPress={() => setShowSignOutDialog(false)} 
            textColor={theme.colors.primary}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={() => {
              setShowSignOutDialog(false);
              handleSignOut();
            }}
            style={{ borderRadius: theme.componentSizes.buttonBorderRadius }}
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
