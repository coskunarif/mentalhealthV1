import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from '../config/styles';
import Svg, { Path, Circle } from 'react-native-svg';

interface DataPoint {
  value: number;
  label: string;
}

interface RadarChartProps {
  data: DataPoint[];
  style?: ViewStyle;
}

export function RadarChart({ data, style }: RadarChartProps) {
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
    <View style={[{ padding: 16 }, style]}>
      <Svg width={size} height={size}>
        {/* Grid Lines */}
        {gridPath.map((path, index) => (
          <Path
            key={`grid-${index}`}
            d={`${path} Z`}
            stroke={styles.colors.disabled}
            strokeWidth={1}
            fill="none"
          />
        ))}

        {/* Data Lines */}
        <Path
          d={`${path} Z`}
          stroke={styles.colors.primary}
          strokeWidth={2}
          fill={styles.colors.primary}
          fillOpacity={0.2}
        />

        {/* Data Points */}
        {points.map((point, index) => (
          <Circle
            key={`point-${index}`}
            cx={point.x}
            cy={point.y}
            r={4}
            fill={styles.colors.primary}
          />
        ))}
      </Svg>

      {/* Labels */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 16 }}>
        {data.map((point, index) => (
          <View
            key={`label-${index}`}
            style={{ width: '50%', flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}
          >
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: styles.colors.primary,
                marginRight: 8,
              }}
            />
            <Text style={styles.text.caption}>{point.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
