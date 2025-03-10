import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import customAppBarStyles from '../config/CustomAppBar.styles';
import { theme } from '../config/theme';

export const CustomAppBar: React.FC<{ 
  title: string; 
  subtitle?: string;
  showBackButton?: boolean; 
  elevation?: number;
  onBackPress?: () => void;
  rightContent?: React.ReactNode;
}> = ({ 
  title, 
  subtitle, 
  showBackButton = true, 
  elevation = 2, 
  onBackPress,
  rightContent 
}) => {
  const router = useRouter();
  
  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };
  
  return (
    <Appbar.Header 
      style={[
        customAppBarStyles.header, 
        { elevation: elevation }
      ]}
      theme={{ colors: { primary: theme.colors.surface } }}
    >
      {showBackButton && (
        <Appbar.BackAction 
          onPress={handleBack} 
          size={24}
          color={theme.colors.onSurface}
        />
      )}
      <View style={customAppBarStyles.titleContainer}>
        <Appbar.Content 
          title={title} 
          titleStyle={customAppBarStyles.title} 
        />
        {subtitle && (
          <Text style={customAppBarStyles.subtitle}>{subtitle}</Text>
        )}
      </View>
      {rightContent}
    </Appbar.Header>
  );
};
