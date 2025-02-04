import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Button, Surface } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/auth';
import { styles } from '../config/styles';

export default function ProfileScreen() {
  const router = useRouter();
  const { signOut } = useAuth();

  return (
    <View style={styles.layout.container}>
      <View style={styles.layout.header}>
        <Text style={styles.text.heading1}>Profile</Text>
        <Text style={[styles.text.body, { marginTop: 8 }]}>
          Manage your account settings
        </Text>
      </View>

      <ScrollView
        style={styles.layout.scrollView}
        contentContainerStyle={styles.layout.content}
      >
        <Surface
          elevation={1}
          style={[styles.component.card.elevated, { marginBottom: 24 }]}
        >
          <Text style={styles.text.heading2}>Account</Text>
          <Text style={[styles.text.body, { marginTop: 8 }]}>
            Update your account information
          </Text>
          <Button
            mode="outlined"
            onPress={() => router.push('/account/settings')}
            style={[styles.button.secondary, { marginTop: 16 }]}
          >
            Account Settings
          </Button>
        </Surface>

        <Surface
          elevation={1}
          style={[styles.component.card.elevated, { marginBottom: 24 }]}
        >
          <Text style={styles.text.heading2}>Notifications</Text>
          <Text style={[styles.text.body, { marginTop: 8 }]}>
            Manage your notification preferences
          </Text>
          <Button
            mode="outlined"
            onPress={() => router.push('/notifications/settings')}
            style={[styles.button.secondary, { marginTop: 16 }]}
          >
            Notification Settings
          </Button>
        </Surface>

        <Surface
          elevation={1}
          style={styles.component.card.elevated}
        >
          <Text style={styles.text.heading2}>Sign Out</Text>
          <Text style={[styles.text.body, { marginTop: 8 }]}>
            Sign out of your account
          </Text>
          <Button
            mode="outlined"
            onPress={signOut}
            style={[styles.button.secondary, { marginTop: 16 }]}
          >
            Sign Out
          </Button>
        </Surface>
      </ScrollView>
    </View>
  );
}
