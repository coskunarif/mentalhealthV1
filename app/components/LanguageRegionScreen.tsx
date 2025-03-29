import React from 'react';
import { LanguageRegionSettings } from './LanguageRegionSettings';
import { useRouter } from 'expo-router';
import { ScreenLayout } from './ScreenLayout';
import { useAuth } from '../context/auth'; // Import useAuth
import UserService from '../services/user.service'; // Import UserService

export default function LanguageRegionScreen() {
  const router = useRouter();
  const { user } = useAuth(); // Get user from auth context

  const handleLanguageChange = async (languageCode: string) => {
    if (!user) {
      console.error('User not authenticated');
      // Optionally show an error message to the user
      return;
    }
    try {
      console.log(`Attempting to change language to: ${languageCode} for user: ${user.uid}`);
      // Call the user service to update the setting
      await UserService.updateUserSettings(user.uid, { language: languageCode });
      console.log('Successfully updated language setting in Firestore.');
      router.back(); // Navigate back after successful update
    } catch (error: any) {
      console.error('Failed to change language:', error);
      // Optionally show an error message to the user
    }
  };

  // Get the current language from the user object, default to 'en'
  const currentLanguage = user?.settings?.language || 'en';

  return (
    <ScreenLayout
      title="Language & Region"
      subtitle="Select your preferred language and region settings."
    >
      {/* Pass the current language to the settings component */}
      <LanguageRegionSettings
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />
    </ScreenLayout>
  );
}
