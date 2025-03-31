import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Surface, List, Switch, Divider, ActivityIndicator, Text } from 'react-native-paper';
import { CARD_ELEVATION } from '../config/theme';
import { useAppTheme } from '../hooks/useAppTheme';
import styles from '../config/NotificationPreferences.styles';
import { useAuth } from '../context/auth';
import { UserService } from '../services/user.service';
import { UserSettings } from '../models/user.model';

// Type for setting definition
interface NotificationSettingDefinition {
  id: keyof UserSettings['notifications'];
  label: string;
  description: string;
}

// Definitions list
const settingDefinitions: NotificationSettingDefinition[] = [
  {
    id: 'reminders', // Added id field
    label: 'Daily Reminders',
    description: 'Get notifications for your daily exercise', // Updated description
    // value: 'reminders', // Removed incorrect value field
  },
  {
    id: 'progress',
    label: 'Progress Updates',
    description: 'Receive updates about your mental wellness journey',
  },
  {
    id: 'tips',
    label: 'Wellness Tips',
    description: 'Get helpful tips and insights for better mental health',
  },
  {
    id: 'community',
    label: 'Community Updates',
    description: 'Stay informed about community events and activities',
  },
];

// Default settings
const defaultNotificationSettings: UserSettings['notifications'] = {
  reminders: true,
  progress: true,
  tips: true,
  community: false,
};

export const NotificationPreferences: React.FC = () => {
  const theme = useAppTheme();
  const { user } = useAuth();
  const userId = user?.uid;

  // State
  const [settings, setSettings] = useState<UserSettings['notifications'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingUpdates, setPendingUpdates] = useState<Set<string>>(new Set());

  // Fetch settings
  useEffect(() => {
    const fetchSettings = async () => {
      if (!userId) {
        setIsLoading(false);
        setError("User not found");
        setSettings(defaultNotificationSettings);
        return;
      }

      try {
        const userSettings = await UserService.getUserSettings(userId);
        setSettings(userSettings?.notifications || defaultNotificationSettings);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching settings:", err);
        setError(err.message || "Failed to load settings");
        setSettings(defaultNotificationSettings);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [userId]);

  // Toggle handler
  const handleToggle = async (settingId: keyof UserSettings['notifications']) => {
    if (!userId || !settings) return;

    // Add to pending set
    setPendingUpdates(prev => new Set(prev).add(settingId));
    
    // Update local state optimistically
    const newValue = !settings[settingId];
    setSettings({...settings, [settingId]: newValue});

    try {
      // Update in Firestore using dot notation
      const updateData = {
        [`notifications.${settingId}`]: newValue
      };
      await UserService.updateUserSettings(userId, updateData);
      setError(null);
    } catch (err: any) {
      // Revert on error
      console.error("Failed to update setting:", err);
      setError(err.message || "Failed to save setting");
      setSettings({...settings, [settingId]: !newValue});
    } finally {
      // Remove from pending
      setPendingUpdates(prev => {
        const next = new Set(prev);
        next.delete(settingId);
        return next;
      });
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <Surface style={[styles.container, { padding: 16 }]} elevation={CARD_ELEVATION.DEFAULT}>
        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 12 }}>Loading preferences...</Text>
        </View>
      </Surface>
    );
  }

  // Error state with no settings
  if (error && !settings) {
    return (
      <Surface style={[styles.container, { padding: 16 }]} elevation={CARD_ELEVATION.DEFAULT}>
        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <Text style={{ color: theme.colors.error }}>{error}</Text>
        </View>
      </Surface>
    );
  }

  return (
    <Surface style={styles.container} elevation={CARD_ELEVATION.DEFAULT}>
      {error && (
        <Text style={{ color: theme.colors.error, textAlign: 'center', padding: 12 }}>
          {error}
        </Text>
      )}
      
      <List.Section>
        {settingDefinitions.map((setting, index) => (
          <React.Fragment key={setting.id}>
            <List.Item
              title={setting.label}
              description={setting.description}
              titleStyle={styles.itemTitle}
              descriptionStyle={styles.itemDescription}
              style={styles.listItem}
              right={() => (
                <Switch
                  value={settings?.[setting.id] ?? false}
                  onValueChange={() => handleToggle(setting.id)}
                  disabled={pendingUpdates.has(setting.id)}
                />
              )}
            />
            {index < settingDefinitions.length - 1 && (
              <Divider style={styles.divider} />
            )}
          </React.Fragment>
        ))}
      </List.Section>
    </Surface>
  );
};

export default NotificationPreferences;
