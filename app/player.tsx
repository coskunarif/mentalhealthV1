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
import { ScreenLayout } from './components/ScreenLayout';

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
    breathingGuideText: {
      ...theme.fonts.titleMedium, 
      color: theme.colors.primary,
      marginBottom: 16,
      opacity: 0.8,
      textAlign: 'center',
    } as TextStyle,
    gradientContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
    } as ViewStyle,
    backgroundBase: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    } as ViewStyle,
    colorLayer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.colors.primary,
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

  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'exhale' | 'hold'>('inhale');
  const [breathingCycleCount, setBreathingCycleCount] = useState(0);
  const scaleValue = useRef(new Animated.Value(0.8)).current;
  const backgroundIntensity = useRef(new Animated.Value(0)).current;

  const inhaleAnimRef = useRef<Animated.CompositeAnimation | null>(null);
  const exhaleAnimRef = useRef<Animated.CompositeAnimation | null>(null);
  const bgInhaleAnimRef = useRef<Animated.CompositeAnimation | null>(null);
  const bgExhaleAnimRef = useRef<Animated.CompositeAnimation | null>(null);

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
      // Create breathing animation sequence
      const breathingAnimation = () => {
        // Inhale animation (grow)
        inhaleAnimRef.current = Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: 4000, // 4 seconds inhale
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        });

        inhaleAnimRef.current.start(({ finished }) => {
          // Add this parallel animation for the background
          bgInhaleAnimRef.current = Animated.timing(backgroundIntensity, {
            toValue: 1,
            duration: 4000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true, // CHANGE THIS TO TRUE
          });
          
          bgInhaleAnimRef.current.start();
          
          if (finished) {
            setBreathingPhase('hold');
            
            // Hold breath briefly
            setTimeout(() => {
              setBreathingPhase('exhale');
              
              // Exhale animation (shrink)
              exhaleAnimRef.current = Animated.timing(scaleValue, {
                toValue: 0.8,
                duration: 6000, // 6 seconds exhale
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              });
              
              exhaleAnimRef.current.start(({ finished }) => {
                // Add this parallel animation for the background
                bgExhaleAnimRef.current = Animated.timing(backgroundIntensity, {
                  toValue: 0,
                  duration: 6000,
                  easing: Easing.inOut(Easing.ease),
                  useNativeDriver: true, // CHANGE THIS TO TRUE
                });
                
                bgExhaleAnimRef.current.start();
                
                if (finished) {
                  setBreathingPhase('inhale');
                  setBreathingCycleCount(prev => prev + 1);
                  breathingAnimation(); // Repeat the cycle
                }
              });
            }, 1000); // Hold for 1 second
          }
        });
      };

      // Start the breathing animation
      breathingAnimation();
    } else {
      // Reset animations when paused
      if (inhaleAnimRef.current) inhaleAnimRef.current.stop();
      if (exhaleAnimRef.current) exhaleAnimRef.current.stop();
      if (bgInhaleAnimRef.current) bgInhaleAnimRef.current.stop();
      if (bgExhaleAnimRef.current) bgExhaleAnimRef.current.stop();
    }
    
    return () => {
      // Cleanup animations on unmount
      if (inhaleAnimRef.current) inhaleAnimRef.current.stop();
      if (exhaleAnimRef.current) exhaleAnimRef.current.stop();
      if (bgInhaleAnimRef.current) bgInhaleAnimRef.current.stop();
      if (bgExhaleAnimRef.current) bgExhaleAnimRef.current.stop();
    };
  }, [isPlaying, scaleValue, backgroundIntensity]);

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
    <ScreenLayout
      title={title as string}
      subtitle={subtitle as string}
      scrollable={false} // If needed for your layout
    >
      <View style={styles.content}>
      <Animated.View style={styles.gradientContainer}>
          {/* Solid background */}
          <View style={[styles.backgroundBase, { backgroundColor: theme.colors.background }]} />
          
          {/* Color overlay for breathing effect */}
          <Animated.View 
            style={[
              styles.colorLayer,
              { 
                opacity: backgroundIntensity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.05, 0.25]
                })
              }
            ]} 
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.mandalaContainer, 
            { 
              transform: [
                { scale: scaleValue }
              ] 
            }
          ]}
          accessibilityElementsHidden={false}
          accessibilityLabel={`Breathing guide: ${breathingPhase} phase`}
          importantForAccessibility="yes"
        >
          <MaterialCommunityIcons
            name="circle-outline"
            size={MANDALA_SIZE}
            color={theme.colors.primary}
            style={styles.mandala}
          />
        </Animated.View>
        <Text
          style={styles.breathingGuideText}
          accessibilityLiveRegion="polite"
        >
          {breathingPhase === 'inhale' ? 'Breathe in...' : 
           breathingPhase === 'hold' ? 'Hold...' : 'Breathe out...'}
        </Text>

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
      </View>
    </ScreenLayout>
  );
}
