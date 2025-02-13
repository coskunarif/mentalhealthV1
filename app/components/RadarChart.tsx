import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import Svg, { Path, Circle, Line, Text as SvgText } from 'react-native-svg';
import type { AppTheme } from '../types/theme';

interface DataPoint {
  value: number;
}

interface RadarChartProps {
  data: DataPoint[];
  style?: ViewStyle;
  size?: number;
  strokeWidth?: number;
  fillOpacity?: number;
}

const staticLabels = [
  "Balance past memories",
  "Change your opinion",
  "Support dreams",
  "Gain awareness",
  "Breath up",
];

export default function RadarChart({
  data,
  style,
  size = 250,
  strokeWidth = 2.5,
  fillOpacity = 0.2,
}: RadarChartProps) {
  const theme = useTheme<AppTheme>();
  const center = size / 2;

  // Define padding and calculate radius
  const padding = 40;
  const radius = (size - padding * 2) / 2;
  const angleStep = (Math.PI * 2) / staticLabels.length;

  // Single consistent color for the entire chart
  const chartColor = '#FFF176'; // Yellow from the moods palette

  // Ensure data length matches labels
  if (data.length !== staticLabels.length) {
    console.warn(
      "RadarChart: Data and labels arrays have mismatched lengths. Adjusting data array."
    );
    data = data.slice(0, staticLabels.length);
  }

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
    const labelDistance = radius + 15;
    return {
      x: center + labelDistance * Math.cos(angle),
      y: center + labelDistance * Math.sin(angle),
    };
  };

  // Draw grid circles
  const gridCircles = [];
  const gridSteps = 5;
  for (let i = 1; i <= gridSteps; i++) {
    const gridRadius = (radius / gridSteps) * i;
    gridCircles.push(
      <Circle
        key={`grid-circle-${i}`}
        cx={center}
        cy={center}
        r={gridRadius}
        stroke={theme.colors.outlineVariant + "40"}
        strokeWidth={0.5}
        fill="none"
      />
    );
  }

  // Draw radial grid lines
  const gridLines = staticLabels.map((_, index) => {
    const { x, y } = getCoordinates(1, index);
    return (
      <Line
        key={`grid-line-${index}`}
        x1={center}
        y1={center}
        x2={x}
        y2={y}
        stroke={theme.colors.outlineVariant + "40"}
        strokeWidth={0.5}
      />
    );
  });

  // Compute data points and path
  const points = data.map((point, index) => getCoordinates(point.value, index));
  const pathData =
    points
      .map((p, index) =>
        index === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`
      )
      .join(' ') + ' Z';

  return (
    <View style={[localStyles.container, style]}>
      <Svg width={size} height={size}>
        {gridCircles}
        {gridLines}

        <Path
          d={pathData}
          stroke={chartColor}
          strokeWidth={strokeWidth}
          fill={chartColor}
          fillOpacity={fillOpacity}
        />

        {points.map((point, index) => (
          <Circle
            key={`point-${index}`}
            cx={point.x}
            cy={point.y}
            r={6}
            fill={chartColor}
            stroke="#FFFFFF"
            strokeWidth={2}
            accessibilityLabel={`Data point ${staticLabels[index]}: ${data[index].value}`}
          />
        ))}

        {staticLabels.map((label, index) => {
          const { x, y } = getLabelCoordinates(index);
          const angle = index * angleStep - Math.PI / 2;
          let textAnchor: "start" | "middle" | "end" = "middle";
          let xOffset = 0;
          let yOffset = 0;
          
          if (angle >= -Math.PI / 4 && angle <= Math.PI / 4) {
            textAnchor = "start";
            xOffset = 5;
          } else if (angle >= (3 * Math.PI) / 4 || angle <= -(3 * Math.PI) / 4) {
            textAnchor = "end";
            xOffset = -5;
          } else {
            textAnchor = "middle";
            yOffset = angle > 0 ? 5 : -5;
          }
          
          return (
            <SvgText
              key={`label-${index}`}
              x={x + xOffset}
              y={y + yOffset}
              fontSize={9}
              fontFamily="SpaceMono-Regular"
              textAnchor={textAnchor}
              fill={chartColor}
              fontWeight="bold"
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
