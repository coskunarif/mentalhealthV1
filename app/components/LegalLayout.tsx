import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';
import { theme } from '../config/theme';
import { ScreenLayout } from './ScreenLayout';

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
    <ScreenLayout title={title}>
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
    </ScreenLayout>
  );
}
