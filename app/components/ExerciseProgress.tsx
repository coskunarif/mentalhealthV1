import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import styles from '../config/styles';
import type { AppTheme } from '../types/theme';

interface ExerciseProgressProps {
  exercises: { id: string; title: string; duration: string; isCompleted: boolean }[];
  currentStep: string | undefined;
}

const ExerciseProgress: React.FC<ExerciseProgressProps> = ({
  exercises,
  currentStep,
}) => {
  const theme = useTheme<AppTheme>();

  return (
    <View style={styles.exerciseProgress_container}>
      {exercises.map((exercise, index) => {
        const isCurrent = exercise.id === currentStep;
        const isCompleted = exercise.isCompleted;

        return (
          <View key={exercise.id} style={styles.exerciseProgress_step}>
            <View
              style={[
                styles.exerciseProgress_circle,
                isCompleted
                  ? { backgroundColor: theme.colors.secondary }
                  : isCurrent
                  ? { backgroundColor: theme.colors.primary }
                  : { backgroundColor: theme.colors.surfaceVariant },
              ]}
            >
              <Text
                style={[
                  styles.exerciseProgress_circleText,
                  isCompleted || isCurrent
                    ? { color: theme.colors.surface }
                    : { color: theme.colors.onSurfaceVariant },
                ]}
              >
                {index + 1}
              </Text>
            </View>
            <Text style={styles.exerciseProgress_label}>{exercise.id}</Text>
            {index < exercises.length - 1 && (
              <View
                style={[
                  styles.exerciseProgress_bar,
                  isCompleted
                    ? { backgroundColor: theme.colors.secondary }
                    : { backgroundColor: theme.colors.surfaceVariant },
                ]}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};

export default ExerciseProgress;
