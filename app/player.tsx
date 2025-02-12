import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, IconButton, useTheme } from 'react-native-paper';
import { Audio } from 'expo-av';
import styles from './config/styles';
import { router, useLocalSearchParams } from 'expo-router';
import type { RootStackParamList } from './types/navigation';
import type { AppTheme } from './types/theme';
import { formatMeditationId } from './utils/helpers';

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
  const { meditationId, title = 'Meditation', subtitle = 'Exercise', returnTo = 'tabs/home' } = 
    useLocalSearchParams<RootStackParamList['player']>();
  const theme = useTheme<AppTheme>();

    useEffect(() => {
        loadAudio();
    }, []); // Run only once on mount

    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound]); // Cleanup when sound changes or component unmounts

  const loadAudio = async () => {
    console.log("meditationId:", meditationId);
    try {
      // TODO: Replace with Firebase Storage logic when backend is implemented.
      // For now, use a placeholder sample.mp3 file.
      const { sound: audioSound } = await Audio.Sound.createAsync(
        require('../assets/meditations/sample.mp3'),
        { shouldPlay: false }
      );

      const status = await audioSound.getStatusAsync();
      console.log("Audio Status:", status);
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

  useEffect(() => {
    if (sound) {
      const interval = setInterval(async () => {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          setPosition(status.positionMillis);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [sound]);

  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progress = duration ? position / duration : 0;

  return (
    <View style={styles.player_container}>
      <View style={styles.player_content}>
        <Text style={styles.player_title}>{title}</Text>
        <Text style={styles.player_subtitle}>{subtitle}</Text>
        <View style={styles.player_progress_container}>
          <Text style={styles.player_time}>{formatTime(position)}</Text>
          <View style={styles.player_progress_bar_container}>
            <View style={[styles.player_progress_bar, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.player_time}>{formatTime(duration)}</Text>
        </View>
        <View style={styles.player_controls}>
          <IconButton
            icon={isPlaying ? 'pause-circle' : 'play-circle'}
            iconColor={theme.colors.secondary}
            size={70}
            onPress={handlePlayPause}
            style={styles.player_button}
          />
        </View>
      </View>
    </View>
  );
}
