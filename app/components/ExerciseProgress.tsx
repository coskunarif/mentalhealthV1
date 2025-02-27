import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { AppTheme } from '../types/theme';
import styles from '../config/ExerciseProgress.styles';

interface ExerciseProgressProps {
  exercises: { 
    id: string; 
    title: string; 
    duration: string; 
    isCompleted: boolean; 
  }[];
  currentStep: string | undefined;
}

const ExerciseProgress: React.FC<ExerciseProgressProps> = ({ exercises, currentStep }) => {
  const theme = useTheme<AppTheme>();

  const getStepStatus = (index: number, isCompleted: boolean, isCurrent: boolean) => {
    if (isCompleted) return 'completed';
    if (isCurrent) return 'current';
    return 'upcoming';
  };

  const getStepIcon = (status: 'completed' | 'current' | 'upcoming') => {
    switch (status) {
      case 'completed': return 'check-circle';
      case 'current': return 'circle-outline';
      case 'upcoming': return 'circle-outline';
    }
  };

  const getStepColors = (status: 'completed' | 'current' | 'upcoming') => {
    switch (status) {
      case 'completed':
        return { icon: theme.colors.secondary, text: theme.colors.onSurface, connector: theme.colors.secondary };
      case 'current':
        return { icon: theme.colors.primary, text: theme.colors.onSurface, connector: theme.colors.outlineVariant };
      case 'upcoming':
        return { icon: theme.colors.outlineVariant, text: theme.colors.onSurfaceVariant, connector: theme.colors.outlineVariant };
    }
  };

  return (
    <View style={styles.container}>
      {exercises.map((exercise, index) => {
        const isCurrent = exercise.id === currentStep;
        const status = getStepStatus(index, exercise.isCompleted, isCurrent);
        const colors = getStepColors(status);
        const isLast = index === exercises.length - 1;
        return (
          <View key={exercise.id} style={styles.stepContainer}>
            <View style={styles.stepContent}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name={getStepIcon(status)} size={24} color={colors.icon} />
                {!isLast && (
                  <View style={[styles.connector, { backgroundColor: colors.connector }]} />
                )}
              </View>
              <View style={styles.textContainer}>
                <Text style={[styles.stepNumber, { color: colors.text }]}>
                  Step {index + 1}
                </Text>
                <Text style={[styles.stepTitle, { color: colors.text }]} numberOfLines={1}>
                  {exercise.title}
                </Text>
                <Text style={[styles.stepDuration, { color: theme.colors.onSurfaceVariant }]}>
                  {exercise.duration}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default ExerciseProgress;
