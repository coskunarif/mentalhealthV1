import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Text, Button, Surface, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { typographyStyles } from '../config';
// import { miscStyles, typographyStyles } from '../config';
import ExerciseProgress from '../components/ExerciseProgress';
import type { AppTheme } from '../types/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EnhancedButton from '../components/EnhancedButton';
import { ExerciseService } from '../services/exercise.service';
import { useAuth } from '../context/auth';

interface Exercise {
  id: string;
  title: string;
  duration: number;
  order: number; // Add order field
  // No isCompleted or boolean field
}

export default function ExercisesScreen() {
  const [templateExercises, setTemplateExercises] = useState<Exercise[]>([]);
  const [completedExerciseIds, setCompletedExerciseIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme<AppTheme>();
  const { user } = useAuth();
  const userId = user?.uid || '';

  // Find the next uncompleted exercise in the template
  const nextExercise = templateExercises.find((exercise) => !completedExerciseIds.includes(exercise.id));

  useEffect(() => {
    // Skip if no user ID is available
    if (!userId) {
      setError('Please sign in to view your exercises');
      setIsLoading(false);
      return;
    }

    const fetchUserExercises = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // 1. Get the user's template exercises in order
        const exercises = await ExerciseService.getUserTemplateExercises(userId);
        setTemplateExercises(exercises);

        // 2. Get the user's completed exercise IDs
        const completedIds = await ExerciseService.getCompletedExerciseIds(userId);
        setCompletedExerciseIds(completedIds);

        console.log(`Loaded ${exercises.length} exercises, ${completedIds.length} completed`);
      } catch (error) {
        console.error('Error fetching user exercises:', error);
        setError('Failed to load exercises. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserExercises();
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
      router.push(`/player?exerciseId=${nextExercise.id}`);
    }
  };

  const completedExercisesCount = completedExerciseIds.length;
  const totalExercises = templateExercises.length;
  const completionRate = totalExercises > 0 ? Math.round((completedExercisesCount / totalExercises) * 100) : 0;

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ marginTop: 16, color: theme.colors.onSurfaceVariant }}>Loading your exercises...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: theme.colors.background }}>
        <MaterialCommunityIcons name="alert-circle-outline" size={48} color={theme.colors.error} />
        <Text style={{ marginTop: 16, color: theme.colors.onSurface, fontSize: 18, textAlign: 'center' }}>{error}</Text>
        {userId && (
          <Button
            mode="contained"
            onPress={() => {
              setIsLoading(true);
              setError(null);
              ExerciseService.getUserTemplateExercises(userId)
                .then(exercises => {
                  setTemplateExercises(exercises);
                  return ExerciseService.getCompletedExerciseIds(userId);
                })
                .then(completedIds => {
                  setCompletedExerciseIds(completedIds);
                  setIsLoading(false);
                })
                .catch(err => {
                  console.error('Error retrying fetch:', err);
                  setError('Failed to load exercises. Please try again.');
                  setIsLoading(false);
                });
            }}
            style={{ marginTop: 24 }}
          >
            Retry
          </Button>
        )}
      </View>
    );
  }

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
            name="lungs"
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
            <Text style={styles.statValue}>{completedExercisesCount}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalExercises - completedExercisesCount}</Text>
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
        <ExerciseProgress
          exercises={templateExercises}
          currentStep={nextExercise?.id}
          completedExerciseIds={completedExerciseIds}
        />
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
        {completedExercisesCount > 0 ? (
          <ExerciseProgress
            exercises={templateExercises.filter(ex => completedExerciseIds.includes(ex.id))}
            currentStep={undefined}
            completedExerciseIds={completedExerciseIds}
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
