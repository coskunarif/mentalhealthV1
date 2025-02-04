import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from '../config/styles';

interface SeekableProgressProps {
  duration: number;
  position: number;
  onSeek: (value: number) => void;
  style?: ViewStyle;
}

export function SeekableProgress({ duration, position, onSeek, style }: SeekableProgressProps) {
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={[styles.layout.container, style]}>
      <View style={[styles.layout.content, { flexDirection: 'row', alignItems: 'center' }]}>
        <Text style={styles.text.caption}>{formatTime(position)}</Text>
        <View
          style={{
            flex: 1,
            height: 4,
            backgroundColor: styles.colors.disabled,
            marginHorizontal: 8,
            borderRadius: 2,
          }}
        >
          <View
            style={{
              width: `${(position / duration) * 100}%`,
              height: '100%',
              backgroundColor: styles.colors.primary,
              borderRadius: 2,
            }}
          />
        </View>
        <Text style={styles.text.caption}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
}
