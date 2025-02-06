import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import styles from '../config/styles';
import theme from '../config/theme';

interface SurveyOptionProps {
  text: string;
  selected?: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

export default function SurveyOption({ 
  text, 
  selected = false, 
  onSelect,
  disabled = false 
}: SurveyOptionProps) {
  return (
    <TouchableOpacity
      onPress={onSelect}
      disabled={disabled}
      style={[
        styles.styles.component.card.container,
        styles.styles.component.card.interactive,
        {
          marginVertical: 8,
          opacity: disabled ? 0.5 : 1,
        },
        selected && {
          backgroundColor: theme.colors.primaryContainer,
          borderColor: theme.colors.primary,
          borderWidth: 2,
        },
      ]}
    >
      <View style={styles.styles.component.card.content}>
        <Text 
          style={[
            styles.styles.text.body,
            selected && { color: theme.colors.primary }
          ]}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
