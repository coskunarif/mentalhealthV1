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
import type { PersonalInformation } from '../types/personalInformation'; // Import type
import { UserService } from '../services/user.service'; // Import service
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

  // Corrected userInfo object, removing duplicates
  const userInfo = {
    // Fetch initial values from user context or service if needed
    // For now, using defaults or context values
    name: user?.displayName || '',
    email: user?.email || '', // Email is usually not editable here, but needed for type
    phoneNumber: user?.phoneNumber || '', // Assuming phoneNumber might be on user object from auth or fetched separately
    dateOfBirth: user?.dateOfBirth || '', // Assuming dateOfBirth might be on user object from auth or fetched separately
  };

  const userId = user?.uid || '';

  // Update handleSave to use UserService and correct type
  const handleSave = async (info: PersonalInformation) => {
    if (!userId) {
      setSnackbar({ visible: true, message: 'Error: User not identified.' });
      return;
    }
    try {
      // Call the user service to update the info
      await UserService.updatePersonalInfo(userId, info);
      setSnackbar({ visible: true, message: 'Profile updated successfully' });
      // Optionally update local auth context if needed, though service might handle some parts
      // e.g., auth.updateUser({ displayName: info.name });
      handleBack(); // Navigate back after successful save
    } catch (error: any) {
      console.error('Failed to save personal info:', error);
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
