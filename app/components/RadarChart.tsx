import React, { useMemo } from 'react';
import { View, ViewStyle, StyleSheet, useWindowDimensions, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import Svg, { Path, Circle, Line, Text as SvgText } from 'react-native-svg';
import type { AppTheme } from '../types/theme';
import { safeStringify } from '../lib/debug-utils';

export interface DataPoint {
  label: string;
  value: number;
}

interface RadarChartProps {
  data: DataPoint[];
  style?: ViewStyle;
  size?: number;
  strokeWidth?: number;
  fillOpacity?: number;
  labels?: string[];
}

// Default function category labels for radar chart
export const EXERCISE_CATEGORY_LABELS = [
  'Balance Memories',
  'Change Opinion',
  'Support Dreams',
  'Gain Awareness',
  'Breathe Up', // Keep labels but update constant name

];



const defaultLabels = EXERCISE_CATEGORY_LABELS;

export default function RadarChart({
  data,
  style,
  size,
  strokeWidth = 2,
  fillOpacity = 0.25,
  labels,
}: RadarChartProps) {
  const theme = useTheme<AppTheme>();
  const { width: screenWidth } = useWindowDimensions();
  // Increased default chart size to accommodate labels better
  const chartSize = size || Math.min(screenWidth - 24, 340);

  console.log('🔍 [CHART DEBUG] RadarChart rendering with data:', safeStringify(data));
  console.log('🔍 [CHART DEBUG] RadarChart labels:', safeStringify(labels));

  // Validate and fix data using useMemo to avoid unnecessary recalculations
  const { validData, chartLabels, hasError } = useMemo(() => {
    let result = {
      validData: [] as DataPoint[],
      chartLabels: [] as string[],
      hasError: false
    };

    // Validate data
    if (!data || !Array.isArray(data)) {
      console.error('❌ [CHART DEBUG] Invalid data provided to RadarChart:', data);
      result.validData = [];
      result.hasError = true;
    } else {
      // Deep copy and validate each data point
      result.validData = data.map((point, index) => {
        if (!point || typeof point !== 'object') {
          console.error(`❌ [CHART DEBUG] Invalid data point at index ${index}:`, point);
          result.hasError = true;
          return { label: `Unknown ${index}`, value: 0 };
        }

        if (typeof point.value !== 'number' || isNaN(point.value)) {
          console.error(`❌ [CHART DEBUG] Invalid value at index ${index}:`, point.value);
          result.hasError = true;
          return { ...point, value: 0 };
        }

        if (point.value < 0 || point.value > 1) {
          console.warn(`⚠️ [CHART DEBUG] Value out of range at index ${index}:`, point.value);
          return {
            ...point,
            value: Math.min(Math.max(point.value, 0), 1)
          };
        }

        return { ...point };
      });
    }

    // Validate labels
    if (!labels || !Array.isArray(labels)) {
      console.error('❌ [CHART DEBUG] Invalid labels provided to RadarChart:', labels);
      result.chartLabels = [...defaultLabels];
      result.hasError = true;
    } else {
      result.chartLabels = [...labels];
    }

    // Check for length mismatch
    if (result.validData.length !== result.chartLabels.length) {
      console.warn(
        `⚠️ [CHART DEBUG] Data length (${result.validData.length}) and label length (${result.chartLabels.length}) mismatch.`
      );

      // If we have more data points than labels, truncate data
      if (result.validData.length > result.chartLabels.length) {
        console.warn('⚠️ [CHART DEBUG] Truncating data to match labels length');
        result.validData = result.validData.slice(0, result.chartLabels.length);
      }

      // If we have more labels than data points, add dummy data points
      if (result.validData.length < result.chartLabels.length) {
        console.warn('⚠️ [CHART DEBUG] Adding dummy data points to match labels length');
        const dummyPoints = result.chartLabels.slice(result.validData.length).map((label, index) => ({
          label,
          value: 0
        }));
        result.validData = [...result.validData, ...dummyPoints];
      }
    }

    return result;
  }, [data, labels]);

  // If we have no valid data or labels, show a placeholder
  if (validData.length === 0 || chartLabels.length === 0) {
    return (
      <View style={[styles.container, style, styles.placeholderContainer]}>
        <Text style={styles.placeholderText}>No data available</Text>
      </View>
    );
  }
  const center = chartSize / 2;
  const padding = 60; // Further increased padding to accommodate labels
  const radius = (chartSize - padding * 2) / 2;
  const angleStep = (Math.PI * 2) / chartLabels.length;
  const polygonStrokeColor = theme.colors.primary;
  const polygonFillColor = theme.colors.primary;
  const gridColor = theme.colors.outlineVariant + '80';
  const gridStrokeWidth = 1;
  const pointColor = theme.colors.secondary;

  const getCoordinates = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const distance = value * radius;
    return { x: center + distance * Math.cos(angle), y: center + distance * Math.sin(angle) };
  };

  const getLabelCoordinates = (index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    // Adjust label distance based on angle to prevent labels from being cut off
    let labelDistance = radius + 20;

    // Reduce distance for horizontal labels (right/left) to prevent them from being cut off
    if (Math.abs(Math.cos(angle)) > 0.7) {
      labelDistance = radius + 15;
    }

    return { x: center + labelDistance * Math.cos(angle), y: center + labelDistance * Math.sin(angle) };
  };

  const getLabelLayout = (index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const { x, y } = getLabelCoordinates(index);
    let textAnchor: 'start' | 'middle' | 'end' = 'middle';
    let xOffset = 0;
    let yOffset = 0;
    const maxWidth = 80; // Reduced max width to encourage more line breaks for long labels

    // Adjust horizontal alignment based on angle
    if (Math.cos(angle) > 0.7) { // Right side
      textAnchor = 'start';
      xOffset = -5;
    } else if (Math.cos(angle) < -0.7) { // Left side
      textAnchor = 'end';
      xOffset = 5;
    }

    // Dynamic yOffset based on angle (above or below the center)
    if (angle > 0 && angle < Math.PI) {
      yOffset = 10; // Below the center
    } else if (angle < 0 && angle > -Math.PI) {
      yOffset = -8; // Above the center
    } else {
      yOffset = -6;
    }

    if (angle === Math.PI) { // Special case for the bottom label
      yOffset = 20;
    }

    // Improved word wrapping for labels
    const words = chartLabels[index].split(' ');
    const lines: string[] = [];
    let currentLine = '';

    // Force line breaks for longer labels (like "Change Opinion")
    if (words.length >= 2 && chartLabels[index].length > 10) {
      // For labels with exactly 2 words, put each word on its own line
      if (words.length === 2) {
        return {
          x,
          y,
          textAnchor,
          xOffset,
          yOffset: yOffset - 6, // Adjust for multi-line
          lines: words,
          fill: theme.colors.onSurface,
          fontWeight: '500',
        };
      }

      // For longer labels, use more aggressive word wrapping
      words.forEach((word) => {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        if (testLine.length * 5 > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      });
    } else {
      // Standard word wrapping for shorter labels
      words.forEach((word) => {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        if (testLine.length * 6 > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      });
    }

    if (currentLine) lines.push(currentLine);
    return {
      x,
      y,
      textAnchor,
      xOffset,
      yOffset,
      lines,
      fill: theme.colors.onSurface,
      fontWeight: '500',
    };
  };

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
        stroke={theme.colors.outlineVariant}
        strokeWidth={1}
        strokeOpacity={i === gridSteps ? 0.8 : 0.4}
        fill="none"
      />
    );
  }

  const radialLines = chartLabels.map((_, idx) => {
    const { x, y } = getCoordinates(1, idx);
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

  const points = validData.map((item, idx) => getCoordinates(item.value, idx));

  // Only create a path if we have at least 3 points (to form a polygon)
  let pathData = '';
  if (points.length >= 3) {
    pathData = points
      .map((p, idx) => (idx === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`))
      .join(' ') + ' Z';
  }

  return (
    <View style={[styles.container, style]}>
      {hasError && (
        <Text style={styles.errorText}>
          Some data may be incomplete or missing
        </Text>
      )}
      <Svg width={chartSize} height={chartSize}>
        {gridCircles}
        {radialLines}
        {pathData && (
          <Path
            d={pathData}
            stroke={polygonStrokeColor}
            strokeWidth={strokeWidth}
            fill={polygonFillColor}
            fillOpacity={fillOpacity}
          />
        )}
        {points.map((point, idx) => (
          <React.Fragment key={`data-point-${idx}`}>
            <Circle
              cx={point.x}
              cy={point.y}
              r={24}
              fill="transparent"
              accessibilityLabel={`${chartLabels[idx]}: ${validData[idx].value}`}
            />
            <Circle
              cx={point.x}
              cy={point.y}
              r={8}
              fill={pointColor}
              stroke={theme.colors.background}
              strokeWidth={2}
            />
            <Circle
              cx={point.x}
              cy={point.y - 16}
              r={14}
              fill="#FFFFFF"
              fillOpacity={0.8}
              stroke={theme.colors.primary}
              strokeWidth={0.5}
            />
            <SvgText
              x={point.x}
              y={point.y - 16}
              fontSize={12}
              fontWeight="700"
              fill="#4A4A4A"
              textAnchor="middle"
              dy={4}
            >
              {(typeof validData[idx].value === 'number' ? (validData[idx].value * 100).toFixed(0) : '0')}%
            </SvgText>
          </React.Fragment>
        ))}
        {chartLabels.map((_, idx) => {
          const { x, y, textAnchor, xOffset, yOffset, lines } = getLabelLayout(idx);
          return lines.map((line, lineIndex) => (
            <SvgText
              key={`label-${idx}-line-${lineIndex}`}
              x={x + xOffset}
              y={y + yOffset + lineIndex * 11}
              fontSize={11}
              fontWeight="500"
              fill={theme.colors.onSurface}
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
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    padding: 8,
  },
  placeholderContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 12,
    color: '#ff6b6b',
    marginBottom: 8,
    textAlign: 'center',
  }
});
