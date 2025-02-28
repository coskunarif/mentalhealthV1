import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { NotificationPreferences } from './NotificationPreferences';
import { useRouter } from 'expo-router';
import { layoutStyles, typographyStyles } from '../config';
import { CustomAppBar } from './CustomAppBar';

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
    <View style={layoutStyles.layout_container}>
      <CustomAppBar title="Notification Preferences" />
      <ScrollView contentContainerStyle={layoutStyles.layout_content}>
        <Text style={typographyStyles.text_subtitle}>
          Manage your alerts and reminders for a personalized experience.
        </Text>
        <NotificationPreferences onToggle={handleToggle} />
      </ScrollView>
    </View>
  );
}
