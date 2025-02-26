import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, StyleSheet, Animated, KeyboardAvoidingView, Platform, Easing } from 'react-native';
import { Text, Snackbar } from 'react-native-paper';
import { EditPersonalInfoForm } from './EditPersonalInfoForm';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import type { AppTheme } from '../types/theme';
import { theme } from '../config/theme';
import { CustomAppBar } from './CustomAppBar';
import { useAuth } from '../context/auth';

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
  const { user } = useAuth();
  const router = useRouter();
  const styles = createStyles(theme);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [snackbar, setSnackbar] = useState({ visible: false, message: '' });

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 200,
      easing: Easing.out(Easing.ease), // Added easing
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  // Create user info object with available Firebase User properties
  // and add placeholders for missing properties
  const userInfo = {
    name: user?.displayName || '',
    email: user?.email || '',
    phoneNumber: '', // This would come from your backend in a real app
    dateOfBirth: '', // This would come from your backend in a real app
  };

const handleSave = async (info: any) => {
  try {
    // Simulate API call to save personal info
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you would update the user profile in Firebase or your backend
    // For example: await updateUserProfile(info);
    
    setSnackbar({ visible: true, message: 'Profile updated successfully' });
    
    // Use the slide-out animation before navigating back
    handleBack();
  } catch (error: any) {
    console.error('Failed to save:', error);
    setSnackbar({ visible: true, message: error.message || 'Failed to save profile' });
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
            <EditPersonalInfoForm onSave={handleSave} info={userInfo} />
          </ScrollView>
        </Animated.View>
        
        <Snackbar
          visible={snackbar.visible}
          onDismiss={() => setSnackbar({ ...snackbar, visible: false })}
          duration={3000}
        >
          {snackbar.message}
        </Snackbar>
      </KeyboardAvoidingView>
    );
  }
