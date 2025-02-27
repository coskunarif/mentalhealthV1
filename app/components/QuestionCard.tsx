import React from 'react';
import { View } from 'react-native';
import { Text, RadioButton, Surface } from 'react-native-paper';
import { cardStyles, typographyStyles } from '../config';
import type { AppTheme } from '../types/theme';
import { useTheme } from 'react-native-paper';

interface QuestionCardProps {
  options: string[];
  selectedOption: string;
  onSelect: (index: number) => void;
}

export default function QuestionCard({ options, selectedOption, onSelect }: QuestionCardProps) {
  const theme = useTheme<AppTheme>();

  const handleOptionSelect = (value: string) => {
    onSelect(options.indexOf(value));
  };

  return (
    <Surface style={[cardStyles.component_card_elevated, { marginBottom: 24 }]}>
      <RadioButton.Group onValueChange={handleOptionSelect} value={selectedOption}>
        {options.map(option => (
          <RadioButton.Item
            key={option}
            label={option}
            value={option}
            mode="android"
            style={{ paddingVertical: 8 }}
            labelStyle={{ color: theme.colors.onSurface }}
          />
        ))}
      </RadioButton.Group>
    </Surface>
  );
}
