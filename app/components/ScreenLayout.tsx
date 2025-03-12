import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { CustomAppBar } from './CustomAppBar';
import type { AppTheme } from '../types/theme';

interface ScreenLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string; // Add this line
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightContent?: React.ReactNode;
  scrollable?: boolean;
  contentContainerStyle?: any;
  contentTopPadding?: number;
  transparent?: boolean;
  elevation?: number;
}

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  children,
  title,
  subtitle, // Add this parameter
  showBackButton = true,
  onBackPress,
  rightContent,
  scrollable = true,
  contentContainerStyle,
  contentTopPadding = 16,
  transparent = false,
  elevation = 0,
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
    subtitleText: { // Add styles for the subtitle
      color: theme.colors.onSurfaceVariant,
      ...theme.fonts.bodyLarge,
      marginTop: 4,
      marginBottom: 16,
      paddingHorizontal: 16,
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

      {/* Add subtitle rendering after CustomAppBar if subtitle exists */}
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
              paddingTop: subtitle ? contentTopPadding / 2 : contentTopPadding, // Adjust padding when subtitle exists
              paddingBottom: 32,
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
          { paddingTop: subtitle ? contentTopPadding / 2 : contentTopPadding }, // Adjust padding when subtitle exists
          contentContainerStyle
        ]}>
          {children}
        </View>
      )}
    </View>
  );
};
