import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import styles from '../config/styles';

interface WelcomeHeaderProps {
  title: string;
  subtitle?: string;
}

export default function WelcomeHeader({ title, subtitle }: WelcomeHeaderProps) {
  return (
    <View style={styles.styles.layout.header}>
      <Text style={styles.styles.text.heading1}>{title}</Text>
      {subtitle && (
        <Text style={[styles.styles.text.body, { marginTop: 8 }]}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}
