import React from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import { Appbar, Text, useTheme } from 'react-native-paper';
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
  elevation = 1, 
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
  
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;
  
  return (
    <View>
      <View style={{ height: STATUSBAR_HEIGHT, backgroundColor: theme.colors.surface }} />
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
            size={22} // Reduced from 24
            color={theme.colors.onSurface}
            style={customAppBarStyles.backButton}
          />
        )}
        <View style={customAppBarStyles.titleContainer}>
          <Text style={customAppBarStyles.title}>{title}</Text>
          {subtitle && (
            <Text style={customAppBarStyles.subtitle}>{subtitle}</Text>
          )}
        </View>
        {rightContent}
      </Appbar.Header>
    </View>
  );
};
