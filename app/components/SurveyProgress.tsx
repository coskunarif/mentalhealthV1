import React from 'react';
import { View } from 'react-native';
import { Text, ProgressBar } from 'react-native-paper';
import { styles } from '../config/styles';
import { colors } from '../config/theme';

interface SurveyProgressProps {
  current: number;
  total: number;
}

export function SurveyProgress({ current, total }: SurveyProgressProps) {
  const progress = (current + 1) / total;

  return (
    <View style={styles.component.card.container}>
      <View style={styles.component.card.content}>
        <Text style={styles.text.body}>
          Question {current + 1} of {total}
        </Text>
        <ProgressBar
          progress={progress}
          color={colors.primary}
          style={{ marginTop: 8, height: 8, borderRadius: 4 }}
        />
      </View>
    </View>
  );
}
