import React from 'react';
import { View } from 'react-native';
import { Text, ProgressBar } from 'react-native-paper';
import styles from '../config/styles';
import theme from '../config/theme';

interface SurveyProgressProps {
  current: number;
  total: number;
}

export default function SurveyProgress({ current, total }: SurveyProgressProps) {
  const progress = (current + 1) / total;

  return (
    <View style={styles.component_card_container}>
      <View style={styles.component_card_content}>
        <Text style={styles.text_body}>
          Question {current + 1} of {total}
        </Text>
        <ProgressBar
          progress={progress}
          color={theme.colors.primary}
          style={{ marginTop: 8, height: 8, borderRadius: 4 }}
        />
      </View>
    </View>
  );
}
