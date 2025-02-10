import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import styles from '../config/styles';
import type { AppTheme } from '../types/theme';

interface SeekableProgressProps {
  duration: number;
  position: number;
  onSeek: (value: number) => void;
  style?: ViewStyle;
}

export default function SeekableProgress({ duration, position, onSeek, style }: SeekableProgressProps) {
  const theme = useTheme<AppTheme>();
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={[styles.layout_container, style]}>
      <View style={[styles.layout_content, styles.seekableProgress_container]}>
        <Text style={styles.text_caption}>{formatTime(position)}</Text>
        <View
          style={[styles.seekableProgress_bar, { backgroundColor: theme.colors.outlineVariant }]}
        >
          <View
            style={{
              width: `${(position / duration) * 100}%`,
              height: '100%',
              backgroundColor: theme.colors.primary,
              borderRadius: 2,
            }}
          />
        </View>
        <Text style={styles.text_caption}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
}
