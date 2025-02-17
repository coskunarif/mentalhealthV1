import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Surface, List, Switch, Divider } from 'react-native-paper';
import { theme } from '../config/theme';

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
}

const defaultSettings: NotificationSetting[] = [
  {
    id: 'reminders',
    label: 'Daily Reminders',
    description: 'Get notifications for your daily meditation practice',
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

interface NotificationPreferencesProps {
  onToggle?: (settingId: string, value: boolean) => Promise<void>;
}

export const NotificationPreferences: React.FC<NotificationPreferencesProps> = ({ onToggle }) => {
  const [settings, setSettings] = useState<Record<string, boolean>>({
    reminders: true,
    progress: true,
    tips: true,
    community: false,
  });
  const [isSubmitting, setIsSubmitting] = useState<Record<string, boolean>>({});

  const handleToggle = async (settingId: string) => {
    const newValue = !settings[settingId];
    
    setIsSubmitting(prev => ({ ...prev, [settingId]: true }));
    try {
      if (onToggle) {
        await onToggle(settingId, newValue);
      }
      setSettings(prev => ({ ...prev, [settingId]: newValue }));
    } catch (error) {
      // Handle error if needed
    } finally {
      setIsSubmitting(prev => ({ ...prev, [settingId]: false }));
    }
  };

  return (
    <Surface style={styles.container} elevation={1}>
      <List.Section>
        {defaultSettings.map(setting => (
          <React.Fragment key={setting.id}>
            <List.Item
              title={setting.label}
              description={setting.description}
              right={() => (
                <Switch
                  value={settings[setting.id]}
                  onValueChange={() => handleToggle(setting.id)}
                  disabled={isSubmitting[setting.id]}
                />
              )}
              titleStyle={styles.itemTitle}
              descriptionStyle={styles.itemDescription}
              style={styles.listItem}
            />
            {defaultSettings.indexOf(setting) < defaultSettings.length - 1 && (
              <Divider style={styles.divider} />
            )}
          </React.Fragment>
        ))}
      </List.Section>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: theme.spacing.medium,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.shape.borderRadius,
  },
  itemTitle: {
    ...theme.fonts.bodyLarge,
    color: theme.colors.onSurface,
  },
  itemDescription: {
    ...theme.fonts.bodyMedium,
    color: theme.colors.onSurfaceVariant,
  },
  listItem: {
    paddingVertical: theme.spacing.small,
  },
  divider: {
    backgroundColor: theme.colors.surfaceVariant,
  },
});
