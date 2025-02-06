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
    <View style={styles.styles.layout.container}>
      <ScrollView
        style={styles.styles.layout.scrollView}
        contentContainerStyle={styles.styles.layout.content}
      >
        <View style={styles.styles.layout.header}>
          <Text style={styles.styles.text.heading1}>How are you feeling?</Text>
          <Text style={[styles.styles.text.body, { marginTop: 8 }]}>
            Select the emoji that best matches your current mood
          </Text>
        </View>

        <View style={styles.styles.component.recommendations.grid}>
          {moods.map((mood, index) => (
            <EnhancedCard
              key={index}
              style={[
                styles.styles.component.card.elevated,
                selectedMood === index && styles.styles.component.card.selected,
              ]}
              onPress={() => handleMoodSelect(index)}
            >
              <Text style={styles.styles.text.heading1}>{mood.emoji}</Text>
              <Text style={styles.styles.text.caption}>{mood.label}</Text>
            </EnhancedCard>
          ))}
        </View>

        {selectedMood !== null && (
          <View style={{ marginTop: 24 }}>
            <Text style={[styles.styles.text.heading2, { marginBottom: 16 }]}>
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

        <View style={styles.styles.layout.footer}>
          <Button
            mode="contained"
            onPress={handleSubmit}
            disabled={selectedMood === null}
            style={styles.styles.button.contained}
          >
            Save Mood
          </Button>

          <Button
            mode="outlined"
            onPress={handleSkip}
            style={[styles.styles.button.outlined, { marginTop: 8 }]}
          >
            Skip
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
