import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import styles from '../config/styles';
import RadarChart from './RadarChart';
import EnhancedCard from './EnhancedCard';

interface DailyProgressProps {
  meditationMinutes: number;
  moodEntries: number;
  streak: number;
}

export default function DailyProgress({
  meditationMinutes,
  moodEntries,
  streak,
}: DailyProgressProps) {
  return (
    <View style={styles.component_progress_container}>
      <Text style={[styles.text_heading2, { marginBottom: 16 }]}>
        Today's Progress
      </Text>
      <View style={styles.component_progress_grid}>
        <EnhancedCard style={styles.component_card_elevated}>
          <Text style={styles.text_heading2}>{meditationMinutes}</Text>
          <Text style={styles.text_label}>Minutes Meditated</Text>
        </EnhancedCard>

        <EnhancedCard style={styles.component_card_elevated}>
          <Text style={styles.text_heading2}>{moodEntries}</Text>
          <Text style={styles.text_label}>Mood Entries</Text>
        </EnhancedCard>

        <EnhancedCard style={styles.component_card_elevated}>
          <Text style={styles.text_heading2}>{streak}</Text>
          <Text style={styles.text_label}>Day Streak</Text>
        </EnhancedCard>
      </View>
    </View>
  );
}
