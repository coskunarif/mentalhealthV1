import React from 'react';
import { NotificationPreferences } from './NotificationPreferences';
import { ScreenLayout } from './ScreenLayout';

export default function NotificationPreferencesScreen() {
  const handleToggle = async (settingId: string, value: boolean) => {
    try {
      console.log('Updating notification setting:', settingId, value);
    } catch (error: any) {
      console.error('Failed to update notification settings:', error);
    }
  };

  return (
    <ScreenLayout
      title="Notification Preferences"
      subtitle="Manage your alerts and reminders for a personalized experience."
    >
      <NotificationPreferences onToggle={handleToggle} />
    </ScreenLayout>
  );
}
