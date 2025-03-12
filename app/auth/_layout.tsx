import React from 'react';
import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';
import type { AppTheme } from '../types/theme';

export default function AuthLayout() {
  const theme = useTheme<AppTheme>();
  
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
}
