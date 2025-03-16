// File: app/components/ScreenLayout.tsx - Complete component with bottomContent
import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { CustomAppBar } from './CustomAppBar';
import type { AppTheme } from '../types/theme';

interface ScreenLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightContent?: React.ReactNode;
  scrollable?: boolean;
  contentContainerStyle?: any;
  contentTopPadding?: number;
  transparent?: boolean;
  elevation?: number;
  bottomContent?: React.ReactNode; // Added prop
}

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  children,
  title,
  subtitle,
  showBackButton = true,
  onBackPress,
  rightContent,
  scrollable = true,
  contentContainerStyle,
  contentTopPadding = 16,
  transparent = false,
  elevation = 0,
  bottomContent, // Added prop
}) => {
  const theme = useTheme<AppTheme>();
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
    },
    contentView: {
      flex: 1,
      paddingHorizontal: 16,
      paddingBottom: 24,
    },
    subtitleText: {
      color: theme.colors.onSurfaceVariant,
      ...theme.fonts.bodyLarge,
      marginTop: 4,
      marginBottom: 16,
      paddingHorizontal: 16,
    },
    bottomContentContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.colors.background,
      borderTopWidth: 1,
      borderTopColor: theme.withOpacity(theme.colors.outline, 0.08),
      zIndex: 10,
    },
  });

  return (
    <View style={styles.container}>
      <CustomAppBar
        title={title}
        showBackButton={showBackButton}
        onBackPress={onBackPress}
        rightContent={rightContent}
        transparent={transparent}
        elevation={elevation}
      />

      {subtitle && (
        <Text style={styles.subtitleText}>
          {subtitle}
        </Text>
      )}

      {scrollable ? (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            {
              paddingHorizontal: 16,
              paddingTop: subtitle ? contentTopPadding / 2 : contentTopPadding,
              paddingBottom: bottomContent ? 80 : 32, // Added padding for bottom content
            },
            contentContainerStyle
          ]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[
          styles.contentView,
          { paddingTop: subtitle ? contentTopPadding / 2 : contentTopPadding },
          contentContainerStyle
        ]}>
          {children}
        </View>
      )}

      {bottomContent && (
        <View style={styles.bottomContentContainer}>
          {bottomContent}
        </View>
      )}
    </View>
  );
};
