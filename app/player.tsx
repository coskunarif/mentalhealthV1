import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, Surface, IconButton } from 'react-native-paper';
import { Audio } from 'expo-av';
import { styles } from './config/styles';
import PlayerControls from './components/PlayerControls';
import WaveformVisualizer from './components/WaveformVisualizer';
import { router, useLocalSearchParams } from 'expo-router';
import type { RootStackParamList } from './types/navigation';

interface PlayerProps {
  audioUrl: string;
  title: string;
  duration: string;
}

export default function PlayerScreen() {
  const [sound, setSound] = useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { meditationId, returnTo = 'tabs/home' } = useLocalSearchParams<RootStackParamList['player']>();

  useEffect(() => {
    loadAudio();
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const loadAudio = async () => {
    try {
      const { sound: audioSound } = await Audio.Sound.createAsync(
        // TODO: Replace with actual meditation audio URL
        require('../assets/meditations/sample.mp3'),
        { shouldPlay: false }
      );

      const status = await audioSound.getStatusAsync();
      if (status.isLoaded) {
        setSound(audioSound);
        setDuration(status.durationMillis || 0);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error loading audio:', error);
      setIsLoading(false);
    }
  };

  const handlePlayPause = async () => {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkipBack = async () => {
    if (!sound) return;
    await sound.setPositionAsync(0);
  };

  const handleSkipForward = async () => {
    if (!sound) return;
    const status = await sound.getStatusAsync();
    if (!status.isLoaded) return;
    
    const position = status.positionMillis;
    const duration = status.durationMillis || 0;
    const newPosition = Math.min(position + 10000, duration);
    await sound.setPositionAsync(newPosition);
  };

  useEffect(() => {
    if (sound) {
      const interval = setInterval(async () => {
        if (isPlaying) {
          const status = await sound.getStatusAsync();
          if (status.isLoaded) {
            setPosition(status.positionMillis);
            if (status.didJustFinish) {
              setIsPlaying(false);
              setPosition(0);
              await sound.setPositionAsync(0);
            }
          }
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [sound, isPlaying]);

  return (
    <View style={styles.layout.container}>
      <View style={styles.layout.header}>
        <Surface style={[styles.component.card.elevated, { marginBottom: 24 }]}>
          <IconButton
            icon="arrow-left"
            onPress={() => router.replace(returnTo)}
            style={styles.button.secondary}
          />
          <Text style={styles.text.heading2}>Meditation Player</Text>
        </Surface>
      </View>

      <View style={styles.layout.content}>
        <Surface style={[styles.component.card.elevated, { marginBottom: 24 }]}>
          <Text style={styles.text.heading2}>Sample Meditation</Text>
          <Text style={[styles.text.caption, { marginTop: 4 }]}>10:00</Text>

          <WaveformVisualizer isPlaying={isPlaying} />

          <PlayerControls
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onSkipBack={handleSkipBack}
            onSkipForward={handleSkipForward}
          />
        </Surface>
      </View>
    </View>
  );
}
