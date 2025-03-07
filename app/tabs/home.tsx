import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Button, Surface, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { miscStyles, typographyStyles } from '../config';
import RadarChart from '../components/RadarChart';
import RecentActivities from '../components/RecentActivities';
import ExerciseProgress from '../components/ExerciseProgress';
import QuickActions from '../components/QuickActions';
import type { AppTheme } from '../types/theme';

// Rest of your imports and data...
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
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Radar Chart Section */}
      <Surface style={styles.section} elevation={1}>
        <Text variant="headlineMedium" style={styles.sectionTitle}>
          Your Progress
        </Text>
        <RadarChart data={radarData} />
      </Surface>

      {/* Exercise Progress Section */}
      <Surface style={styles.section} elevation={1}>
        <Text variant="headlineMedium" style={styles.sectionTitle}>
          Exercise Progress
        </Text>
        <ExerciseProgress exercises={breathExercises} currentStep={nextExercise?.id} />
        {nextExercise && (
          <Button
            mode="contained"
            onPress={handleStartExercise}
            style={styles.actionButton}
            labelStyle={typographyStyles.text_button}
          >
            Start {nextExercise.title}
          </Button>
        )}
      </Surface>

      {/* Quick Actions Section */}
      <QuickActions />

      {/* Recent Activities Section */}
      <Surface style={styles.section} elevation={1}>
        <Text variant="headlineMedium" style={styles.sectionTitle}>
          Recent Activities
        </Text>
        <RecentActivities activities={recentActivities} />
      </Surface>
    </ScrollView>
  );
}

// Add consistent styles following Material Design principles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F7F4', // Use theme.colors.background
  },
  contentContainer: {
    padding: 16, // Follow 8dp grid (16 = 8*2)
    paddingBottom: 32, // Additional padding at bottom for better scrolling
  },
  section: {
    borderRadius: 12, // Material Design M3 card radius
    marginBottom: 16, // Follow 8dp grid (16 = 8*2)
    padding: 16, // Consistent internal padding
    elevation: 1, // Consistent elevation for all cards
  },
  sectionTitle: {
    marginBottom: 16, // Follow 8dp grid (16 = 8*2)
    fontSize: 20, // Material Design title large
    fontWeight: '500', 
    letterSpacing: 0.15, // Material Design spec
  },
  actionButton: {
    marginTop: 24,
    marginBottom: 8,
    marginHorizontal: 16, // Proper horizontal margins
    borderRadius: 20, // MD3 spec for filled button
    height: 40, // Standard button height
    elevation: 2, // Add proper elevation
  },
});
