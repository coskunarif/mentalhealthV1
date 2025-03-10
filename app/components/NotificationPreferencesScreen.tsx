import React from 'react';
import { View, ScrollView } from 'react-native';
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
      <CustomAppBar 
        title="Notification Preferences" 
        subtitle="Manage your alerts and reminders for a personalized experience."
      />
      <ScrollView contentContainerStyle={layoutStyles.layout_content}>
        <NotificationPreferences onToggle={handleToggle} />
      </ScrollView>
    </View>
  );
}
