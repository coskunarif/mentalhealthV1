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
    duration: string | number; // Accept both string and number
    isCompleted: boolean;
  }[];
  currentStep: string | undefined;
}

const formatDuration = (duration: string | number): string => {
  if (typeof duration === 'number') {
    // Format number as needed (e.g., convert minutes to "X min")
    return `${duration} min`;
  }
  return duration;
};

const ExerciseProgress: React.FC<ExerciseProgressProps> = ({
  exercises,
  currentStep,
}) => {
  const theme = useTheme<AppTheme>();

  // Initialize animations array with default values
  const [animations, setAnimations] = useState<Animated.Value[]>([]);
  
  useEffect(() => {
    // Initialize animations with proper values when exercises change
    if (Array.isArray(exercises)) {
      setAnimations(exercises.map(() => new Animated.Value(0)));
    }
  }, [exercises?.length]);

  useEffect(() => {
    // Animate completed steps - only run if animations and exercises are properly initialized
    if (animations.length > 0 && Array.isArray(exercises)) {
      exercises.forEach((exercise, index) => {
        if (exercise.isCompleted && animations[index]) {
          Animated.timing(animations[index], {
            toValue: 1,
            duration: 800,
            easing: Easing.elastic(1),
            useNativeDriver: true,
          }).start();
        }
      });
    }
  }, [exercises, animations]);

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

  // Safeguard against undefined exercises
  if (!Array.isArray(exercises) || exercises.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No exercises available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {exercises.map((exercise, index) => {
        const isCurrent = exercise.id === currentStep;
        const status = getStepStatus(index, exercise.isCompleted, isCurrent);
        const colors = getStepColors(status);
        const isLast = index === exercises.length - 1;
        
        // Guard against undefined animation value
        const animationValue = animations[index] || new Animated.Value(0);
        
        return (
          <View key={exercise.id || `exercise-${index}`} style={styles.stepContainer}>
            <View style={styles.stepContent}>
              <View style={styles.iconContainer}>
                <Animated.View style={{
                  transform: [{ 
                    scale: animationValue.interpolate({
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
                  marginVertical: 4
                }]} numberOfLines={1}>
                  {exercise.title || `Exercise ${index + 1}`}
                </Text>
                <Text style={[styles.stepDuration, { 
                  color: theme.colors.onSurfaceVariant,
                  fontSize: 14
                }]}>                  
                  {formatDuration(exercise.duration || '0 min')}
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
