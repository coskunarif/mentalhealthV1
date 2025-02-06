import React, { useEffect, useRef } from 'react';
import { View, ViewStyle, Animated } from 'react-native';
import styles from '../config/styles';
import { useTheme } from 'react-native-paper';
import type { AppTheme } from '../types/theme';

interface WaveformVisualizerProps {
  isPlaying?: boolean;
  amplitudes?: number[];
  style?: ViewStyle;
}

const BAR_COUNT = 20;
const MAX_BAR_HEIGHT = 40;

export default function WaveformVisualizer({
  isPlaying = false,
  amplitudes,
  style
}: WaveformVisualizerProps) {
  const theme = useTheme<AppTheme>();
  const barHeights = useRef(
    Array.from({ length: BAR_COUNT }, () => new Animated.Value(0.3))
  ).current;

  useEffect(() => {
    if (isPlaying) {
      // If amplitudes are provided, use them for visualization
      if (amplitudes) {
        const animations = barHeights.map((bar, index) => {
          const amplitude = amplitudes[index % amplitudes.length];
          return Animated.timing(bar, {
            toValue: 0.3 + (amplitude * 0.7),
            duration: 500,
            useNativeDriver: true,
          });
        });
        Animated.sequence(animations).start();
      } else {
        // Default random animation when no amplitudes provided
        const animations = barHeights.map((bar) =>
          Animated.sequence([
            Animated.timing(bar, {
              toValue: Math.random() * 0.7 + 0.3,
              duration: Math.random() * 1000 + 500,
              useNativeDriver: true,
            }),
            Animated.timing(bar, {
              toValue: 0.3,
              duration: Math.random() * 1000 + 500,
              useNativeDriver: true,
            }),
          ])
        );

        Animated.parallel(animations).start(() => {
          if (isPlaying) {
            animations.forEach((anim) => anim.start());
          }
        });

        return () => {
          animations.forEach((anim) => anim.stop());
        };
      }
    } else {
      // Reset bars when paused
      barHeights.forEach((bar) => {
        Animated.timing(bar, {
          toValue: 0.3,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [isPlaying, amplitudes]);

  return (
    <View style={[styles.waveformVisualizer_container, style]}>
      {barHeights.map((height, index) => (
        <Animated.View
          key={index}
          style={[
            styles.waveformVisualizer_bar,
            {
              backgroundColor: theme.colors.primary,
              transform: [
                {
                  scaleY: height,
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
}
