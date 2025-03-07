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

  // Create styles inside the component with useMemo for performance
  const styles = React.useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme?.colors?.background || '#F2F7F4',
    },
    contentContainer: {
      padding: 16,
      paddingBottom: 32,
    },
    section: {
      borderRadius: 12, // Hardcode fallback values instead of theme?.componentSizes?.cardBorderRadius
      marginBottom: 16,
      padding: 16,
      backgroundColor: theme?.colors?.surface || '#FFFFFF',
      shadowColor: theme?.colors?.shadow || '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.5,
      elevation: 1,
    },
    sectionTitle: {
      marginBottom: 16,
      fontSize: 20,
      fontWeight: '500',
      letterSpacing: 0.15,
    },
    actionButton: {
      marginTop: 24,
      marginBottom: 8,
      marginHorizontal: 16,
      borderRadius: 20,
      height: 40,
      elevation: 2,
    },
  }), [theme]); // theme as dependency

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
            style={{
              marginTop: 16,
              marginBottom: 8,
              marginHorizontal: 16,
              borderRadius: theme.componentSizes?.buttonBorderRadius || 20, // Add fallback
              height: theme.componentSizes?.buttonHeight || 40, // Add fallback
              elevation: theme.colors.elevation?.level2 || 2,
              shadowColor: theme.colors.shadow,
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.3,
              shadowRadius: 2,
            }}
            labelStyle={{
              ...typographyStyles.text_button,
              // Prevent text truncation
              fontSize: 14,
              lineHeight: 20,
            }}
            // Add content max width to prevent text truncation
            contentStyle={{
              maxWidth: '100%',
              paddingHorizontal: 8,
            }}
          >
            {`Start ${nextExercise.title.split(' ').slice(-2).join(' ')}`} {/* Show only last two words if needed */}
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
