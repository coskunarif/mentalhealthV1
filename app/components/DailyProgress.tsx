import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from '../config/styles';
import { EnhancedCard } from './EnhancedCard';

interface DailyProgressProps {
  meditationMinutes: number;
  moodEntries: number;
  streak: number;
}

export function DailyProgress({
  meditationMinutes,
  moodEntries,
  streak,
}: DailyProgressProps) {
  return (
    <View style={styles.component.progress.container}>
      <Text style={[styles.text.heading2, { marginBottom: 16 }]}>
        Daily Progress
      </Text>

      <View style={styles.component.progress.grid}>
        <EnhancedCard style={styles.component.card.elevated}>
          <Text style={styles.text.heading2}>{meditationMinutes}</Text>
          <Text style={styles.text.label}>Minutes Meditated</Text>
        </EnhancedCard>

        <EnhancedCard style={styles.component.card.elevated}>
          <Text style={styles.text.heading2}>{moodEntries}</Text>
          <Text style={styles.text.label}>Mood Entries</Text>
        </EnhancedCard>

        <EnhancedCard style={styles.component.card.elevated}>
          <Text style={styles.text.heading2}>{streak}</Text>
          <Text style={styles.text.label}>Day Streak</Text>
        </EnhancedCard>
      </View>
    </View>
  );
}
