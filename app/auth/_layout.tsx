import React from 'react';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import styles from '../config/styles';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'default',
  contentStyle: { backgroundColor: 'transparent' },
};

export default function AuthLayout() {
  return (
    <View style={styles.styles.layout.container}>
      <Stack screenOptions={screenOptions}>
        <Stack.Screen
          name="sign-in"
          options={{
            title: 'Sign In',
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            title: 'Sign Up',
          }}
        />
        <Stack.Screen
          name="forgot-password"
          options={{
            title: 'Forgot Password',
          }}
        />
      </Stack>
    </View>
  );
}
