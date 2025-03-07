import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { LanguageRegionSettings } from './LanguageRegionSettings';
import { useRouter } from 'expo-router';
import { layoutStyles, typographyStyles } from '../config';
import { CustomAppBar } from './CustomAppBar';

export default function LanguageRegionScreen() {
  const router = useRouter();

  const handleLanguageChange = async (languageCode: string) => {
    try {
      // TODO: Implement API call to update language settings
      console.log('Changing language to:', languageCode);
      router.back(); // Navigate back after saving
    } catch (error: any) {
      console.error('Failed to change language:', error);
    }
  };

  return (
    <View style={layoutStyles.layout_container}>
      <CustomAppBar title="Language & Region" />
      <ScrollView contentContainerStyle={layoutStyles.layout_content}>
        <Text style={typographyStyles.text_subtitle}>
          Select your preferred language and region settings.
        </Text>
        <LanguageRegionSettings onLanguageChange={handleLanguageChange} />
      </ScrollView>
    </View>
  );
}
