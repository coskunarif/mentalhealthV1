import React, { useState } from 'react';
import { View, Animated } from 'react-native';
import { Text, Surface, IconButton, FAB, ProgressBar, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { useRouter } from 'expo-router';

// Star burst component
function StarBurst() {
  const size = 200;
  const points = 12;
  const centerX = size / 2;
  const centerY = size / 2;
  const innerRadius = 30;
  const outerRadius = 100;

  const createStarPath = () => {
    let path = '';
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / points;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      path += i === 0 ? `M ${x},${y} ` : `L ${x},${y} `;
    }
    path += 'Z';
    return path;
  };

  return (
    <Svg height={size} width={size}>
      <Path
        d={createStarPath()}
        fill="#5DA47A"
        opacity={0.2}
      />
    </Svg>
  );
}

export default function PlayerScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0.38); // 7:28 out of 19:00

  // Format time function
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const currentTime = 448; // 7:28 in seconds
  const totalTime = 1140; // 19:00 in seconds

  return (
    <Surface style={{ 
      flex: 1, 
      backgroundColor: theme.colors.primaryContainer
    }}>
      {/* Back Button */}
      <View style={{ 
        position: 'absolute', 
        top: 16, 
        left: 16, 
        zIndex: 1 
      }}>
        <IconButton
          icon="arrow-left"
          mode="outlined"
          size={24}
          onPress={() => router.back()}
          iconColor={theme.colors.primary}
        />
      </View>

      <View style={{ 
        flex: 1, 
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24
      }}>
        {/* Star Burst Animation */}
        <View style={{ 
          position: 'absolute',
          opacity: 0.5
        }}>
          <StarBurst />
        </View>

        {/* Title */}
        <View style={{ 
          alignItems: 'center',
          gap: 4
        }}>
          <Text 
            variant="headlineSmall"
            style={{ 
              color: theme.colors.primary,
              fontWeight: 'bold'
            }}
          >
            Caotic Breath
          </Text>
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            Breath up
          </Text>
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.outline }}
          >
            exersize 13
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={{ width: '100%', gap: 8 }}>
          <ProgressBar
            progress={progress}
            color={theme.colors.primary}
            style={{
              backgroundColor: theme.colors.surfaceVariant,
              height: 4,
              borderRadius: 2
            }}
          />
          <View style={{ 
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <Text
              variant="labelMedium"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              {formatTime(currentTime)}
            </Text>
            <Text
              variant="labelMedium"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              {formatTime(totalTime)}
            </Text>
          </View>
        </View>

        {/* Play/Pause Button */}
        <FAB
          icon={isPlaying ? "pause" : "play"}
          onPress={() => setIsPlaying(!isPlaying)}
          mode="elevated"
          size="large"
          style={{
            backgroundColor: theme.colors.primary
          }}
          color={theme.colors.onPrimary}
        />
      </View>
    </Surface>
  );
}
