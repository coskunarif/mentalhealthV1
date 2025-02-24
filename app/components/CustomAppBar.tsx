import React from 'react';
import { Appbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { theme } from '../config/theme';

export const CustomAppBar: React.FC<{ title: string }> = ({ title }) => {
  const router = useRouter();
  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
      <Appbar.BackAction onPress={() => router.back()} />
      <Appbar.Content
        title={title}
        titleStyle={{ ...theme.fonts.titleLarge, color: theme.colors.onSurface, marginLeft: theme.spacing.small }}
      />
    </Appbar.Header>
  );
};
