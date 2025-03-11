import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { CustomAppBar } from './CustomAppBar';
import { theme } from '../config/theme';

interface ScreenLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightContent?: React.ReactNode;
  scrollable?: boolean;
  contentContainerStyle?: any;
}

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
    paddingHorizontal: theme.spacing.medium,
    paddingBottom: theme.spacing.large,
  },
});

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  children,
  showBackButton = true,
  onBackPress,
  rightContent,
  scrollable = true,
  contentContainerStyle
}) => {
  return (
    <View style={styles.container}>
      <CustomAppBar
        showBackButton={showBackButton}
        onBackPress={onBackPress}
        rightContent={rightContent}
      />
      
      {scrollable ? (
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={[
            // No top padding necessary anymore
            { paddingHorizontal: theme.spacing.medium, paddingBottom: theme.spacing.large },
            contentContainerStyle
          ]}
        >
          {/* Optional: Add a content header here if context is needed */}
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.contentView, contentContainerStyle]}>
          {children}
        </View>
      )}
    </View>
  );
};
