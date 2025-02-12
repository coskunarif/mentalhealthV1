import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import styles from '../config/styles';
import { theme } from '../config/theme';

type MoodType = {
  label: string;
  color: string;
  icon: string;
  value: number;
  isSelected: boolean;
};

type Props = {
  moods: MoodType[];
  selectedMood: MoodType | null;
  onMoodSelect: (index: number) => void;
  onSliderChange: (value: number) => void;
  onNext: () => void;
  onFinish: () => void;
};

export function MoodSelector({ 
  moods, 
  selectedMood, 
  onMoodSelect, 
  onSliderChange, 
  onNext,
  onFinish,
}: Props) {
  const getSliderColor = (value: number) => {
    if (value <= 33) return '#4CAF50';
    if (value <= 66) return '#FFC107';
    return '#F44336';
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView 
        style={[styles.layout_scrollView, { padding: 16 }]}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text style={styles.text_heading3}>How are you feeling?</Text>
        <Text style={styles.text_body}>Select all that apply:</Text>
        
        <View style={styles.mood_gridContainer}>
          {moods.map((mood, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onMoodSelect(index)}
              style={[
                styles.mood_item,
                selectedMood?.label === mood.label && { backgroundColor: mood.color + '20' }
              ]}
            >
              <MaterialCommunityIcons
                name={mood.icon as any}
                size={32}
                color={mood.color}
              />
              <Text style={styles.text_caption}>{mood.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedMood && (
          <Card style={[styles.component_card_elevated, styles.mood_slider_card]}>
            <Card.Content>
              <View style={styles.mood_headerRow}>
                <MaterialCommunityIcons
                  name={selectedMood.icon as any}
                  size={24}
                  color={selectedMood.color}
                />
                <Text style={styles.text_body}>{selectedMood.label}</Text>
              </View>
              <Slider
                value={selectedMood.value}
                minimumValue={0}
                maximumValue={100}
                step={1}
                thumbTintColor={getSliderColor(selectedMood.value)}
                minimumTrackTintColor={getSliderColor(selectedMood.value)}
                onValueChange={onSliderChange}
              />
              <View style={styles.mood_sliderLabels}>
                <Text style={styles.text_caption}>Low</Text>
                <Text style={styles.text_caption}>High</Text>
              </View>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
      <View style={styles.mood_buttonContainer}>
        <Button
          mode="outlined"
          onPress={onNext}
          style={[styles.mood_button, styles.button_outlined]}
          labelStyle={styles.mood_buttonText}
        >
          Next
        </Button>
        <Button
          mode="contained"
          onPress={onFinish}
          style={[styles.mood_button, styles.button_contained]}
          labelStyle={[styles.mood_buttonText, { color: theme.colors.onPrimary }]}
        >
          Finish
        </Button>
      </View>
    </View>
  );
} 