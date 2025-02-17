import React, { useState, useEffect } from 'react';
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
  duration: number;
  isSelected: boolean;
};

type Props = {
  moods: MoodType[];
  selectedMood: MoodType | null;
  onMoodSelect: (index: number) => void;
  onSliderChange: (value: number, label: string) => void;
  onDurationChange: (value: number) => void;
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
  onDurationChange,
  onNext,
  onFinish,
}: Props) {
  const [mainSliderValues, setMainSliderValues] = useState<{ [key: string]: number }>({});
  const [mainSliderColors, setMainSliderColors] = useState<{ [key: string]: string }>({});
  const [relatedMoodValues, setRelatedMoodValues] = useState<{ [key: string]: number }>({});
  const [relatedSliderColors, setRelatedSliderColors] = useState<{ [key: string]: string }>({});

  const getSliderColor = (value: number) => {
    if (value <= 33) return '#4CAF50'; // Green for low
    if (value <= 66) return '#FFC107'; // Yellow for medium
    return '#F44336'; // Red for high
  };

  const updateSliderColor = (value: number, label: string, isRelated: boolean) => {
    const color = getSliderColor(value);
    if (isRelated) {
      setRelatedSliderColors(prev => ({
        ...prev,
        [label]: color
      }));
    } else {
      setMainSliderColors(prev => ({
        ...prev,
        [label]: color
      }));
    }
  };

  const handleRelatedMoodChange = (value: number, label: string) => {
    setRelatedMoodValues(prev => ({
      ...prev,
      [label]: value
    }));
    updateSliderColor(value, label, true);
    onSliderChange(value, label);
  };

  const handleMainSliderChange = (value: number, label: string) => {
    setMainSliderValues(prev => ({
      ...prev,
      [label]: value
    }));
    updateSliderColor(value, label, false);
    onSliderChange(value, label);
  };

  const getDurationLabel = (value: number) => {
    if (value <= 33) return '< 3 months';
    if (value <= 66) return '6 months';
    return '> 1 year';
  };

  const renderDurationSlider = (mood: MoodType) => (
    <Card 
      style={[
        styles.component_card_elevated, 
        styles.mood_slider_card,
        { padding: 6, marginBottom: 8 }
      ]}
    >
      <Card.Content style={{ gap: 2 }}>
        <View style={styles.mood_headerRow}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={24}
            color={theme.colors.primary}
          />
          <Text style={[styles.text_body, { fontSize: 11 }]}>How long</Text>
        </View>
        <Slider
          value={mood.duration}
          minimumValue={0}
          maximumValue={100}
          step={33}
          thumbTintColor={theme.colors.primary}
          minimumTrackTintColor={theme.colors.primary}
          onValueChange={onDurationChange}
          style={{ height: 16 }}
        />
        <View style={[styles.mood_sliderLabels, { marginTop: -2 }]}>
          <Text style={[styles.text_caption, { fontSize: 9 }]}>{'< 3 months'}</Text>
          <Text style={[styles.text_caption, { fontSize: 9 }]}>6 months</Text>
          <Text style={[styles.text_caption, { fontSize: 9 }]}>{'> 1 year'}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  const renderSliderCard = (mood: MoodType, isRelated: boolean = false) => {
    const sliderValue = isRelated 
      ? (relatedMoodValues[mood.label] || 0) 
      : (mainSliderValues[mood.label] || mood.value);
    const sliderColor = isRelated 
      ? (relatedSliderColors[mood.label] || getSliderColor(0))
      : (mainSliderColors[mood.label] || getSliderColor(sliderValue));
    
    return (
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
              size={24}
              color={mood.color}
            />
            <Text style={[styles.text_body, { fontSize: 11 }]}>{mood.label}</Text>
          </View>
          <Slider
            value={sliderValue}
            minimumValue={0}
            maximumValue={100}
            step={1}
            thumbTintColor={sliderColor}
            minimumTrackTintColor={sliderColor}
            maximumTrackTintColor="#E0E0E0"
            onValueChange={(value) => 
              isRelated 
                ? handleRelatedMoodChange(value, mood.label)
                : handleMainSliderChange(value, mood.label)
            }
            style={{ height: 16 }}
          />
          <View style={[styles.mood_sliderLabels, { marginTop: -2 }]}>
            <Text style={[styles.text_caption, { fontSize: 9 }]}>Low</Text>
            <Text style={[styles.text_caption, { fontSize: 9 }]}>High</Text>
          </View>
        </Card.Content>
      </Card>
    );
  };

  React.useEffect(() => {
    if (selectedMood) {
      setMainSliderValues(prev => ({
        ...prev,
        [selectedMood.label]: selectedMood.value
      }));
      updateSliderColor(selectedMood.value, selectedMood.label, false);
    }
  }, [selectedMood?.label]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView 
        style={[styles.layout_scrollView, { padding: 16 }]}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text style={[styles.header_shadow, { textAlign: 'center', color: theme.colors.primary }]}>How are you feeling?</Text>
        
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
                size={40}
                color={mood.color}
              />
              <Text style={[styles.text_caption, { marginTop: 4 }]}>{mood.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedMood && (
          <View style={{ gap: 4 }}>
            {renderDurationSlider(selectedMood)}
            {renderSliderCard(selectedMood, false)}
            {relatedMoods[selectedMood.label]?.map(relatedMood => {
              const relatedMoodData = {
                ...selectedMood,
                label: relatedMood,
                value: relatedMoodValues[relatedMood] || 0,
                duration: selectedMood.duration,
              };
              return renderSliderCard(relatedMoodData, true);
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