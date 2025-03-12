import React from 'react';
import { View, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import customAppBarStyles from '../config/CustomAppBar.styles';
import { theme } from '../config/theme';

export const CustomAppBar: React.FC<{
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightContent?: React.ReactNode;
  transparent?: boolean;
  elevation?: number;
}> = ({
  showBackButton = true,
  onBackPress,
  rightContent,
  transparent = false,
  elevation = 0
}) => {
  const router = useRouter();
  
  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };
  
  if (!showBackButton && !rightContent && transparent) {
    // Return a placeholder that occupies the same space for consistency
    return (
      <View style={{ 
        height: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0 
      }} />
    );
  }
  
  return (
    <View style={[
      customAppBarStyles.container,
      transparent ? {} : { 
        backgroundColor: theme.colors.background,
        elevation: elevation,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: elevation > 0 ? 1 : 0 },
        shadowOpacity: elevation > 0 ? 0.1 : 0,
        shadowRadius: elevation,
      }
    ]}>
      {showBackButton && (
        <TouchableOpacity
          style={customAppBarStyles.backButtonContainer}
          onPress={handleBack}
          activeOpacity={0.7}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
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
      
      {rightContent && (
        <View style={customAppBarStyles.rightContentContainer}>
          {rightContent}
        </View>
      )}
    </View>
  );
};
