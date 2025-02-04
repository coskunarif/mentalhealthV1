import React from 'react';
import { Tabs } from 'expo-router';
import { styles } from '../config/styles';
import { IconButton } from 'react-native-paper';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: styles.colors.surface,
          borderTopColor: styles.colors.disabled,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: styles.colors.primary,
        tabBarInactiveTintColor: styles.colors.textSecondary,
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
          tabBarIcon: ({ color, size }) => (
            <IconButton 
              icon="home" 
              size={24} 
              iconColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="mood"
        options={{
          title: 'Mood',
          tabBarIcon: ({ color, size }) => (
            <IconButton icon="emoticon" size={24} iconColor={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="meditate"
        options={{
          title: 'Meditate',
          tabBarIcon: ({ color, size }) => (
            <IconButton icon="meditation" size={24} iconColor={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
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
