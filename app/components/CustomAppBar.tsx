import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { theme } from '../config/theme';
import customAppBarStyles from '../config/CustomAppBar.styles';

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
  elevation = 3, // Updated default to 3
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
            size={24}
            color={theme.colors.onSurface}
            style={customAppBarStyles.backButton}
          />
        )}
        <View style={customAppBarStyles.titleContainer}>
          <Text 
            style={customAppBarStyles.title}
            numberOfLines={1}
          >
            {title}
          </Text>
          {subtitle && (
            <Text 
              style={customAppBarStyles.subtitle}
              numberOfLines={1}
            >
              {subtitle}
            </Text>
          )}
        </View>
        {rightContent}
      </Appbar.Header>
    </View>
  );
};
