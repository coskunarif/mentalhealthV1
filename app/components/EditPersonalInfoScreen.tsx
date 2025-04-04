import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Easing,
} from 'react-native';
import { Text, Snackbar } from 'react-native-paper';
import { EditPersonalInfoForm } from './EditPersonalInfoForm';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import type { AppTheme } from '../types/theme';
import { useAppTheme } from '../hooks/useAppTheme'; // Import hook
import { ScreenLayout } from './ScreenLayout'; // Import ScreenLayout
import { useAuth } from '../context/auth';
import { layoutStyles, typographyStyles, buttonStyles } from '../config';

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
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
      fontWeight: '600',
    },
    subtitle: {
      ...theme.fonts.bodyLarge,
      color: theme.colors.onSurfaceVariant,
      marginBottom: theme.spacing.medium,
      paddingHorizontal: theme.spacing.small,
    },
  });

export default function EditPersonalInfoScreen() {
  const theme = useAppTheme(); // Use hook
  const { user } = useAuth();
  const router = useRouter();
  const styles = createStyles(theme);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [snackbar, setSnackbar] = useState({ visible: false, message: '' });

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const userInfo = {
    name: user?.displayName || '',
    email: user?.email || '',
    phoneNumber: '',
    dateOfBirth: '',
  };

  const userId = user?.uid || '';

  const handleSave = async (info: any) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSnackbar({ visible: true, message: 'Profile updated successfully' });
      handleBack();
    } catch (error: any) {
      console.error('Failed to save:', error);
      setSnackbar({
        visible: true,
        message: error.message || 'Failed to save profile',
      });
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [300, 0],
                }),
              },
            ],
          },
        ]}
      >
        <StatusBar style="auto" />
        <ScreenLayout
          title="Personal Info"
          onBackPress={handleBack}
          elevation={1}
          subtitle="Keep your profile up to date by maintaining accurate personal information."
        >
          <EditPersonalInfoForm onSave={handleSave} info={userInfo} userId={userId} />
        </ScreenLayout>
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
