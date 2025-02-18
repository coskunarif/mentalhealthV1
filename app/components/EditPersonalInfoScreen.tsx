import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { EditPersonalInfoForm } from './EditPersonalInfoForm';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import type { AppTheme } from '../types/theme';
import { theme } from '../config/theme';

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
  const router = useRouter();
  const styles = createStyles(theme);

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

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content 
          title="Personal Information"
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subtitle}>
          Keep your profile up to date by maintaining accurate personal information.
        </Text>
        <EditPersonalInfoForm 
          onSave={handleSave}
          info={{
            name: "",
            email: "",
            phoneNumber: "",
            dateOfBirth: "",
          }}
        />
      </ScrollView>
    </View>
  );
}
