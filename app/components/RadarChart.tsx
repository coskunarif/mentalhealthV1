import React from 'react';
import { View, ViewStyle, StyleSheet, useWindowDimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import Svg, { Path, Circle, Line, Text as SvgText } from 'react-native-svg';
import type { AppTheme } from '../types/theme';

interface DataPoint {
  label?: string;
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
  size,
  strokeWidth = 2,
  fillOpacity = 0.25,
  labels,
}: RadarChartProps) {
  const theme = useTheme<AppTheme>();
  const { width: screenWidth } = useWindowDimensions();
  const chartSize = size || Math.min(screenWidth - 32, 320);
  const chartLabels = labels || defaultLabels;
  if (data.length !== chartLabels.length) {
    console.warn(
      'RadarChart: data length and label length mismatch. Truncating or adjusting data.'
    );
    data = data.slice(0, chartLabels.length);
  }
  const center = chartSize / 2;
  const padding = 50; // Increased padding
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
    const labelDistance = radius + 20; // Reduced distance
    return { x: center + labelDistance * Math.cos(angle), y: center + labelDistance * Math.sin(angle) };
  };

  const getLabelLayout = (index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const { x, y } = getLabelCoordinates(index);
    let textAnchor: 'start' | 'middle' | 'end' = 'middle';
    let xOffset = 0;
    let yOffset = 0;
    const maxWidth = 100;

    //No xOffset

    // Dynamic yOffset based on angle (above or below the center)
    if (angle > 0 && angle < Math.PI) {
      yOffset = 10; // Below the center
    } else if (angle < 0 && angle > -Math.PI) {
      yOffset = -8; // Above the center
    } else {
      yOffset = -6;
    }

    if (angle === Math.PI) { //Special case for the bottom label
      yOffset = 20;
    }

    const words = chartLabels[index].split(' ');
    const lines: string[] = [];
    let currentLine = '';
    words.forEach((word) => {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      if (testLine.length * 6 > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });
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

  const points = data.map((item, idx) => getCoordinates(item.value, idx));
  const pathData =
    points
      .map((p, idx) => (idx === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`))
      .join(' ') + ' Z';

  return (
    <View style={[styles.container, style]}>
      <Svg width={chartSize} height={chartSize}>
        {gridCircles}
        {radialLines}
        <Path
          d={pathData}
          stroke={polygonStrokeColor}
          strokeWidth={strokeWidth}
          fill={polygonFillColor}
          fillOpacity={fillOpacity}
        />
        {points.map((point, idx) => (
          <React.Fragment key={`data-point-${idx}`}>
            <Circle
              cx={point.x}
              cy={point.y}
              r={24}
              fill="transparent"
              accessibilityLabel={`${chartLabels[idx]}: ${data[idx].value}`}
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
              {(data[idx].value * 100).toFixed(0)}%
            </SvgText>
          </React.Fragment>
        ))}
        {chartLabels.map((_, idx) => {
          const { x, y, textAnchor, xOffset, yOffset, lines } = getLabelLayout(idx);
          return lines.map((line, lineIndex) => (
            <SvgText
              key={`label-${idx}-line-${lineIndex}`}
              x={x + xOffset}
              y={y + yOffset + lineIndex * 12}
              fontSize={12}
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
});
