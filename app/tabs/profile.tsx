import React from 'react';
import { View } from 'react-native';
import { Text, Surface, Avatar, Switch, useTheme, TouchableRipple, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { globalStyles } from '../config/styles';

interface Stat {
  value: string;
  label: string;
}

interface SettingItem {
  icon: string;
  label: string;
  type: 'email' | 'toggle' | 'link';
}

const stats: Stat[] = [
  { value: '4,100', label: 'minutes' },
  { value: '120', label: 'Scans' },
  { value: '400', label: 'Günlük seri' },
];

const settingsItems: SettingItem[] = [
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

  const renderSettingItem = (item: SettingItem) => {
    return (
      <TouchableRipple
        key={item.label}
        onPress={() => {}}
        style={globalStyles.profileSettingItem}
      >
        <View style={globalStyles.profileSettingContent}>
          <IconButton
            icon={item.icon}
            iconColor={theme.colors.primary}
            size={24}
            style={globalStyles.profileSettingIcon}
          />
          <Text style={globalStyles.profileSettingLabel}>
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
    <Surface style={globalStyles.profileContainer}>
      <View style={globalStyles.profileContent}>
        {/* Profile Header */}
        <View style={globalStyles.profileHeader}>
          <Avatar.Text
            size={96}
            label="AM"
            style={{
              backgroundColor: theme.colors.primary,
            }}
          />
          
          <Text style={globalStyles.profilePhoneNumber}>
            +90 532 813 03 88
          </Text>
          
          <Text style={globalStyles.profileName}>
            Ahmet Mutlu
          </Text>
        </View>

        {/* Stats */}
        <View style={globalStyles.profileStats}>
          {stats.map((stat, index) => (
            <View key={index} style={globalStyles.profileStatItem}>
              <Text style={globalStyles.profileStatValue}>
                {stat.value}
              </Text>
              <Text style={globalStyles.profileStatLabel}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Settings */}
        <View style={globalStyles.profileSettings}>
          {settingsItems.map((item) => renderSettingItem(item))}
        </View>
      </View>
    </Surface>
  );
}
