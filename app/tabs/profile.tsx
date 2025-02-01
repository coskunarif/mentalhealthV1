import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface, Avatar, Switch, useTheme, TouchableRipple, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { globalStyles } from '../config/styles';

const stats = [
  { value: '4,100', label: 'minutes' },
  { value: '120', label: 'Scans' },
  { value: '400', label: 'Günlük seri' },
];

const settingsItems = [
  {
    icon: 'email',
    label: 'ahmet.mutlu@gmail.com',
    type: 'email'
  },
  {
    icon: 'bell-outline',
    label: 'Mute notifications',
    type: 'toggle'
  },
  {
    icon: 'card-account-details',
    label: 'Subscription',
    type: 'link'
  },
  {
    icon: 'facebook',
    label: 'facebookaccount',
    type: 'link'
  },
];

export default function ProfileScreen() {
  const router = useRouter();
  const theme = useTheme();

  const renderSettingItem = (item: any) => {
    return (
      <TouchableRipple
        key={item.label}
        onPress={() => {}}
        style={[
          styles.settingItem,
          { borderBottomColor: theme.colors.surfaceVariant }
        ]}
      >
        <View style={styles.settingItemContent}>
          <IconButton
            icon={item.icon}
            iconColor={theme.colors.primary}
            size={24}
            style={styles.settingIcon}
          />
          <Text
            variant="bodyLarge"
            style={[
              styles.settingLabel,
              { color: theme.colors.onSurfaceVariant },
              globalStyles.text
            ]}
          >
            {item.label}
          </Text>
          {item.type === 'toggle' && (
            <Switch
              value={true}
              onValueChange={() => {}}
              color={theme.colors.primary}
            />
          )}
          {item.type === 'link' && (
            <IconButton
              icon="chevron-right"
              iconColor={theme.colors.onSurfaceDisabled}
              size={24}
            />
          )}
        </View>
      </TouchableRipple>
    );
  };

  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.primaryContainer }]}>
      <View style={styles.content}>
        {/* Profile Header */}
        <View style={styles.header}>
          <Avatar.Text
            size={96}
            label="AM"
            style={{
              backgroundColor: theme.colors.primary,
            }}
          />
          
          <Text
            variant="bodyLarge"
            style={[
              styles.phoneNumber,
              { color: theme.colors.onSurfaceVariant },
              globalStyles.text
            ]}
          >
            +90 532 813 03 88
          </Text>
          
          <Text
            variant="headlineLarge"
            style={[
              styles.name,
              { color: theme.colors.onSurface },
              globalStyles.textBold
            ]}
          >
            Ahmet Mutlu
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text
                variant="displaySmall"
                style={[
                  { color: theme.colors.primary },
                  globalStyles.textBold
                ]}
              >
                {stat.value}
              </Text>
              <Text
                variant="titleMedium"
                style={[
                  { color: theme.colors.onSurfaceVariant },
                  globalStyles.text
                ]}
              >
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Settings */}
        <View style={styles.settings}>
          {settingsItems.map((item) => renderSettingItem(item))}
        </View>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    gap: 32,
  },
  header: {
    alignItems: 'center',
    gap: 16,
  },
  phoneNumber: {
    marginTop: 8,
  },
  name: {
    fontWeight: '600',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  settings: {
    gap: 8,
  },
  settingItem: {
    borderBottomWidth: 1,
  },
  settingItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingIcon: {
    margin: 0,
  },
  settingLabel: {
    flex: 1,
    marginLeft: 8,
  },
});
