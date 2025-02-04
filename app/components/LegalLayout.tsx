import React, { ReactNode } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { styles } from '../config/styles';

interface LegalLayoutProps {
  title: string;
  children: ReactNode;
  lastUpdated?: string;
}

export function LegalLayout({ title, children, lastUpdated }: LegalLayoutProps) {
  return (
    <View style={(styles as any).base.container as any}>
      <View style={styles.screen.legal.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => router.back()}
        />
        <Text style={styles.text.heading1 as any}>{title}</Text>
      </View>

      <ScrollView
        style={(styles as any).base.scrollView as any}
        contentContainerStyle={(styles as any).base.content as any}
      >
        {children}

        {lastUpdated && (
          <Text style={[styles.text.caption, { marginTop: 24 }]}>
            Last updated: {lastUpdated}
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
