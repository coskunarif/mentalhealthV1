import React from 'react';
import { Appbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import styles from '../config/CustomAppBar.styles';

export const CustomAppBar: React.FC<{ title: string }> = ({ title }) => {
  const router = useRouter();
  return (
    <Appbar.Header style={styles.header}>
      <Appbar.BackAction onPress={() => router.back()} />
      <Appbar.Content
        title={title}
        titleStyle={styles.title}
      />
    </Appbar.Header>
  );
};
