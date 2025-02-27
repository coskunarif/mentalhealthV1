import React from 'react';
import { ScrollView } from 'react-native';
import { Text, Button, Surface, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { miscStyles, typographyStyles } from '../config';
import RadarChart from '../components/RadarChart';
import RecentActivities from '../components/RecentActivities';
import ExerciseProgress from '../components/ExerciseProgress';
import QuickActions from '../components/QuickActions';
import type { AppTheme } from '../types/theme';

const radarData = [
  { label: 'Balance past memories', value: 0.8 },
  { label: 'Change your opinion', value: 0.6 },
  { label: 'Support dreams', value: 0.7 },
  { label: 'Gain awareness', value: 0.9 },
  { label: 'Breath up', value: 0.75 },
];

const recentActivities = [
  {
    id: '12',
    type: 'breath' as const,
    title: 'Breath up',
    subtitle: 'Breath exercise 12',
    duration: 18.5,
  },
  {
    id: '5',
    type: 'dreams' as const,
    title: 'Support your dreams',
    subtitle: 'Dreams exercise 5',
    duration: 14.5,
  },
  {
    id: '8',
    type: 'awareness' as const,
    title: 'Gain awareness',
    subtitle: 'Awareness exercise 8',
    duration: 23.5,
  },
];

const breathExercises = [
  { id: 'Step 1', title: 'Breath Exercise Step 1', duration: '15 min', isCompleted: true },
  { id: 'Step 2', title: 'Breath Exercise Step 2', duration: '20 min', isCompleted: true },
  { id: 'Step 3', title: 'Breath Exercise Step 3', duration: '15 min', isCompleted: false },
  { id: 'Step 4', title: 'Breath Exercise Step 4', duration: '20 min', isCompleted: false },
  { id: 'Step 5', title: 'Breath Exercise Step 5', duration: '25 min', isCompleted: false },
];

export default function Home() {
  const nextExercise = breathExercises.find((exercise) => !exercise.isCompleted);
  const theme = useTheme<AppTheme>();

  const handleStartExercise = () => {
    if (nextExercise) {
      router.push(`/player?meditationId=${nextExercise.id}`);
    }
  };

  return (
    <ScrollView
      style={miscStyles.screen_home_container}
      contentContainerStyle={{ padding: 16 }}
    >
      {/* Radar Chart Section */}
      <Surface style={miscStyles.home_sectionSurface}>
        <Text variant="headlineMedium" style={miscStyles.home_sectionTitle}>
          Your Progress
        </Text>
        <RadarChart data={radarData} />
      </Surface>

      {/* Exercise Progress Section */}
      <Surface style={miscStyles.home_sectionSurface}>
        <Text variant="headlineMedium" style={miscStyles.home_sectionTitle}>
          Exercise Progress
        </Text>
        <ExerciseProgress exercises={breathExercises} currentStep={nextExercise?.id} />
        {nextExercise && (
          <Button
            mode="contained"
            onPress={handleStartExercise}
            style={{ marginTop: 16 }}
            labelStyle={typographyStyles.text_button}
          >
            Start {nextExercise.title}
          </Button>
        )}
      </Surface>

      {/* Quick Actions Section */}
      <QuickActions />

      {/* Recent Activities Section */}
      <Surface style={miscStyles.home_sectionSurface}>
        <Text variant="headlineMedium" style={miscStyles.home_sectionTitle}>
          Recent Activities
        </Text>
        <RecentActivities activities={recentActivities} />
      </Surface>
    </ScrollView>
  );
}
