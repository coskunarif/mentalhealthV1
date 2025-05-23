import React, { useState, useEffect, useCallback } from 'react'; // Added useCallback
import { View, ScrollView, RefreshControl } from 'react-native'; // Added RefreshControl
import { Text, Button, Surface, Snackbar, Dialog, List, ActivityIndicator } from 'react-native-paper'; // Added ActivityIndicator
import type { PersonalInformation } from '../types/personalInformation';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { layoutStyles, miscStyles, typographyStyles } from '../config';
import { useAppTheme } from '../hooks/useAppTheme'; // Import the theme hook
// Keep UserService import for getSubscriptionStatus
import { UserService } from '../services/user.service'; 
import { UserStats } from '../models/user-stats.model'; // Correct import path
import { Timestamp } from 'firebase/firestore'; // Import Timestamp
// Import the cloud functions - remove ensureUserDocument
import { getUserStats } from '../services/firebase-functions';
import { auth } from '../lib/firebase'; // Import auth

export default function ProfileScreen() {
  const theme = useAppTheme(); // Get the current theme using the hook
  const { user, signOut, loading: authLoading } = useAuth(); // Get loading state from useAuth
  const [isSignOutLoading, setIsSignOutLoading] = useState(false); // Renamed for clarity
  const [error, setError] = useState<string | null>(null);
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  const router = useRouter();

  // State for fetched data
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [subscription, setSubscription] = useState<{ plan: string; price: string } | null>(null);

  // Loading and Refreshing states
  const [statsLoading, setStatsLoading] = useState(true);
  const [subLoading, setSubLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Combined loading state
  const isLoading = statsLoading || subLoading;

  // Fetching functions wrapped in useCallback
  const fetchUserStats = useCallback(async () => {
    if (!user?.uid) return;
    setStatsLoading(true);
    setError(null); // Clear previous errors at the start
    
    try {
      // REMOVED redundant ensureUserDocument Cloud Function call
      // The user document should be ensured by the logic in AuthContext

      // Call the getUserStats function directly
      console.log('[DEBUG] Calling getUserStats Cloud Function...');
      const statsResult = await getUserStats(); // Call the imported function
      console.log('[DEBUG] getUserStats result success:', statsResult.data.success);

      if (statsResult.data.success) {
        // Ensure the stats object is not null/undefined before setting
        setUserStats(statsResult.data.stats || { 
          profile: { displayName: user.displayName || '', photoURL: user.photoURL || '', createdAt: Timestamp.now(), streak: 0 },
          activities: { exercisesCompleted: 0, surveysCompleted: 0, recentActivities: [] },
          mood: { recentMoods: [] }
        }); 
      } else {
        // Throw error if getUserStats indicates failure
        throw new Error((statsResult.data as any)?.message || 'Failed to get user stats from Cloud Function');
      }
    } catch (error: any) { // Catch errors from getUserStats
      console.error('Error fetching user stats:', error); // Updated error message context
      setError(error.message || 'Failed to load user data');
      
      // Set minimal fallback stats
      setUserStats({
        profile: { 
          displayName: user?.displayName || '', 
          photoURL: user?.photoURL || '', 
          createdAt: Timestamp.now(), 
           streak: 0 
        },
        activities: { exercisesCompleted: 0, surveysCompleted: 0, recentActivities: [] },
        mood: { recentMoods: [] }
      });
    } finally {
      setStatsLoading(false);
    }
  }, [user?.uid, user?.displayName, user?.photoURL]); // Dependencies remain the same

  // fetchSubscriptionStatus might need adjustment if UserService is fully removed
  const fetchSubscriptionStatus = useCallback(async () => {
    if (!user?.uid) return;
    setSubLoading(true);
    try {
      // Assuming getSubscriptionStatus remains in UserService for now
      // If moved to cloud functions, update this call similarly
      const subStatus = await UserService.getSubscriptionStatus(user.uid); 
      setSubscription(subStatus);
    } catch (fetchError: any) {
      console.error('Error fetching subscription status:', fetchError);
      setError(fetchError.message || 'Failed to load subscription details.');
      setSubscription({ plan: 'Error', price: '' }); // Set error state
    } finally {
      setSubLoading(false);
    }
  }, [user?.uid]);

  // Combined fetch function
  const fetchData = useCallback(async () => {
    setError(null);
    // Add this check before making any calls
    if (!user?.uid || !auth.currentUser) {
      console.log('[DEBUG] Auth not ready yet, deferring data fetch');
      setStatsLoading(false);
      setSubLoading(false);
      return;
    }
    
    // Check token validity first
    try {
      await auth.currentUser.getIdToken(true); // Force token refresh
      console.log('[DEBUG] Token refreshed successfully');
      await Promise.all([fetchUserStats(), fetchSubscriptionStatus()]);
    } catch (error) {
      console.error('[DEBUG] Token refresh error:', error);
      setError('Authentication error. Please try signing in again.');
    }
  }, [fetchUserStats, fetchSubscriptionStatus, user?.uid]); // Added user?.uid dependency

  // Initial data fetch
  useEffect(() => {
    if (user?.uid) {
      fetchData();
    } else {
      // Handle case where user is not logged in or uid is not yet available
      setStatsLoading(false);
      setSubLoading(false);
      // Set default object matching the UserStats structure
      setUserStats({
        profile: { displayName: '', photoURL: '', createdAt: Timestamp.now(), streak: 0 },
        activities: { exercisesCompleted: 0, surveysCompleted: 0, recentActivities: [] },
        mood: { recentMoods: [] },
      });
      setSubscription({ plan: 'N/A', price: '' });
    }
  }, [user?.uid, fetchData]);


  // Refresh handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [fetchData]);


  // --- Removed duplicated useEffect hooks and handleSignOut body ---

  const handleSignOut = async () => {
    setIsSignOutLoading(true); // Use specific loading state
    setError(null);
    try {
      if (!signOut) throw new Error('Sign out function not available');
      await signOut();
      // No need to manually navigate, AuthProvider likely handles redirect
      // router.replace("/auth/sign-in");
    } catch (err: any) {
      setError(err?.message || "Failed to sign out. Please try again.");
    } finally {
      setIsSignOutLoading(false); // Use specific loading state
    }
  };

  const personalInfo: PersonalInformation = {
    name: user?.displayName || "User Name",
    email: user?.email || "user@example.com",
    phoneNumber: "555-1234",
    dateOfBirth: "1990-01-01",
  };

  // Conditional rendering based on authLoading OR initial data loading
  if (authLoading || isLoading) {
    return (
      <View style={[layoutStyles.layout_container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Loading profile...</Text>
      </View>
    );
  }

  // Handle case where user is null after loading (shouldn't happen if AuthProvider redirects)
  if (!user) {
     return (
      <View style={[layoutStyles.layout_container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Please sign in.</Text>
        <Button onPress={() => router.replace('/auth/sign-in')}>Sign In</Button>
      </View>
     );
  }

  return (
    <View style={layoutStyles.layout_container}>
      <ScrollView
        style={layoutStyles.layout_scrollView}
        refreshControl={ // Add RefreshControl
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
  {/* Exercises Completed */}
  <View style={miscStyles.profile_statItem}>
    <Text style={miscStyles.profile_statNumber}>{userStats?.activities?.exercisesCompleted ?? '...'}</Text>
              <Text style={miscStyles.profile_statLabel}>Exercises</Text>
            </View>
            {/* Streak */}
            <View style={miscStyles.profile_statItem}>
              <Text style={miscStyles.profile_statNumber}>{userStats?.profile?.streak ?? '...'}</Text>
              <Text style={miscStyles.profile_statLabel}>Streak</Text>
            </View>
            {/* Surveys Completed */}
            <View style={miscStyles.profile_statItem}>
              <Text style={miscStyles.profile_statNumber}>{userStats?.activities?.surveysCompleted ?? '...'}</Text>
    <Text style={miscStyles.profile_statLabel}>Surveys</Text>
  </View>
</View>

          {/* Subscription Status */}
<View style={miscStyles.profile_subscriptionStatus}>
  <Text style={[miscStyles.profile_statusLabel, theme.fonts.bodyMedium]}>
    Subscription:
  </Text>
  <View
    style={[
      miscStyles.profile_statusBadge,
      {
        backgroundColor:
          subscription?.plan && subscription.plan !== 'No active plan' && subscription.plan !== 'Error' && subscription.plan !== 'N/A'
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
            subscription?.plan && subscription.plan !== 'No active plan' && subscription.plan !== 'Error' && subscription.plan !== 'N/A'
              ? theme.colors.onPrimaryContainer
              : theme.colors.onSurfaceVariant,
        },
      ]}
    >
      {subscription?.plan ?? 'Loading...'} {/* Display fetched plan */}
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
            loading={isSignOutLoading} // Use specific loading state
            disabled={isSignOutLoading} // Use specific loading state
            icon="logout"
            style={{ marginTop: theme.spacing.small }}
            labelStyle={theme.fonts.labelLarge}
          >
            {isSignOutLoading ? 'Signing Out...' : 'Sign Out'}
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
