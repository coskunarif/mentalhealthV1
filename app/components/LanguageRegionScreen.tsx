import React from 'react';
import { View, ScrollView } from 'react-native';
import { IconButton, Text, Surface } from 'react-native-paper';
import { LanguageRegionSettings } from './LanguageRegionSettings';
import { useRouter } from 'expo-router';
import styles from '../config/styles';

export default function LanguageRegionScreen() {
  const router = useRouter();

  const handleLanguageChange = async (languageCode: string) => {
    try {
      // TODO: Implement API call to update language settings
      console.log('Changing language to:', languageCode);
      router.back(); // Navigate back after saving
    } catch (error: any) {
      console.error('Failed to change language:', error);
      // You could show an error message here
    }
  };

  return (
    <View style={styles.layout_container}>
      <Surface style={styles.header_surface} elevation={2}>
        <IconButton icon="arrow-left" size={24} onPress={() => router.back()} />
        <Text style={styles.text_heading1}>Language & Region</Text>
      </Surface>
      <ScrollView contentContainerStyle={styles.layout_content}>
        <Text style={styles.text_subtitle}>
          Select your preferred language and region settings.
        </Text>
        <LanguageRegionSettings onLanguageChange={handleLanguageChange} />
      </ScrollView>
    </View>
  );
}
