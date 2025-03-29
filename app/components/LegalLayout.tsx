import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme'; // Import hook
import { ScreenLayout } from './ScreenLayout';
import type { AppTheme } from '../types/theme'; // Import AppTheme

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
  const theme = useAppTheme(); // Use hook
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
