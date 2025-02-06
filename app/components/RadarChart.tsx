import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import styles from '../config/styles';
import Svg, { Path, Circle } from 'react-native-svg';
import type { AppTheme } from '../types/theme';

interface DataPoint {
  value: number;
  label: string;
}

interface RadarChartProps {
  data: DataPoint[];
  style?: ViewStyle;
}

export default function RadarChart({ data, style }: RadarChartProps) {
  const theme = useTheme<AppTheme>();
  const size = 200;
  const center = size / 2;
  const radius = (size - 40) / 2;
  const angleStep = (Math.PI * 2) / data.length;

  const getCoordinates = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const distance = value * radius;
    return {
      x: center + distance * Math.cos(angle),
      y: center + distance * Math.sin(angle),
    };
  };

  const points = data.map((point, index) => getCoordinates(point.value, index));
  const path = points.reduce((acc, point, index) => {
    return `${acc}${index === 0 ? 'M' : 'L'} ${point.x},${point.y}`;
  }, '');

  const gridPath = Array.from({ length: 4 }, (_, i) => {
    const value = (i + 1) / 4;
    const gridPoints = data.map((_, index) => getCoordinates(value, index));
    return gridPoints.reduce((acc, point, index) => {
      return `${acc}${index === 0 ? 'M' : 'L'} ${point.x},${point.y}`;
    }, '');
  });

  return (
    <View style={[styles.radarChart_container, style]}>
      <Svg width={size} height={size}>
        {/* Grid Lines */}
        {gridPath.map((path, index) => (
          <Path
            key={`grid-${index}`}
            d={`${path} Z`}
            stroke={theme.colors.outlineVariant}
            strokeWidth={1}
            fill="none"
          />
        ))}

        {/* Data Lines */}
        <Path
          d={`${path} Z`}
          stroke={theme.colors.primary}
          strokeWidth={2}
          fill={theme.colors.primary}
          fillOpacity={0.2}
        />

        {/* Data Points */}
        {points.map((point, index) => (
          <Circle
            key={`point-${index}`}
            cx={point.x}
            cy={point.y}
            r={4}
            fill={theme.colors.primary}
          />
        ))}
      </Svg>

      {/* Labels */}
      <View style={styles.radarChart_labelsContainer}>
        {data.map((point, index) => (
          <View
            key={`label-${index}`}
            style={styles.radarChart_label}
          >
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: theme.colors.primary,
                marginRight: 8,
              }}
            />
            <Text style={styles.text_caption}>{point.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
