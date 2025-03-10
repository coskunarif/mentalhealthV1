import React, { ReactNode } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { layoutStyles, typographyStyles } from '../config';
import { theme } from '../config/theme';
import { CustomAppBar } from './CustomAppBar';

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
      <CustomAppBar 
        title={title} 
      />
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
