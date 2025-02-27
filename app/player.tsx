import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Animated, Easing, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Text, IconButton, Surface, useTheme } from 'react-native-paper';
import { Audio, AVPlaybackStatus, AVPlaybackStatusError } from 'expo-av';
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

const MANDALA_SIZE = 200;
const TIMER_SIZE = 260;
const CIRCLE_RADIUS = 120;
const CIRCLE_LENGTH = 754;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    } as ViewStyle,
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 24,
      paddingBottom: 16,
    } as ViewStyle,
    headerText: { marginLeft: 16 } as ViewStyle,
    title: { ...theme.fonts.headlineMedium, color: theme.colors.onSurface } as TextStyle,
    subtitle: { ...theme.fonts.bodyMedium, color: theme.colors.onSurfaceVariant } as TextStyle,
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
    } as ViewStyle,
    mandalaContainer: {
      width: MANDALA_SIZE,
      height: MANDALA_SIZE,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0.8,
      marginBottom: 16,
    } as ViewStyle,
    mandala: { position: 'absolute' } as ViewStyle,
    timerContainer: {
      position: 'relative',
      width: TIMER_SIZE,
      height: TIMER_SIZE,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    } as ViewStyle,
    svg: {
      position: 'absolute',
      transform: [{ rotate: '-90deg' }],
    } as ViewStyle,
    timerText: { alignItems: 'center' } as ViewStyle,
    currentTime: { ...theme.fonts.displayLarge, color: theme.colors.onSurface } as TextStyle,
    totalTime: { ...theme.fonts.titleMedium, color: theme.colors.onSurfaceVariant, marginTop: 8 } as TextStyle,
    controls: { alignItems: 'center', marginTop: 8 } as ViewStyle,
    playButton: {
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 36,
      elevation: 4,
      padding: 8,
    } as ViewStyle,
  });


export default function PlayerScreen() {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { meditationId, title = 'Meditation', subtitle = 'Exercise' } =
    useLocalSearchParams<RootStackParamList['player']>();
  const theme = useTheme<AppTheme>();
  const styles = createStyles(theme);

  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let isMounted = true;

    const initializeAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });

        const audioSource = require('../assets/meditations/sample.mp3');

        if (isMounted) {
          await loadAudio();
        }
      } catch (error) {
        console.error('Error initializing audio:', error);
      }
    };

    initializeAudio();

    return () => {
      isMounted = false;
      if (soundRef.current) {
        soundRef.current.unloadAsync().catch((err) =>
          console.error('Error during cleanup:', err)
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
          easing: Easing.out(Easing.ease), // Updated easing
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

  const handleStatusUpdate = useCallback((status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);
      setPosition(status.positionMillis);
      if (status.didJustFinish) {
        setIsPlaying(false);
        setPosition(0);
      }
    } else {
      const errorStatus = status as AVPlaybackStatusError;
      if (errorStatus.error) {
        console.error('Playback error:', errorStatus.error);
      }
    }
  }, []);

  const loadAudio = async () => {
    setIsLoading(true);

    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }

      const audioSource = require('../assets/meditations/sample.mp3');

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
        handleStatusUpdate
      );

      const initialStatus = await audioSound.getStatusAsync();

      if (!initialStatus.isLoaded) {
        throw new Error('Failed to load audio file');
      }

      soundRef.current = audioSound;
      setDuration(initialStatus.durationMillis || 0);
      setPosition(initialStatus.positionMillis || 0);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading audio:', error);
      setIsLoading(false);
    }
  };

  const handlePlayPause = async () => {
    if (!soundRef.current) {
      return;
    }

    try {
      const status = await soundRef.current.getStatusAsync();

      if (!status.isLoaded) {
        throw new Error('Sound not properly loaded');
      }

      if (status.isPlaying) {
        await soundRef.current.pauseAsync();
      } else {
        await soundRef.current.playAsync();
      }
    } catch (error) {
      console.error('Playback error:', error);
    }
  };

  useEffect(() => {
    if (soundRef.current) {
      const interval = setInterval(async () => {
        const status = await soundRef.current!.getStatusAsync();
        if (status.isLoaded) {
          setPosition(status.positionMillis);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [soundRef.current]);

  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progress = duration ? position / duration : 0;

  return (
    <SafeAreaView style={styles.container}>
      <Surface style={styles.header} elevation={0}>
        <IconButton
          icon="chevron-down"
          size={28}
          onPress={() => router.back()}
          accessibilityLabel="Close player"
        />
        <View style={styles.headerText}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </Surface>

      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View
          style={[styles.mandalaContainer, { transform: [{ rotate: spin }] }]}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          <MaterialCommunityIcons
            name="flower-outline"
            size={MANDALA_SIZE}
            color={theme.colors.primary}
            style={styles.mandala}
          />
        </Animated.View>

        <View style={styles.timerContainer}>
          <Svg width={TIMER_SIZE} height={TIMER_SIZE} style={styles.svg}>
            <Circle
              cx={TIMER_SIZE / 2}
              cy={TIMER_SIZE / 2}
              r={CIRCLE_RADIUS}
              stroke={theme.colors.surfaceVariant}
              strokeWidth={12}
              fill="none"
            />
            <Circle
              cx={TIMER_SIZE / 2}
              cy={TIMER_SIZE / 2}
              r={CIRCLE_RADIUS}
              stroke={theme.colors.primary}
              strokeWidth={12}
              fill="none"
              strokeDasharray={CIRCLE_LENGTH}
              strokeDashoffset={CIRCLE_LENGTH * (1 - progress)}
              strokeLinecap="round"
            />
          </Svg>
          <View style={styles.timerText} accessibilityLiveRegion="polite">
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
            disabled={isLoading}
            style={styles.playButton}
            accessibilityLabel={isPlaying ? 'Pause meditation' : 'Play meditation'}
            accessibilityState={{ disabled: isLoading, busy: isLoading }}
            accessibilityHint={
              isPlaying
                ? 'Pauses the current meditation'
                : 'Starts playing the meditation'
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
