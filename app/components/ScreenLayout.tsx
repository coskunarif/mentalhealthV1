import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { CustomAppBar } from './CustomAppBar';
import type { AppTheme } from '../types/theme';

interface ScreenLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightContent?: React.ReactNode;
  scrollable?: boolean;
  contentContainerStyle?: any;
  contentTopPadding?: number;
  transparent?: boolean;
  elevation?: number;
  title?: string;
  subtitle?: string;
  showTitle?: boolean; // New prop to control title visibility in app bar
}

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  children,
  showBackButton = true,
  onBackPress,
  rightContent,
  scrollable = true,
  contentContainerStyle,
  contentTopPadding = 16, // Increased from 8 for better spacing
  transparent = false,
  elevation = 0,
  title,
  subtitle,
  showTitle = true // By default show the title in the app bar
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
      paddingHorizontal: 16, // Standardized padding
      paddingBottom: 24, // Increased padding at bottom
    },
    headerContainer: {
      marginBottom: 24, // Increased for better separation
      paddingTop: 8, // Add padding at top
    },
    title: {
      fontSize: 24,
      fontWeight: '500',
      color: theme.colors.onSurface,
      marginBottom: 8,
      letterSpacing: 0.18,
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.onSurfaceVariant,
      letterSpacing: 0.15,
      lineHeight: 24,
    }
  });
  
  return (
    <View style={styles.container}>
      <CustomAppBar
        showBackButton={showBackButton}
        onBackPress={onBackPress}
        rightContent={rightContent}
        transparent={transparent}
        elevation={elevation}
        title={showTitle ? title : undefined} // Only show title if showTitle is true
      />
      
      {scrollable ? (
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={[
            { 
              paddingHorizontal: 16, 
              paddingTop: contentTopPadding,
              paddingBottom: 32, // Extra padding for scroll view
            },
            contentContainerStyle
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Only show title/subtitle in content if not shown in app bar or explicitly needed */}
          {(!showTitle || subtitle) && (
            <View style={styles.headerContainer}>
              {!showTitle && title && (
                <Text style={styles.title}>{title}</Text>
              )}
              {subtitle && (
                <Text style={styles.subtitle}>{subtitle}</Text>
              )}
            </View>
          )}
          {children}
        </ScrollView>
      ) : (
        <View style={[
          styles.contentView, 
          { paddingTop: contentTopPadding },
          contentContainerStyle
        ]}>
          {/* Same conditional title rendering for non-scrollable layout */}
          {(!showTitle || subtitle) && (
            <View style={styles.headerContainer}>
              {!showTitle && title && (
                <Text style={styles.title}>{title}</Text>
              )}
              {subtitle && (
                <Text style={styles.subtitle}>{subtitle}</Text>
              )}
            </View>
          )}
          {children}
        </View>
      )}
    </View>
  );
};
