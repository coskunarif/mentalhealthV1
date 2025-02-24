import React, { useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet, Animated, KeyboardAvoidingView, Platform, Easing } from 'react-native';
import { Text } from 'react-native-paper';
import { EditPersonalInfoForm } from './EditPersonalInfoForm';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import type { AppTheme } from '../types/theme';
import { theme } from '../config/theme';
import { CustomAppBar } from './CustomAppBar';

const createStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.medium,
  },
  headerTitle: {
    ...theme.fonts.titleLarge,
    fontWeight: "600",
  },
  subtitle: {
    ...theme.fonts.bodyLarge,
    color: theme.colors.onSurfaceVariant,
    marginBottom: theme.spacing.medium,
    paddingHorizontal: theme.spacing.small,
  },
});

export default function EditPersonalInfoScreen() {
  const router = useRouter();
  const styles = createStyles(theme);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 200,
      easing: Easing.out(Easing.ease), // Added easing
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

const handleSave = async (info: any) => {
  try {
    // TODO: Implement API call to save personal info
    console.log('Saving personal info:', info);
    router.back();
  } catch (error: any) {
    console.error('Failed to save:', error);
    // TODO: Implement error handling
  }
};

  const handleBack = () => {
  Animated.timing(slideAnim, {
    toValue: 0,
    duration: 200,
    easing: Easing.out(Easing.ease), // Added easing
    useNativeDriver: true,
  }).start(() => router.back());
};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <Animated.View style={[
        styles.container,
        {
          transform: [
            {
              translateX: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [300, 0], // Slide in from right
              }),
            },
          ],
        },
      ]}>
        <StatusBar style="auto" />
        <CustomAppBar title="Personal Information" />
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.subtitle}>
              Keep your profile up to date by maintaining accurate personal information.
            </Text>
            <EditPersonalInfoForm onSave={handleSave} info={{ name: "", email: "", phoneNumber: "", dateOfBirth: "" }} />
          </ScrollView>
        </Animated.View>
      </KeyboardAvoidingView>
    );
  }
