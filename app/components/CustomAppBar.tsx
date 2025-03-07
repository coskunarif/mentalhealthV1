import React from 'react';
import { Appbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import customAppBarStyles from '../config/CustomAppBar.styles';
import { theme } from '../config/theme';

export const CustomAppBar: React.FC<{ 
  title: string; 
  showBackButton?: boolean; // Add this prop
  onBackPress?: () => void; // Add custom back handler
}> = ({ title, showBackButton = true, onBackPress }) => {
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
      style={[customAppBarStyles.header, { elevation: theme.colors.elevation.level2 }]}
      theme={{ colors: { primary: theme.colors.surface } }}
    >
      {showBackButton && <Appbar.BackAction onPress={handleBack} />}
      <Appbar.Content title={title} titleStyle={customAppBarStyles.title} />
    </Appbar.Header>
  );
};
