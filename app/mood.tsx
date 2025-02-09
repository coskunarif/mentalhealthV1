import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import styles from './config/styles';
import type { RootStackParamList } from './types/navigation';
import Slider from '@react-native-community/slider';
import colors from './config/colors';

export default function MoodScreen() {
  const moods = [
    { label: 'Shame', color: colors.colors.moods.shame },
    { label: 'Guilt', color: colors.colors.moods.guilt },
    { label: 'Apathy', color: colors.colors.moods.apathy },
    { label: 'Grief', color: colors.colors.moods.grief },
    { label: 'Fear', color: colors.colors.moods.fear },
    { label: 'Desire', color: colors.colors.moods.desire },
    { label: 'Anger', color: colors.colors.moods.anger },
    { label: 'Pride', color: colors.colors.moods.pride },
    { label: 'Willfulness', color: colors.colors.moods.willfulness },
  ];

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
        style={[styles.layout_scrollView, { padding: 16, paddingBottom: 64 }]} // Added padding and paddingBottom
      >
        <View style={styles.layout_header}>
          <Text style={styles.text_heading3}>Describe your current mood?</Text>
        </View>

        <View>
          {moods.map((mood, index) => (
            <Card key={index} style={[styles.component_card_elevated, styles.mood_card]}>
              <Card.Content>
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
              </Card.Content>
            </Card>
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
