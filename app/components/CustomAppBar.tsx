import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import customAppBarStyles from '../config/CustomAppBar.styles';
import { theme } from '../config/theme';

export const CustomAppBar: React.FC<{
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightContent?: React.ReactNode;
  transparent?: boolean;
}> = ({
  showBackButton = true,
  onBackPress,
  rightContent,
  transparent = false
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  // If transparent is true, we don't even need a container
  if (!showBackButton && !rightContent && transparent) {
    return null;
  }

  return (
    <View style={customAppBarStyles.container}>
      {showBackButton && (
        <TouchableOpacity
          style={customAppBarStyles.backButtonContainer}
          onPress={handleBack}
          activeOpacity={0.7}
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
