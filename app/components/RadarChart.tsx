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

  // Define padding (space for labels) and calculate a consistent radius.
  const padding = 40; // Adjust this value to allow more/less space for labels.
  const radius = (size - padding * 2) / 2;
  const angleStep = (Math.PI * 2) / staticLabels.length;

  // Distinct colors for each data point.
  const pointColors = [
    '#4C8A65', // Dark Green
    '#B00020', // Red
    '#2196F3', // Blue
    '#FFA726', // Orange
    '#9C27B0', // Purple
  ];

  // Ensure the arrays have consistent lengths.
  if (data.length !== staticLabels.length || data.length !== pointColors.length) {
    console.warn(
      "RadarChart: Data, labels, and colors arrays have mismatched lengths. Adjusting data array."
    );
    data = data.slice(0, staticLabels.length);
  }

  // Calculate coordinates for data points using the same radius.
  const getCoordinates = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    // Ensure that your data values are normalized between 0 and 1.
    const distance = value * radius;
    return {
      x: center + distance * Math.cos(angle),
      y: center + distance * Math.sin(angle),
    };
  };

  // Position labels slightly outside the drawn polygon.
  const getLabelCoordinates = (index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const labelDistance = radius + 15; // 15px outside the data polygon.
    return {
      x: center + labelDistance * Math.cos(angle),
      y: center + labelDistance * Math.sin(angle),
    };
  };

  // Draw grid circles that match the radius used for data.
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
        stroke={theme.colors.outlineVariant + "40"} // Subtle grid color.
        strokeWidth={0.5} // Thin grid lines.
        fill="none"
      />
    );
  }

  // Draw radial grid lines.
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

  // Compute the data points.
  const points = data.map((point, index) => getCoordinates(point.value, index));
  // Build the path string for the polygon.
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
          stroke={pointColors[0]}
          strokeWidth={strokeWidth}
          fill={pointColors[0]}
          fillOpacity={fillOpacity}
        />

        {points.map((point, index) => (
          <Circle
            key={`point-${index}`}
            cx={point.x}
            cy={point.y}
            r={6}
            fill={pointColors[index]}
            stroke="#FFFFFF"
            strokeWidth={2}
            accessibilityLabel={`Data point ${staticLabels[index]}: ${data[index].value}`}
          />
        ))}

        {staticLabels.map((label, index) => {
          const { x, y } = getLabelCoordinates(index);
          const angle = index * angleStep - Math.PI / 2;
          // Adjust text alignment based on the position.
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
              fill={pointColors[index]}
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
