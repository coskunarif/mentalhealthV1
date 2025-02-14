import React, { useEffect, useState } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import { Text, IconButton, Surface, useTheme } from 'react-native-paper';
import { Audio, AVPlaybackStatus, AVPlaybackStatusSuccess, AVPlaybackStatusError } from 'expo-av';
import { router, useLocalSearchParams } from 'expo-router';
import Svg, { Circle } from 'react-native-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { RootStackParamList } from './types/navigation';
import type { AppTheme } from './types/theme';
import type { ViewStyle, TextStyle } from 'react-native';

interface PlayerProps {
  audioUrl: string;
  title: string;
  duration: string;
}

const createStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  } as ViewStyle,
  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
  } as ViewStyle,
  headerText: {
    marginLeft: 16,
  } as ViewStyle,
  title: {
    ...theme.fonts.headlineMedium,
    color: theme.colors.onSurface,
  } as TextStyle,
  subtitle: {
    ...theme.fonts.bodyMedium,
    color: theme.colors.onSurfaceVariant,
  } as TextStyle,
  content: {
    flex: 1,
    alignItems: 'center' as const,
    justifyContent: 'space-around' as const,
    paddingVertical: 32,
  } as ViewStyle,
  mandalaContainer: {
    width: 240,
    height: 240,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    opacity: 0.8,
  } as ViewStyle,
  mandala: {
    position: 'absolute' as const,
  } as ViewStyle,
  timerContainer: {
    position: 'relative' as const,
    width: 300,
    height: 300,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  } as ViewStyle,
  svg: {
    position: 'absolute' as const,
    transform: [{ rotate: '-90deg' }],
  } as ViewStyle,
  timerText: {
    alignItems: 'center' as const,
  } as ViewStyle,
  currentTime: {
    ...theme.fonts.displayLarge,
    color: theme.colors.onSurface,
  } as TextStyle,
  totalTime: {
    ...theme.fonts.titleMedium,
    color: theme.colors.onSurfaceVariant,
    marginTop: 8,
  } as TextStyle,
  controls: {
    alignItems: 'center' as const,
    marginTop: 32,
  } as ViewStyle,
  playButton: {
    backgroundColor: theme.colors.surfaceVariant,
  } as ViewStyle,
});

