import React from 'react';
import { Stack } from 'expo-router';
import { layoutStyles } from '../config';

const screenOptions = {
  headerShown: false,
  contentStyle: { backgroundColor: 'transparent' },
};

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        ...screenOptions,
        contentStyle: {
          backgroundColor: layoutStyles.common_screen_auth_container.backgroundColor,
        },
      }}
    >
      <Stack.Screen name="sign-in" options={{ title: 'Sign In' }} />
      <Stack.Screen name="sign-up" options={{ title: 'Sign Up' }} />
      <Stack.Screen name="forgot-password" options={{ title: 'Forgot Password' }} />
    </Stack>
  );
}
