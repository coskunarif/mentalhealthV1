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

const relatedMoods: { [key: string]: string[] } = {
  'Shame': ['Humiliation'],
  'Guilt': ['Grief', 'Regret'],
  'Fear': ['Anxiety'],
  'Anger': ['Hate', 'Aggression']
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

  const renderSliderCard = (mood: MoodType) => (
    <Card 
      key={mood.label}
      style={[
        styles.component_card_elevated, 
        styles.mood_slider_card,
        { padding: 6, marginVertical: 1 }
      ]}
    >
      <Card.Content style={{ gap: 2 }}>
        <View style={styles.mood_headerRow}>
          <MaterialCommunityIcons
            name={mood.icon as any}
            size={14}
            color={mood.color}
          />
          <Text style={[styles.text_body, { fontSize: 11 }]}>{mood.label}</Text>
        </View>
        <Slider
          value={mood.value}
          minimumValue={0}
          maximumValue={100}
          step={1}
          thumbTintColor={getSliderColor(mood.value)}
          minimumTrackTintColor={getSliderColor(mood.value)}
          onValueChange={onSliderChange}
          style={{ height: 16 }}
        />
        <View style={[styles.mood_sliderLabels, { marginTop: -2 }]}>
          <Text style={[styles.text_caption, { fontSize: 9 }]}>Low</Text>
          <Text style={[styles.text_caption, { fontSize: 9 }]}>High</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView 
        style={[styles.layout_scrollView, { padding: 16 }]}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text style={styles.header_shadow}>How are you feeling?</Text>
        
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
                size={28}
                color={mood.color}
              />
              <Text style={[styles.text_caption, { marginTop: 4 }]}>{mood.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedMood && (
          <View style={{ gap: 4 }}>
            {renderSliderCard(selectedMood)}
            {relatedMoods[selectedMood.label]?.map(relatedMood => {
              const relatedMoodData = {
                ...selectedMood,
                label: relatedMood,
                value: 0,
              };
              return renderSliderCard(relatedMoodData);
            })}
          </View>
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