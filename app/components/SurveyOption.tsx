import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from '../config/styles';
import { colors } from '../config/theme';

interface SurveyOptionProps {
  text: string;
  selected?: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

export function SurveyOption({ 
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
        styles.component.card.container,
        styles.component.card.interactive,
        {
          marginVertical: 8,
          opacity: disabled ? 0.5 : 1,
        },
        selected && {
          backgroundColor: colors.primaryContainer,
          borderColor: colors.primary,
          borderWidth: 2,
        },
      ]}
    >
      <View style={styles.component.card.content}>
        <Text 
          style={[
            styles.text.body,
            selected && { color: colors.primary }
          ]}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
