import React from 'react';
import { View, ScrollView } from 'react-native';
import { IconButton, Text, Surface } from 'react-native-paper';
import { HelpCenterCard } from './HelpCenterCard';
import { useRouter } from 'expo-router';
import styles from '../config/styles';

export default function HelpCenterScreen() {
  const router = useRouter();

  const handleContactSupport = () => {
    // TODO: Implement live chat functionality
    console.log('Opening live chat');
  };

  return (
    <View style={styles.layout_container}>
      <Surface style={styles.header_surface} elevation={2}>
        <IconButton icon="arrow-left" size={24} onPress={() => router.back()} />
        <Text style={styles.text_heading1}>Help Center</Text>
      </Surface>
      <ScrollView contentContainerStyle={styles.layout_content}>
        <Text style={styles.text_subtitle}>
          Find answers to FAQs or reach out to our support team.
        </Text>
        <HelpCenterCard onContactSupport={handleContactSupport} />
      </ScrollView>
    </View>
  );
}
