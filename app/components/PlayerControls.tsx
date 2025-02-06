import React from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { styles } from '../config/styles';

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onSkipBack: () => void;
  onSkipForward: () => void;
  disabled?: boolean;
}

export default function PlayerControls({
  isPlaying,
  onPlayPause,
  onSkipBack,
  onSkipForward,
  disabled = false,
}: PlayerControlsProps) {
  const iconSize = 24; // Base icon size
  
  return (
    <View style={[styles.layout.row, { justifyContent: 'center', gap: 16 }]}>
      <IconButton
        icon="skip-previous"
        onPress={onSkipBack}
        size={iconSize}
        iconColor={styles.colors.primary}
        disabled={disabled}
        style={styles.component.iconButton.container}
      />
      <IconButton
        icon={isPlaying ? 'pause' : 'play'}
        onPress={onPlayPause}
        size={iconSize * 1.5}
        iconColor={styles.colors.primary}
        disabled={disabled}
        style={styles.component.iconButton.container}
      />
      <IconButton
        icon="skip-next"
        onPress={onSkipForward}
        size={iconSize}
        iconColor={styles.colors.primary}
        disabled={disabled}
        style={styles.component.iconButton.container}
      />
    </View>
  );
}
