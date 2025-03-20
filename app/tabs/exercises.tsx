import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Button, Surface, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { typographyStyles } from '../config';
// import { miscStyles, typographyStyles } from '../config';
import ExerciseProgress from '../components/ExerciseProgress';
import type { AppTheme } from '../types/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EnhancedButton from '../components/EnhancedButton';
import { ExerciseService } from '../services/exercise.service';

interface Exercise {
  id: string;
  title: string;
  duration: number;
  isCompleted: boolean;
}

export default function ExercisesScreen() {
  const [breathExercises, setBreathExercises] = useState<Exercise[]>([]);
  const nextExercise = breathExercises.find((exercise) => !exercise.isCompleted);
  const theme = useTheme<AppTheme>();
  const userId = 'user-id'; // Replace with actual user ID

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const exercises = await ExerciseService.getExercises(userId);
        setBreathExercises(exercises);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises();
  }, [userId]);

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
      borderRadius: theme.componentSizes?.cardBorderRadius || 12,
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
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 16,
      paddingVertical: 8,
    },
    statItem: {
      alignItems: 'center',
    },
    statValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    statLabel: {
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
    },
  }), [theme]);

  const handleStartExercise = () => {
    if (nextExercise) {
      router.push(`/player?meditationId=${nextExercise.id}`);
    }
  };

  // Calculate exercise statistics
  const completedExercises = breathExercises.filter(ex => ex.isCompleted).length;
  const totalExercises = breathExercises.length;
  const completionRate = Math.round((completedExercises / totalExercises) * 100);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Welcome Card */}
      <Surface style={[styles.section, { marginBottom: 20 }]} elevation={2}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text variant="headlineSmall" style={{ marginBottom: 8, color: theme.colors.primary }}>
              Your Mindfulness Journey
            </Text>
            <Text style={{ color: theme.colors.onSurfaceVariant }}>
              Consistent practice leads to improved wellbeing. Complete your daily exercises to build a healthy mental habit.
            </Text>
          </View>
          <MaterialCommunityIcons
            name="meditation"
            size={48}
            color={theme.colors.primary}
            style={{ marginLeft: 16 }}
          />
        </View>
      </Surface>

      {/* Exercise Statistics */}
      <Surface style={styles.section} elevation={1}>
        <Text variant="headlineMedium" style={styles.sectionTitle}>
          Exercise Overview
        </Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{completedExercises}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalExercises - completedExercises}</Text>
            <Text style={styles.statLabel}>Remaining</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{completionRate}%</Text>
            <Text style={styles.statLabel}>Progress</Text>
          </View>
        </View>
      </Surface>

      {/* Exercise Progress Section */}
      <Surface style={styles.section} elevation={1}>
        <Text variant="headlineMedium" style={styles.sectionTitle}>
          Exercise Progress
        </Text>
        <ExerciseProgress exercises={breathExercises} currentStep={nextExercise?.id} />
        {nextExercise && (
          <EnhancedButton
            mode="contained"
            onPress={handleStartExercise}
            style={{
              marginTop: 16,
              marginBottom: 8,
              marginHorizontal: 16,
            }}
            variant="exercise"
            icon="play-circle"
          >
            {`Start ${nextExercise.title.split(' ').slice(-2).join(' ')}`}
          </EnhancedButton>
        )}
      </Surface>

      {/* Completed Exercises Section */}
      <Surface style={styles.section} elevation={1}>
        <Text variant="headlineMedium" style={styles.sectionTitle}>
          Completed Exercises
        </Text>
        {completedExercises > 0 ? (
          <ExerciseProgress 
            exercises={breathExercises.filter(ex => ex.isCompleted)} 
            currentStep={undefined} 
          />
        ) : (
          <Text style={{ textAlign: 'center', padding: 16, color: theme.colors.onSurfaceVariant }}>
            No completed exercises yet. Start your mindfulness journey today!
          </Text>
        )}
      </Surface>
    </ScrollView>
  );
}
