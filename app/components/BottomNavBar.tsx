import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import type { AppTheme } from '../types/theme';

export default function BottomNavBar() {
  const theme = useTheme<AppTheme>();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          height: 56, // Material Design standard
          elevation: 8, // Proper elevation
          shadowColor: theme.colors.shadow,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          borderTopWidth: 0, // Remove default border
          paddingBottom: 8, // Proper padding
          paddingTop: 8,
        },
        tabBarItemStyle: {
          paddingVertical: 4, // Follow 8dp grid
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          fontFamily: theme.fonts.labelMedium.fontFamily,
        },
        headerShown: false, // If you're handling headers elsewhere
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons 
              name={focused ? "home" : "house"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons 
              name={focused ? "person" : "person-off"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      {/* Add more tabs as needed */}
</Tabs>
  );
}
