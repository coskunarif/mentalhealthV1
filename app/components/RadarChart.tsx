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
  const padding = 50;
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
    const labelDistance = radius + 20;
    return { x: center + labelDistance * Math.cos(angle), y: center + labelDistance * Math.sin(angle) };
  };

  const getLabelLayout = (index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const { x, y } = getLabelCoordinates(index);
    let textAnchor: 'start' | 'middle' | 'end' = 'middle';
    let xOffset = 0;
    let yOffset = 0;
    const maxWidth = 80;
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
    const words = chartLabels[index].split(' ');
    const lines: string[] = [];
    let currentLine = '';
    words.forEach((word) => {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      if (testLine.length * 5 > maxWidth && currentLine) {
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
      // Add material design contrast colors
      fill: theme.colors.onSurface, // Increased contrast from onSurfaceVariant
      fontWeight: '500', // Medium weight for better readability
    };
  };

  const gridCircles = [];
  const gridSteps = 5;
  for (let i = 1; i <= gridSteps; i++) {
    const gridRadius = (radius / gridSteps) * i;
    const value = (i / gridSteps).toFixed(1);
    const isMinorGrid = i % 2 !== 0;
    gridCircles.push(
      <React.Fragment key={`grid-circle-${i}`}>
        <Circle
          cx={center}
          cy={center}
          r={gridRadius}
          stroke={gridColor}
          strokeWidth={isMinorGrid ? 0.5 : 1}
          strokeDasharray={isMinorGrid ? '2,2' : 'none'}
          fill="none"
        />
        {!isMinorGrid && (
          <SvgText
            x={center}
            y={center - gridRadius - 5}
            fontSize={8}
            fill={theme.colors.onSurfaceVariant}
            textAnchor="middle"
          >
            {value}
          </SvgText>
        )}
      </React.Fragment>
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
              r={8} // Increased from 5 for better touch target
              fill={pointColor}
              stroke={theme.colors.background}
              strokeWidth={2}
              opacity={0.8} // For better visual appearance
              accessibilityLabel={`${chartLabels[idx]}: ${data[idx].value}`}
            />
            {/* Add value label near each point */}
            <SvgText
              x={point.x}
              y={point.y - 12}
              fontSize={10}
              fontWeight='bold'
              fill={theme.colors.onSurface}
              stroke={theme.colors.surface}
              strokeWidth={2}
              textAnchor='middle'
            >
              {(data[idx].value * 100).toFixed(0)}%
            </SvgText>
</React.Fragment>
        ))}
        {chartLabels.map((_, idx) => {
          const {
            x,
            y,
            textAnchor,
            xOffset,
            yOffset,
            lines,
            fill,
            fontWeight,
          } = getLabelLayout(idx);
          return lines.map((line, lineIndex) => (
            <SvgText
              key={`label-${idx}-line-${lineIndex}`}
              x={x + xOffset}
              y={y + yOffset + lineIndex * 12}
              fontSize={11} // Slightly increased for readability
              fill={fill}
              fontWeight={fontWeight}
              fontFamily={theme.fonts.bodyMedium.fontFamily}
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
    padding: 8, // Follow 8dp grid system
  },
});
