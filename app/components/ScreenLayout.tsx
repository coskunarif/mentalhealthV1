import React from 'react';
import { View, ScrollView, StyleSheet, Platform, SafeAreaView } from 'react-native';
import { CustomAppBar } from './CustomAppBar';
import { theme } from '../config/theme';

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
}

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  children,
  showBackButton = true,
  onBackPress,
  rightContent,
  scrollable = true,
  contentContainerStyle,
  contentTopPadding = 8, // Small default padding
  transparent = false,
  elevation = 0
}) => {
  return (
    <View style={styles.container}>
      <CustomAppBar
        showBackButton={showBackButton}
        onBackPress={onBackPress}
        rightContent={rightContent}
        transparent={transparent}
        elevation={elevation}
      />
      
      {scrollable ? (
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={[
            { 
              paddingHorizontal: theme.spacing.medium, 
              paddingTop: contentTopPadding,
              paddingBottom: theme.spacing.large + 24 // Extra bottom padding for comfort
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
          { paddingTop: contentTopPadding },
          contentContainerStyle
        ]}>
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
  contentView: {
    flex: 1,
    paddingHorizontal: theme.spacing.medium,
    paddingBottom: theme.spacing.large,
  },
});
