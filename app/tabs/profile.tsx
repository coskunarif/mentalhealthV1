import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Button, Surface, Snackbar, Avatar, Divider, List, Dialog, Portal } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../config/styles';
import { theme } from '../config/theme';

interface ProfileListItemProps {
  title: string;
  icon: string;
  onPress: () => void;
}

const ProfileListItem = ({ title, icon, onPress }: ProfileListItemProps) => (
  <List.Item
    title={title}
    left={props => <List.Icon {...props} icon={icon} />}
    right={props => <List.Icon {...props} icon="chevron-right" />}
    onPress={onPress}
    titleStyle={theme.fonts.bodyLarge}
  />
);

export default function ProfileScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);

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

  return (
    <View style={styles.layout_container}>
      {/* Header Section */}
      <Surface style={styles.profile_header} elevation={2}>
        <View style={styles.profile_headerContent}>
          <Avatar.Text 
            size={80} 
            label={user?.displayName?.[0]?.toUpperCase() || 'U'}
            labelStyle={theme.fonts.titleLarge}
          />
          <View style={styles.profile_headerText}>
            <Text style={[styles.profile_name, theme.fonts.headlineMedium]}>
              {user?.displayName || 'User'}
            </Text>
            <Text style={[styles.profile_email, theme.fonts.bodyMedium]}>
              {user?.email}
            </Text>
          </View>
        </View>
      </Surface>

      <ScrollView style={styles.layout_scrollView}>
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

        {/* Settings Sections */}
        <Surface style={styles.profile_mainSection} elevation={1}>
          <List.Section>
            <List.Subheader style={theme.fonts.titleMedium}>
              Account Settings
            </List.Subheader>
            
            <ProfileListItem
              title="Personal Information"
              icon="account"
              onPress={() => router.push('/account/personal-info')}
            />
            
            <ProfileListItem
              title="Notification Preferences"
              icon="bell"
              onPress={() => router.push('/account/notifications')}
            />
            
            <ProfileListItem
              title="Language & Region"
              icon="translate"
              onPress={() => router.push('/account/language')}
            />
            
            <Divider />
            
            <List.Subheader style={theme.fonts.titleMedium}>
              Support & Legal
            </List.Subheader>
            
            <ProfileListItem
              title="Help Center"
              icon="help-circle"
              onPress={() => router.push('/support/help')}
            />
            
            <ProfileListItem
              title="Privacy Policy"
              icon="shield-account"
              onPress={() => router.push('/legal/privacy')}
            />
            
            <ProfileListItem
              title="Terms of Service"
              icon="file-document"
              onPress={() => router.push('/legal/terms')}
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
