import React from 'react';
import { View, ScrollView } from 'react-native';
import { IconButton, Text, Surface } from 'react-native-paper';
import { NotificationPreferences } from './NotificationPreferences';
import { useRouter } from 'expo-router';
import styles from '../config/styles';

export default function NotificationPreferencesScreen() {
  const router = useRouter();

  const handleToggle = async (settingId: string, value: boolean) => {
    try {
      console.log('Updating notification setting:', settingId, value);
    } catch (error: any) {
      console.error('Failed to update notification settings:', error);
    }
  };

  return (
    <View style={styles.layout_container}>
      <Surface style={styles.header_surface} elevation={2}>
        <IconButton icon="arrow-left" size={24} onPress={() => router.back()} />
        <Text style={styles.text_heading2}>Notification Preferences</Text>
      </Surface>
      <ScrollView contentContainerStyle={styles.layout_content}>
        <Text style={styles.text_subtitle}>
          Manage your alerts and reminders for a personalized experience.
        </Text>
        <NotificationPreferences onToggle={handleToggle} />
      </ScrollView>
    </View>
  );
}
