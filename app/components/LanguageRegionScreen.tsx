import React from 'react';
import { LanguageRegionSettings } from './LanguageRegionSettings';
import { useRouter } from 'expo-router';
import { ScreenLayout } from './ScreenLayout';

export default function LanguageRegionScreen() {
  const router = useRouter();

  const handleLanguageChange = async (languageCode: string) => {
    try {
      console.log('Changing language to:', languageCode);
      router.back();
    } catch (error: any) {
      console.error('Failed to change language:', error);
    }
  };

  return (
    <ScreenLayout
      title="Language & Region"
      subtitle="Select your preferred language and region settings."
    >
      <LanguageRegionSettings onLanguageChange={handleLanguageChange} />
    </ScreenLayout>
  );
}
