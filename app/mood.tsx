import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import styles from './config/styles';
import type { RootStackParamList } from './types/navigation';
import Slider from '@react-native-community/slider';

const moods = [
  { label: 'Shame', color: '#f44336' }, // Red
  { label: 'Guilt', color: '#e91e63' }, // Pink
  { label: 'Fear', color: '#9c27b0' }, // Purple
  { label: 'Desire', color: '#3f51b5' }, // Indigo
  { label: 'Grief', color: '#2196f3' }, // Blue
  { label: 'Anger', color: '#00bcd4' }, // Cyan
  { label: 'Pride', color: '#009688' }, // Teal
  { label: 'Courage', color: '#4caf50' }, // Green
  { label: 'Neutrality', color: '#8bc34a' }, // Light Green
  { label: 'Willingness', color: '#cddc39' }, // Lime
  { label: 'Acceptance', color: '#ffeb3b' }, // Yellow
  { label: 'Reason', color: '#ffc107' }, // Amber
  { label: 'Love', color: '#ff9800' }, // Orange
  { label: 'Joy', color: '#ff5722' }, // Deep Orange
  { label: 'Peace', color: '#795548' }, // Brown
];

export default function MoodScreen() {
  const [moodValues, setMoodValues] = useState<{ [key: string]: number }>(
    moods.reduce((acc, mood) => ({ ...acc, [mood.label]: 0 }), {})
  );
  const { returnTo = 'tabs/home' } = useLocalSearchParams<RootStackParamList['mood']>();

  const handleSliderChange = (moodLabel: string, value: number) => {
    setMoodValues((prevValues) => ({
      ...prevValues,
      [moodLabel]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // TODO: Save mood values to backend
      console.log(moodValues);
      router.replace(returnTo as keyof RootStackParamList);
    } catch (error) {
      console.error('Error saving mood:', error);
    }
  };

  const handleSkip = () => {
    router.replace(returnTo as keyof RootStackParamList);
  };

  return (
    <View style={styles.layout_container}>
      <ScrollView
        style={styles.layout_scrollView}
        contentContainerStyle={styles.layout_content}
      >
        <View style={styles.layout_header}>
          <Text style={styles.text_heading1}>How are you feeling?</Text>
          <Text style={[styles.text_body, styles.mood_subtitle]}>
            Adjust the sliders to reflect your current emotional state
          </Text>
        </View>

        <View>
          {moods.map((mood, index) => (
            <View key={index} style={styles.mood_sliderContainer}>
              <Text style={styles.text_body}>{mood.label}</Text>
              <Slider
                value={moodValues[mood.label]}
                minimumValue={0}
                maximumValue={100}
                step={1}
                thumbTintColor={mood.color}
                minimumTrackTintColor={mood.color}
                onValueChange={(value: number) => handleSliderChange(mood.label, value)}
              />
              <View style={styles.mood_sliderLabels}>
                <Text style={styles.text_caption}>Low</Text>
                <Text style={styles.text_caption}>High</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.layout_footer}>
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.button_contained}
          >
            Save Mood
          </Button>

          <Button
            mode="outlined"
            onPress={handleSkip}
            style={[styles.button_outlined, styles.mood_skipButton]}
          >
            Skip
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
