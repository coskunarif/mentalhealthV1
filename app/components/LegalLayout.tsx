import React, { ReactNode } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import styles from '../config/styles';

interface LegalLayoutProps {
  title: string;
  children: ReactNode;
  lastUpdated?: string;
}

export default function LegalLayout({ title, children, lastUpdated }: LegalLayoutProps) {
  return (
    <View style={styles.layout_container}>
      <View style={styles.screen_legal_header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => router.back()}
        />
        <Text style={styles.text_heading1}>{title}</Text>
      </View>

      <ScrollView
        style={styles.layout_scrollView}
        contentContainerStyle={styles.layout_content}
      >
        {children}

        {lastUpdated && (
          <Text style={[styles.text_caption, { marginTop: 24 }]}>
            Last updated: {lastUpdated}
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
