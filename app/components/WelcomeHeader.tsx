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
    <View style={styles.layout_header}>
      <Text style={styles.text_heading1}>{title}</Text>
      {subtitle && (
        <Text style={[styles.text_body, styles.welcome_subtitle]}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}
