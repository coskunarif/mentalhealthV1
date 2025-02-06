import React from 'react';
import { View } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import styles from '../config/styles';
import type { AppTheme } from '../types/theme';

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
  const theme = useTheme<AppTheme>();
  return (
    <View style={[styles.layout_row, styles.playerControls_container]}>
      <IconButton
        icon="skip-previous"
        onPress={onSkipBack}
        size={iconSize}
        iconColor={theme.colors.primary}
        disabled={disabled}
        style={styles.component_iconButton_container}
      />
      <IconButton
        icon={isPlaying ? 'pause' : 'play'}
        onPress={onPlayPause}
        size={iconSize * 1.5}
        iconColor={theme.colors.primary}
        disabled={disabled}
        style={styles.component_iconButton_container}
      />
      <IconButton
        icon="skip-next"
        onPress={onSkipForward}
        size={iconSize}
        iconColor={theme.colors.primary}
        disabled={disabled}
        style={styles.component_iconButton_container}
      />
    </View>
  );
}
