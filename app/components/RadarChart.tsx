// File: app/components/RadarChart.tsx

import React, { useState } from 'react';
import { View, ViewStyle, StyleSheet, useWindowDimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import Svg, {
  Path,
  Circle,
  Line,
  Text as SvgText,
} from 'react-native-svg';
import type { AppTheme } from '../types/theme';

interface DataPoint {
  label?: string;   // Optional if you want dynamic labels per point
  value: number;
}

interface RadarChartProps {
  data: DataPoint[];
  style?: ViewStyle;
  size?: number;         // Optional fixed size
  strokeWidth?: number;  // Polygon stroke width
  fillOpacity?: number;  // Polygon fill opacity
  labels?: string[];     // Optionally override default labels
}

/**
 * Example default labels, if data points do not provide a label property.
 */
const defaultLabels = [
  'Balance past memories',
  'Change your opinion',
  'Support dreams',
  'Gain awareness',
  'Breath up',
];

export default function RadarChart({
  data,
  style,
  size, // If not provided, will be derived from screen width
  strokeWidth = 2,
  fillOpacity = 0.25,
  labels,
}: RadarChartProps) {
  const theme = useTheme<AppTheme>();
  const { width: screenWidth } = useWindowDimensions();

  /**
   * Determine chart size:
   * - If `size` prop is provided, use it.
   * - Otherwise, adapt to screen width with some padding (e.g., 32px).
   * - You can clamp the max size to prevent overly large charts on tablets.
   */
  const chartSize = size || Math.min(screenWidth - 32, 320);

  // Combine default labels with optional custom labels
  const chartLabels = labels || defaultLabels;
  // Ensure data length matches label length
  if (data.length !== chartLabels.length) {
    console.warn(
      'RadarChart: data length and label length mismatch. Truncating or adjusting data.'
    );
    data = data.slice(0, chartLabels.length);
  }

  // Chart geometry
  const center = chartSize / 2;
  const padding = 50; // Additional padding to avoid label cutoff
  const radius = (chartSize - padding * 2) / 2;
  const angleStep = (Math.PI * 2) / chartLabels.length;

  // The polygon stroke color & fill from theme
  const polygonStrokeColor = theme.colors.primary;
  const polygonFillColor = theme.colors.primary;

  // For grid lines & circles, use an outline variant or subtle color
  const gridColor = theme.colors.outlineVariant + '80'; // '80' => ~50% opacity
  const gridStrokeWidth = 1;

  // For data points, pick a highlight color
  const pointColor = theme.colors.secondary;

  /**
   * Helper: Convert a data value and angle index to chart coordinates.
   */
  const getCoordinates = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const distance = value * radius;
    return {
      x: center + distance * Math.cos(angle),
      y: center + distance * Math.sin(angle),
    };
  };

  /**
   * Helper: Coordinates for label positioning, slightly outside the polygon.
   */
  const getLabelCoordinates = (index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const labelDistance = radius + 20; // how far labels sit from the outer radius
    return {
      x: center + labelDistance * Math.cos(angle),
      y: center + labelDistance * Math.sin(angle),
    };
  };

  /**
   * Logic to position & anchor multiline labels
   */
  const getLabelLayout = (index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const { x, y } = getLabelCoordinates(index);
    let textAnchor: 'start' | 'middle' | 'end' = 'middle';
    let xOffset = 0;
    let yOffset = 0;
    const maxWidth = 80;

    // Quadrant-based logic to shift label
    if (angle >= -Math.PI / 4 && angle <= Math.PI / 4) {
      textAnchor = 'start';
      xOffset = 8;
    } else if (angle >= (3 * Math.PI) / 4 || angle <= -(3 * Math.PI) / 4) {
      textAnchor = 'end';
      xOffset = -8;
    } else if (angle > Math.PI / 4 && angle < (3 * Math.PI) / 4) {
      textAnchor = 'middle';
      yOffset = 16;
    } else {
      textAnchor = 'middle';
      yOffset = -16;
    }

    // Split label text for multiline rendering
    const words = chartLabels[index].split(' ');
    const lines: string[] = [];
    let currentLine = '';

    words.forEach((word) => {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      // Rough approximation of text width
      if (testLine.length * 5 > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });
    if (currentLine) {
      lines.push(currentLine);
    }

    return { x, y, textAnchor, xOffset, yOffset, lines };
  };

  /**
   * Generate circular grid lines
   */
  const gridCircles = [];
  const gridSteps = 5; // number of concentric circles
  for (let i = 1; i <= gridSteps; i++) {
    const gridRadius = (radius / gridSteps) * i;
    gridCircles.push(
      <Circle
        key={`grid-circle-${i}`}
        cx={center}
        cy={center}
        r={gridRadius}
        stroke={gridColor}
        strokeWidth={gridStrokeWidth}
        fill="none"
      />
    );
  }

  /**
   * Generate radial lines from center
   */
  const radialLines = chartLabels.map((_, idx) => {
    const { x, y } = getCoordinates(1, idx); // full radius
    return (
      <Line
        key={`radial-line-${idx}`}
        x1={center}
        y1={center}
        x2={x}
        y2={y}
        stroke={gridColor}
        strokeWidth={gridStrokeWidth}
      />
    );
  });

  /**
   * Compute data polygon points
   */
  const points = data.map((item, idx) => getCoordinates(item.value, idx));
  const pathData =
    points
      .map((p, idx) => (idx === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`))
      .join(' ') + ' Z';

  return (
    <View style={[styles.container, style]}>
      <Svg width={chartSize} height={chartSize}>
        {/* Grid Circles & Radial Lines */}
        {gridCircles}
        {radialLines}

        {/* Data Polygon */}
        <Path
          d={pathData}
          stroke={polygonStrokeColor}
          strokeWidth={strokeWidth}
          fill={polygonFillColor}
          fillOpacity={fillOpacity}
        />

        {/* Data Points */}
        {points.map((point, idx) => (
          <Circle
            key={`data-point-${idx}`}
            cx={point.x}
            cy={point.y}
            r={5}
            fill={pointColor}
            stroke={theme.colors.background} 
            strokeWidth={2}
            accessibilityLabel={`${chartLabels[idx]}: ${data[idx].value}`}
          />
        ))}

        {/* Labels */}
        {chartLabels.map((_, idx) => {
          const { x, y, textAnchor, xOffset, yOffset, lines } = getLabelLayout(idx);
          return lines.map((line, lineIndex) => (
            <SvgText
              key={`label-${idx}-line-${lineIndex}`}
              x={x + xOffset}
              y={y + yOffset + lineIndex * 12} // line spacing
              fontSize={10}
              fill={theme.colors.onSurfaceVariant}
              fontFamily={theme.fonts.bodyMedium.fontFamily} // or 'Kameron'
              textAnchor={textAnchor}
            >
              {line}
            </SvgText>
          ));
        })}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Center the chart and provide padding for small screens
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
});
