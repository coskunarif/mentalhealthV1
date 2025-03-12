import React from 'react';
import { View, TouchableOpacity, Platform, StatusBar, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from 'react-native-paper';
import type { AppTheme } from '../types/theme';

export const CustomAppBar: React.FC<{
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightContent?: React.ReactNode;
  transparent?: boolean;
  elevation?: number;
  title?: string;
}> = ({
  showBackButton = true,
  onBackPress,
  rightContent,
  transparent = false,
  elevation = 0,
  title
}) => {
  const theme = useTheme<AppTheme>();
  const router = useRouter();
  
  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };
  
  // Create status bar height constant
  const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;
  const APPBAR_HEIGHT = 56; // Material Design standard
  
  const styles = StyleSheet.create({
    container: {
      height: STATUS_BAR_HEIGHT + APPBAR_HEIGHT,
      width: '100%',
      position: 'relative',
      backgroundColor: transparent ? 'transparent' : theme.colors.background,
      elevation: transparent ? 0 : elevation,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: elevation > 0 ? 1 : 0 },
      shadowOpacity: elevation > 0 ? 0.1 : 0,
      shadowRadius: elevation,
      zIndex: 10,
    },
    backButtonContainer: {
      position: 'absolute',
      top: STATUS_BAR_HEIGHT + (APPBAR_HEIGHT - 48) / 2, // Center vertically in the appbar
      left: 4, // Material Design standard
      width: 48, // Proper touch target (48x48)
      height: 48, // Standard Material touch target
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleContainer: {
      position: 'absolute',
      top: STATUS_BAR_HEIGHT,
      left: showBackButton ? 56 : 16, // Adjust based on back button presence
      right: rightContent ? 56 : 16,
      height: APPBAR_HEIGHT,
      justifyContent: 'center',
      alignItems: showBackButton ? 'flex-start' : 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: '500',
      color: theme.colors.onSurface,
      letterSpacing: 0.15, // Material Design spec
      textAlign: showBackButton ? 'left' : 'center',
    },
    rightContentContainer: {
      position: 'absolute',
      top: STATUS_BAR_HEIGHT + (APPBAR_HEIGHT - 48) / 2, // Center vertically
      right: 4,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
  if (!showBackButton && !rightContent && transparent && !title) {
    // Return a placeholder that occupies the same space for consistency
    return (
      <View style={{ height: STATUS_BAR_HEIGHT + APPBAR_HEIGHT }} />
    );
  }
  
  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={handleBack}
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <MaterialIcons
            name="arrow-back"
            size={24}
            color={theme.colors.onSurface}
          />
        </TouchableOpacity>
      )}
      
      {title && (
        <View style={styles.titleContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
        </View>
      )}
      
      {rightContent && (
        <View style={styles.rightContentContainer}>
          {rightContent}
        </View>
      )}
    </View>
  );
};
