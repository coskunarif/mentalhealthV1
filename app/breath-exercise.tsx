import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { useLocalSearchParams, router } from 'expo-router';
import styles from './config/styles';
import PlayerControls from './components/PlayerControls';
import WaveformVisualizer from './components/WaveformVisualizer';

const EXERCISE_DURATION = 300; // 5 minutes in seconds

export default function BreathExercise() {
  const { id } = useLocalSearchParams();
  const [timeRemaining, setTimeRemaining] = useState(EXERCISE_DURATION);
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveformData, setWaveformData] = useState<number[]>(
    Array.from({ length: 50 }, () => 0.3)
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => time - 1);
        // Update waveform data to simulate breathing pattern
        setWaveformData(prev => {
          const newData = [...prev];
          newData.shift();
          newData.push(Math.sin(Date.now() / 1000) * 0.5 + 0.5);
          return newData;
        });
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsPlaying(false);
      // Handle exercise completion
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSkipBack = () => {
    setTimeRemaining(EXERCISE_DURATION);
    setIsPlaying(false);
  };

  const handleSkipForward = () => {
    // Skip to end of current breath cycle
    setTimeRemaining(prev => Math.max(0, prev - 10));
  };

  return (
    <View style={[styles.screen_home_container, styles.breathExercise_container]}>
      <Surface style={[styles.component_card_container, styles.breathExercise_surface]}>
        <View style={styles.breathExercise_header}>
          <Text style={styles.text_heading2}>Breath Exercise {id}</Text>
          <Text style={[styles.text_heading1, styles.breathExercise_timer]}>
            {formatTime(timeRemaining)}
          </Text>
        </View>

        <WaveformVisualizer
          isPlaying={isPlaying}
          amplitudes={waveformData}
          style={styles.breathExercise_visualizer}
        />

        <PlayerControls
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onSkipBack={handleSkipBack}
          onSkipForward={handleSkipForward}
          disabled={timeRemaining === 0}
        />

        <View style={styles.breathExercise_footer}>
          <Text style={[styles.text_body, styles.breathExercise_instruction]}>
            {isPlaying ? 'Breathe in... and out...' : 'Press play to start the exercise'}
          </Text>
        </View>
      </Surface>
    </View>
  );
}
