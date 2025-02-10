import React from 'react';
import { View } from 'react-native';
import { Text, Button, Surface, useTheme } from 'react-native-paper';
import styles from '../config/styles';
import type { AppTheme } from '../types/theme';

interface QuestionCardProps {
  question: string;
  options: string[];
  onSelect: (index: number) => void;
  currentIndex: number;
  totalQuestions: number;
  progress: number;
}

export default function QuestionCard({
  question,
  options,
  onSelect,
  currentIndex,
  totalQuestions,
  progress,
}: QuestionCardProps) {
  const theme = useTheme<AppTheme>();
  return (
    <Surface style={[styles.component_card_elevated, { marginBottom: 24 }]}>
      <View style={{ marginBottom: 16 }}>
        <Text style={styles.text_caption}>
          Question {currentIndex + 1} of {totalQuestions}
        </Text>
        <View
          style={{
            height: 4,
            backgroundColor: theme.colors.surfaceVariant,
            borderRadius: 2,
            marginTop: 8,
          }}
        >
          <View
            style={{
              height: '100%',
              width: `${progress * 100}%`,
              backgroundColor: theme.colors.primary,
              borderRadius: 2,
            }}
          />
        </View>
      </View>

      <Text style={styles.text_heading2}>{question}</Text>

      <View style={{ marginTop: 16 }}>
        {options.map((option, index) => (
          <Button
            key={index}
            mode="outlined"
            onPress={() => onSelect(index)}
            style={[styles.button_secondary, { marginBottom: 8 }]}
          >
            {option}
          </Button>
        ))}
      </View>
    </Surface>
  );
}