export default function PlayerScreen() {
  const [sound, setSound] = useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [debugMessage, setDebugMessage] = useState<string>('');

  const { meditationId, title = 'Meditation', subtitle = 'Exercise' } = 
    useLocalSearchParams<RootStackParamList['player']>();
  const theme = useTheme<AppTheme>();
  const styles = createStyles(theme);
  
  // Animation values
  const spinValue = new Animated.Value(0);
  const progressAnimation = new Animated.Value(0);

  useEffect(() => {
    let isMounted = true;

    const initializeAudio = async () => {
      try {
        setDebugMessage('Configuring audio session...');
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });

        // Verify audio file exists
        const audioSource = require('../assets/meditations/sample.mp3');
        console.log('Audio file reference:', audioSource);

        if (isMounted) {
          await loadAudio();
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setDebugMessage(`Audio initialization error: ${errorMessage}`);
        console.error('Error initializing audio:', error);
      }
    };

    initializeAudio();

    return () => {
      isMounted = false;
      if (sound) {
        console.log('Cleaning up audio resources...');
        sound.unloadAsync().catch(error => 
          console.error('Error during cleanup:', error)
        );
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 10000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinValue.setValue(0);
    }
  }, [isPlaying]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const loadAudio = async () => {
    setDebugMessage('Starting audio load...');
    setIsLoading(true);
    
    try {
      // Unload existing sound
      if (sound) {
        setDebugMessage('Unloading existing sound...');
        await sound.unloadAsync();
      }

      setDebugMessage('Creating new sound object...');
      const audioSource = require('../assets/meditations/sample.mp3');
      console.log('Loading audio source:', audioSource);

      const { sound: audioSound } = await Audio.Sound.createAsync(
        audioSource,
        { 
          shouldPlay: false,
          progressUpdateIntervalMillis: 1000,
          positionMillis: 0,
          volume: 1.0,
          isMuted: false,
          isLooping: false,
        },
        (status: AVPlaybackStatus) => {
          // Handle loaded status
          if (status.isLoaded) {
            // Update playback state
            setIsPlaying(status.isPlaying);
            setPosition(status.positionMillis);
            
            // Handle playback completion
            if (status.didJustFinish) {
              setIsPlaying(false);
              setPosition(0);
              setDebugMessage('Playback finished');
            }
          } else {
            // Handle error status
            const errorStatus = status as AVPlaybackStatusError;
            if (errorStatus.error) {
              console.error('Playback error:', errorStatus.error);
              setDebugMessage(`Playback error: ${errorStatus.error}`);
            }
          }
        }
      );

      setDebugMessage('Sound created, getting status...');
      const initialStatus = await audioSound.getStatusAsync();
      console.log('Initial audio status:', initialStatus);

      if (!initialStatus.isLoaded) {
        throw new Error('Failed to load audio file');
      }

      setSound(audioSound);
      setDuration(initialStatus.durationMillis || 0);
      setPosition(initialStatus.positionMillis || 0);
      setDebugMessage('Audio loaded successfully');
      setIsLoading(false);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setDebugMessage(`Error loading audio: ${errorMessage}`);
      console.error('Error loading audio:', error);
      setIsLoading(false);
    }
  };

  const handlePlayPause = async () => {
    if (!sound) {
      setDebugMessage('No sound loaded');
      return;
    }

    try {
      const status = await sound.getStatusAsync();
      console.log('Current playback status:', status);

      if (!status.isLoaded) {
        throw new Error('Sound not properly loaded');
      }

      if (status.isPlaying) {
        setDebugMessage('Pausing playback...');
        await sound.pauseAsync();
      } else {
        setDebugMessage('Starting playback...');
        await sound.playAsync();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setDebugMessage(`Playback error: ${errorMessage}`);
      console.error('Playback error:', errorMessage);
    }
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
  const CIRCLE_LENGTH = 840; // 2PI * radius (where radius = 134)
  const CIRCLE_RADIUS = 134;

  return (
    <View style={styles.container}>
      <Surface style={styles.header} elevation={0}>
        <IconButton
          icon="chevron-down"
          size={28}
          onPress={() => router.back()}
        />
        <View style={styles.headerText}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </Surface>

      {/* Add debug message display */}
      {__DEV__ && debugMessage && (
        <Text style={{ padding: 10, backgroundColor: '#f0f0f0' }}>
          Debug: {debugMessage}
        </Text>
      )}

      <View style={styles.content}>
        <Animated.View
          style={[
            styles.mandalaContainer,
            { transform: [{ rotate: spin }] },
          ]}
        >
          <MaterialCommunityIcons
            name="flower-outline"
            size={240}
            color={theme.colors.primary}
            style={styles.mandala}
          />
        </Animated.View>

        <View style={styles.timerContainer}>
          <Svg width={300} height={300} style={styles.svg}>
            {/* Background Circle */}
            <Circle
              cx="150"
              cy="150"
              r={CIRCLE_RADIUS}
              stroke={theme.colors.surfaceVariant}
              strokeWidth="12"
              fill="none"
            />
            {/* Progress Circle */}
            <Circle
              cx="150"
              cy="150"
              r={CIRCLE_RADIUS}
              stroke={theme.colors.primary}
              strokeWidth="12"
              fill="none"
              strokeDasharray={CIRCLE_LENGTH}
              strokeDashoffset={CIRCLE_LENGTH * (1 - progress)}
              strokeLinecap="round"
            />
          </Svg>
          <View style={styles.timerText}>
            <Text style={styles.currentTime}>{formatTime(position)}</Text>
            <Text style={styles.totalTime}>{formatTime(duration)}</Text>
          </View>
        </View>

        <View style={styles.controls}>
          <IconButton
            icon={isPlaying ? 'pause-circle' : 'play-circle'}
            size={72}
            iconColor={theme.colors.primary}
            onPress={handlePlayPause}
            style={styles.playButton}
          />
        </View>
      </View>
    </View>
  );
}
