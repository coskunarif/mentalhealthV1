import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { AppTheme } from '../types/theme';
import styles from '../config/ExerciseProgress.styles';
import { Animated, Easing } from 'react-native';

interface ExerciseProgressProps {
  exercises: {
    id: string;
    title: string;
    duration: string;
    isCompleted: boolean;
  }[];
  currentStep: string | undefined;
}

const ExerciseProgress: React.FC<ExerciseProgressProps> = ({
  exercises,
  currentStep,
}) => {
  const theme = useTheme<AppTheme>();

  const [animations] = useState(() => 
    exercises.map(() => new Animated.Value(0))
  );

  useEffect(() => {
    // Animate completed steps
    exercises.forEach((exercise, index) => {
      if (exercise.isCompleted) {
        Animated.timing(animations[index], {
          toValue: 1,
          duration: 800,
          easing: Easing.elastic(1),
          useNativeDriver: true,
        }).start();
      }
    });
  }, [exercises]);

  const getStepStatus = (index: number, isCompleted: boolean, isCurrent: boolean) => {
    if (isCompleted) return 'completed';
    if (isCurrent) return 'current';
    return 'upcoming';
  };

const getStepIcon = (status: 'completed' | 'current' | 'upcoming') => {
  switch (status) {
    case 'completed':
      return 'check-circle';
    case 'current':
      return 'radiobox-marked';
    case 'upcoming':
      return 'radiobox-blank';
  }
};

  const getStepColors = (status: 'completed' | 'current' | 'upcoming') => {
  switch (status) {
    case 'completed':
      return {
        icon: theme.colors.secondary,
        text: theme.colors.onSurface,
        connector: theme.colors.secondary,
        connectorStyle: 'solid', // Solid line for completed
      };
    case 'current':
      return {
        icon: theme.colors.primary,
        text: theme.colors.onSurface,
        connector: theme.colors.primary,
        connectorStyle: 'dashed', // Dashed for in-progress
      };
    case 'upcoming':
      return {
        icon: theme.colors.outlineVariant,
        text: theme.colors.onSurfaceVariant,
        connector: theme.colors.outlineVariant,
        connectorStyle: 'dotted', // Dotted for upcoming
      };
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
                <Animated.View style={{
                  transform: [{ 
                    scale: animations[index].interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [1, 1.2, 1]
                    }) 
                  }]
                }}>
                  <MaterialCommunityIcons
                    name={getStepIcon(status)}
                    size={24}
                    color={colors.icon}
                  />
                </Animated.View>
                {!isLast && (
                  <View 
                    style={[
                      styles.connector, 
                      { 
                        backgroundColor: colors.connector, 
                        borderStyle: colors.connectorStyle as any 
                      }
                    ]} 
                  />
                )}
              </View>
              <View style={styles.textContainer}>
                <Text style={[styles.stepNumber, { color: colors.text, fontSize: 12, fontWeight: '500' }]}>
                  Step {index + 1}
                </Text>
                <Text style={[styles.stepTitle, { 
                  color: colors.text, 
                  fontSize: 16, 
                  fontWeight: '500',
                  marginVertical: 4 // Add proper spacing
                }]} numberOfLines={1}>
                  {exercise.title}
                </Text>
                <Text style={[styles.stepDuration, { 
                  color: theme.colors.onSurfaceVariant,
                  fontSize: 14
                }]}>
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
