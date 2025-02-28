import React from 'react';
import { Appbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import customAppBarStyles from '../config/CustomAppBar.styles';
import { theme } from '../config/theme';

export const CustomAppBar: React.FC<{ title: string }> = ({ title }) => {
  const router = useRouter();
  return (
    <Appbar.Header 
      style={[customAppBarStyles.header, { elevation: 2 }]}
      theme={{ colors: { primary: theme.colors.surface } }}
    >
      <Appbar.BackAction onPress={() => router.back()} />
      <Appbar.Content title={title} titleStyle={customAppBarStyles.title} />
    </Appbar.Header>
  );
};
