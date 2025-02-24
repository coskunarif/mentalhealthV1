import React, { ReactNode } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import styles from '../config/styles';
import { theme } from '../config/theme';

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
        <Text style={{ ...theme.fonts.titleLarge, color: theme.colors.onSurface, marginBottom: theme.spacing.small }}>{title}</Text>
      </View>

      <ScrollView
        style={styles.layout_scrollView}
        contentContainerStyle={styles.layout_content}
      >
        {children}

        {lastUpdated && (
          <Text style={{ ...theme.fonts.labelMedium, color: theme.colors.onSurfaceVariant, marginTop: theme.spacing.large }}>
            Last updated: {lastUpdated}
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
