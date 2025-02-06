import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import styles from './config/styles';
import EnhancedCard from './components/EnhancedCard';
import RadarChart from './components/RadarChart';
import type { RootStackParamList } from './types/navigation';

const moods = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😌', label: 'Calm' },
  { emoji: '😔', label: 'Sad' },
  { emoji: '😤', label: 'Angry' },
  { emoji: '😰', label: 'Anxious' },
  { emoji: '😴', label: 'Tired' },
];

export default function MoodScreen() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const { returnTo = 'tabs/home' } = useLocalSearchParams<RootStackParamList['mood']>();

  const handleMoodSelect = (index: number) => {
    setSelectedMood(index);
  };

  const handleSubmit = async () => {
    if (selectedMood === null) return;

    try {
      // TODO: Save mood to backend
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
            Select the emoji that best matches your current mood
          </Text>
        </View>

        <View style={styles.component_recommendations_grid}>
          {moods.map((mood, index) => (
            <EnhancedCard
              key={index}
              style={[
                styles.component_card_elevated,
                selectedMood === index && styles.component_card_selected,
              ]}
              onPress={() => handleMoodSelect(index)}
            >
              <Text style={styles.text_heading1}>{mood.emoji}</Text>
              <Text style={styles.text_caption}>{mood.label}</Text>
            </EnhancedCard>
          ))}
        </View>

        {selectedMood !== null && (
          <View style={styles.mood_chartContainer}>
            <Text style={[styles.text_heading2, styles.mood_chartTitle]}>
              Your Mood Pattern
            </Text>
            <RadarChart
              data={[
                { value: 0.8, label: 'Mon' },
                { value: 0.6, label: 'Tue' },
                { value: 0.9, label: 'Wed' },
                { value: 0.7, label: 'Thu' },
                { value: 0.5, label: 'Today' },
              ]}
            />
          </View>
        )}

        <View style={styles.layout_footer}>
          <Button
            mode="contained"
            onPress={handleSubmit}
            disabled={selectedMood === null}
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
