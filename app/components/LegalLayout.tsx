import React, { ReactNode } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { layoutStyles, typographyStyles } from '../config';
import { theme } from '../config/theme';

interface LegalLayoutProps {
  title: string;
  children: ReactNode;
  lastUpdated?: string;
}

export default function LegalLayout({
  title,
  children,
  lastUpdated,
}: LegalLayoutProps) {
  return (
    <View style={layoutStyles.layout_container}>
      <View style={{ marginBottom: 24 }}>
        <IconButton icon="arrow-left" size={24} onPress={() => router.back()} />
        <Text
          style={{
            ...theme.fonts.titleLarge,
            color: theme.colors.onSurface,
            marginBottom: theme.spacing.small,
          }}
        >
          {title}
        </Text>
      </View>
      <ScrollView
        style={layoutStyles.layout_scrollView}
        contentContainerStyle={layoutStyles.layout_content}
      >
        {children}
        {lastUpdated && (
          <Text
            style={{
              ...theme.fonts.labelMedium,
              color: theme.colors.onSurfaceVariant,
              marginTop: theme.spacing.large,
            }}
          >
            Last updated: {lastUpdated}
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
