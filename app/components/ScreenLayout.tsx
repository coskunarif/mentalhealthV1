import React, { ReactNode } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { CustomAppBar } from './CustomAppBar';
import { theme } from '../config/theme';

interface ScreenLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightContent?: React.ReactNode;
  scrollable?: boolean;
  contentContainerStyle?: any;
}

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  title,
  subtitle,
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
        title={title}
        subtitle={subtitle}
        showBackButton={showBackButton}
        onBackPress={onBackPress}
        rightContent={rightContent}
      />
      
      {scrollable ? (
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={[
            styles.contentContainer,
            contentContainerStyle
          ]}
        >
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: theme.spacing.medium,
    paddingTop: theme.spacing.small, // Reduce top padding since the app bar is now more compact
  },
  contentView: {
    flex: 1,
    padding: theme.spacing.medium,
    paddingTop: theme.spacing.small,
  }
});
