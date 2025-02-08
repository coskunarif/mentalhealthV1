import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import Svg, { Path, Circle, Line, Text as SvgText } from 'react-native-svg';
import type { AppTheme } from '../types/theme';
import { theme } from '../config/theme';

interface DataPoint {
  value: number;
}

interface RadarChartProps {
  data: DataPoint[];
  style?: ViewStyle;
  size?: number;
}

const staticLabels = [
  "Balance past memories",
  "Change your opinion",
  "Support dreams",
  "Gain awareness",
  "Breath up",
];

// Define distinct colors.  Make sure there are enough for your data points.
const pointColors = [
  theme.colors.primary,
  theme.colors.secondary,
  theme.colors.tertiary,
  theme.colors.error,
  theme.colors.primaryContainer,
];

export default function RadarChart({ data, style, size = 250 }: RadarChartProps) {
  const theme = useTheme<AppTheme>();
  const center = size / 2;
  const radius = (size - 50) / 2;
  const angleStep = (Math.PI * 2) / staticLabels.length; // Use staticLabels.length

  const getCoordinates = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const distance = value * radius;
    return {
      x: center + distance * Math.cos(angle),
      y: center + distance * Math.sin(angle),
    };
  };

  const getLabelCoordinates = (index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const distance = radius * 1.35;
    const x = center + distance * Math.cos(angle);
    const y = center + distance * Math.sin(angle);
    return { x, y };
  };

  const gridCircles = [];
  for (let i = 1; i <= 5; i++) {
    const gridRadius = (radius / 5) * i;
    gridCircles.push(
      <Circle
        key={`grid-circle-${i}`}
        cx={center}
        cy={center}
        r={gridRadius}
        stroke={theme.colors.outlineVariant}
        strokeWidth={1}
        fill="none"
      />
    );
  }

  const gridLines = staticLabels.map((_, index) => { // Use staticLabels.length
    const { x, y } = getCoordinates(1, index);
    return (
      <Line
        key={`grid-line-${index}`}
        x1={center}
        y1={center}
        x2={x}
        y2={y}
        stroke={theme.colors.outlineVariant}
        strokeWidth={1}
      />
    );
  });

  const points = data.map((point, index) => getCoordinates(point.value, index));
  const path = points.map((p, index) => `${p.x},${p.y}`).join(' L ');

    // Ensure data length matches label and color lengths
    if (data.length !== staticLabels.length || data.length !== pointColors.length) {
      console.warn("RadarChart: Data, labels, and colors arrays have mismatched lengths.");
      // Handle the mismatch appropriately.  You might truncate the longer arrays, or pad the shorter ones.
      // For example, to truncate:
      data = data.slice(0, staticLabels.length);
      // Or, throw an error:
      // throw new Error("Data, labels, and colors arrays must have the same length.");
    }

  return (
    <View style={[localStyles.container, style]}>
      <Svg width={size} height={size}>
        {gridCircles}
        {gridLines}

        <Path
          d={`M${points[0].x},${points[0].y} ${path} Z`}
          stroke={theme.colors.secondary} // Keep a stroke color for the overall path
          strokeWidth={2.5}
          fill={theme.colors.secondary}
          fillOpacity={0.2}
        />

        {points.map((point, index) => (
          <Circle
            key={`point-${index}`}
            cx={point.x}
            cy={point.y}
            r={6}
            fill={pointColors[index % pointColors.length]} // Use modulo for color cycling
            stroke={theme.colors.onSurface}
            strokeWidth={1}
            accessibilityLabel={`Data point ${staticLabels[index]}: ${data[index].value}`} // Use static label
          />
        ))}

        {staticLabels.map((label, index) => {
          const labelCoords = getLabelCoordinates(index);
          return (
            <SvgText
              key={`label-${index}`}
              x={labelCoords.x}
              y={labelCoords.y}
              fontSize={10} // Reduced font size
              textAnchor="middle"
              alignmentBaseline="middle"
              fill={pointColors[index % pointColors.length]} // Use modulo for color cycling
            >
              {label}
            </SvgText>
          );
        })}
      </Svg>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
