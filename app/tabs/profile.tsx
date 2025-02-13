import React, { useState } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Text, Button, Surface, Snackbar, Avatar, Divider, List } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../config/styles';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
          />
          <View style={styles.profile_headerText}>
            <Text style={styles.profile_name}>
              {user?.displayName || 'User'}
            </Text>
            <Text style={styles.profile_email}>
              {user?.email}
            </Text>
          </View>
        </View>
      </Surface>

      <ScrollView style={styles.layout_scrollView}>
        {/* Subscription Section */}
        <Surface style={styles.profile_mainSection} elevation={1}>
          <View style={styles.profile_sectionHeader}>
            <MaterialCommunityIcons name="crown" size={24} color="#FFD700" />
            <Text style={styles.profile_sectionTitle}>Premium Subscription</Text>
          </View>
          <View style={styles.profile_subscriptionStatus}>
            <Text style={styles.profile_statusLabel}>Status:</Text>
            <View style={styles.profile_statusBadge}>
              <Text style={styles.profile_statusText}>Active</Text>
            </View>
          </View>
          <Text style={styles.profile_subscriptionDetails}>
            Next billing date: March 15, 2024
          </Text>
          <Button
            mode="contained"
            onPress={() => router.push('/subscription/manage')}
            style={styles.profile_actionButton}
          >
            Manage Subscription
          </Button>
        </Surface>

        {/* Settings Sections */}
        <Surface style={styles.profile_mainSection} elevation={1}>
          <List.Section>
            <List.Subheader>Account Settings</List.Subheader>
            
            <List.Item
              title="Personal Information"
              left={props => <List.Icon {...props} icon="account" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => router.push('/account/personal-info')}
            />
            
            <List.Item
              title="Notification Preferences"
              left={props => <List.Icon {...props} icon="bell" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => router.push('/account/notifications')}
            />
            
            <List.Item
              title="Language & Region"
              left={props => <List.Icon {...props} icon="translate" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => router.push('/account/language')}
            />
            
            <Divider />
            
            <List.Subheader>Support & Legal</List.Subheader>
            
            <List.Item
              title="Help Center"
              left={props => <List.Icon {...props} icon="help-circle" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => router.push('/support/help')}
            />
            
            <List.Item
              title="Privacy Policy"
              left={props => <List.Icon {...props} icon="shield-account" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => router.push('/legal/privacy')}
            />
            
            <List.Item
              title="Terms of Service"
              left={props => <List.Icon {...props} icon="file-document" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => router.push('/legal/terms')}
            />
          </List.Section>
        </Surface>

        {/* Sign Out Button */}
        <Surface style={[styles.profile_mainSection, styles.profile_signOutSection]} elevation={1}>
          <Button
            mode="outlined"
            onPress={handleSignOut}
            loading={isLoading}
            disabled={isLoading}
            icon="logout"
            style={styles.profile_signOutButton}
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
