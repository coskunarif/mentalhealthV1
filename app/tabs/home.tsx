import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Link, router } from 'expo-router';
import styles from '../config/styles';
import RadarChart from '../components/RadarChart';
import RecentActivities from '../components/RecentActivities';

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
  { id: 1, title: 'Breath Exercise 1', duration: '15 min', isCompleted: true },
  { id: 2, title: 'Breath Exercise 2', duration: '20 min', isCompleted: true },
  { id: 3, title: 'Breath Exercise 3', duration: '15 min', isCompleted: false },
  { id: 4, title: 'Breath Exercise 4', duration: '20 min', isCompleted: false },
  { id: 5, title: 'Breath Exercise 5', duration: '25 min', isCompleted: false },
];

export default function Home() {
  const nextExercise = breathExercises.find(exercise => !exercise.isCompleted);

  const handleStartExercise = () => {
    if (nextExercise) {
      router.push(`/breath-exercise?id=${nextExercise.id}`);
    }
  };

  return (
    <ScrollView style={styles.styles.screen.home.container}>
      <View style={styles.styles.screen.home.content}>
        {/* Progress Chart */}
        <View style={{ marginBottom: 24 }}>
          <Text style={styles.styles.text.heading2}>Your Progress</Text>
          <RadarChart data={radarData} />
        </View>

        {/* Exercise Progress */}
        <View style={{ marginBottom: 24 }}>
          <Text style={[styles.styles.text.heading3, { marginBottom: 16 }]}>Exercise Progress</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            {breathExercises.map(exercise => (
              <View
                key={exercise.id}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: exercise.isCompleted ? styles.styles.colors.primary : styles.styles.colors.surfaceVariant,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={[styles.styles.text.body, { color: exercise.isCompleted ? styles.styles.colors.surface : styles.styles.colors.text }]}>
                  {exercise.id}
                </Text>
              </View>
            ))}
          </View>
          {nextExercise && (
            <Button
              mode="contained"
              onPress={handleStartExercise}
              style={{ marginTop: 16 }}
              labelStyle={styles.styles.text.button}
            >
              Start Exercise {nextExercise.id}
            </Button>
          )}
        </View>

        {/* Quick Actions */}
        <View style={{ flexDirection: 'row', gap: 16, marginBottom: 24 }}>
          <Link href="/survey" asChild style={{ flex: 1 }}>
            <Button
              mode="outlined"
              icon="clipboard-text"
              contentStyle={{ height: 80 }}
              labelStyle={[styles.styles.text.button, { color: styles.styles.colors.primary }]}
            >
              Take Survey
            </Button>
          </Link>

          <Link href="/mood" asChild style={{ flex: 1 }}>
            <Button
              mode="outlined"
              icon="emoticon"
              contentStyle={{ height: 80 }}
              labelStyle={[styles.styles.text.button, { color: styles.styles.colors.primary }]}
            >
              Track Mood
            </Button>
          </Link>
        </View>

        {/* Recent Activities */}
        <RecentActivities activities={recentActivities} />
      </View>
    </ScrollView>
  );
}
