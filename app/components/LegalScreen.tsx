import React from 'react';
import { View, ScrollView } from 'react-native';
import { IconButton, Text, Surface } from 'react-native-paper';
import { LegalLinks } from './LegalLinks';
import { useRouter } from 'expo-router';
import styles from '../config/styles';

export default function LegalScreen() {
  const router = useRouter();

  return (
    <View style={styles.layout_container}>
      <Surface style={styles.header_surface} elevation={2}>
        <IconButton icon="arrow-left" size={24} onPress={() => router.back()} />
        <Text style={styles.text_heading2}>Privacy Policy & Terms</Text>
      </Surface>
      <ScrollView contentContainerStyle={styles.layout_content}>
        <Text style={styles.text_subtitle}>
          Review our policies and terms governing your usage.
        </Text>
        <LegalLinks />
      </ScrollView>
    </View>
  );
}
