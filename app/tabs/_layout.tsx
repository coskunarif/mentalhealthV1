import React from 'react';
import { Tabs } from 'expo-router';
import styles from '../config/styles';
import { IconButton, useTheme } from 'react-native-paper';
import type { AppTheme } from '../types/theme';

export default function TabLayout() {
  const theme = useTheme<AppTheme>();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outlineVariant,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Kameron',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconButton 
              icon="home" 
              size={24} 
              iconColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <IconButton 
              icon="account" 
              size={24} 
              iconColor={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
