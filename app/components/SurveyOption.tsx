import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import styles from '../config/styles';
import type { AppTheme } from '../types/theme';

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
  const theme = useTheme<AppTheme>();
  return (
    <TouchableOpacity
      onPress={onSelect}
      disabled={disabled}
      style={[
        styles.component_card_container,
        styles.component_card_interactive,
        styles.surveyOption,
        selected && styles.surveyOption_selected,
      ]}
    >
      <View style={styles.component_card_content}>
        <Text
          style={[
            styles.text_body,
            selected && { color: theme.colors.primary }
          ]}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
