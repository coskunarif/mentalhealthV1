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

  // Increase padding further to prevent label truncation
  const padding = 70; // Increased from 60 to 70
  const radius = (size - padding * 2) / 2;
  const angleStep = (Math.PI * 2) / staticLabels.length;

  const pointColor = '#FFF176';
  
  // Define grid colors with increased opacity
  const gridColor = theme.colors.outlineVariant + "80"; // Increased from 40 to 80
  const gridStrokeWidth = 1; // Increased from 0.5 to 1

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
    // Increase label distance from the chart
    const labelDistance = radius + 25;
    return {
      x: center + labelDistance * Math.cos(angle),
      y: center + labelDistance * Math.sin(angle),
    };
  };

  // Calculate label positioning and wrapping
  const getLabelLayout = (index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const { x, y } = getLabelCoordinates(index);
    let textAnchor: "start" | "middle" | "end" = "middle";
    let xOffset = 0;
    let yOffset = 0;
    let maxWidth = 80;

    // Enhanced positioning logic for better label placement
    if (angle >= -Math.PI / 4 && angle <= Math.PI / 4) {
      textAnchor = "start";
      xOffset = 12; // Increased from 8 to 12
    } else if (angle >= (3 * Math.PI) / 4 || angle <= -(3 * Math.PI) / 4) {
      textAnchor = "end";
      xOffset = -12; // Increased from -8 to -12
    } else if (angle > Math.PI / 4 && angle < (3 * Math.PI) / 4) {
      textAnchor = "middle";
      yOffset = 16; // Increased from 12 to 16
    } else {
      textAnchor = "middle";
      yOffset = -16; // Increased from -12 to -16
    }

    // Special handling for "Breath Up" label
    if (staticLabels[index] === "Breath up") {
      if (angle < 0) {
        xOffset -= 8; // Additional offset for "Breath Up" when in upper half
      }
    }

    // Enhanced text wrapping logic
    const words = staticLabels[index].split(' ');
    let lines: string[] = [];
    let currentLine = '';

    words.forEach(word => {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
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

  // Enhanced grid circles with increased visibility
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
        stroke={gridColor}
        strokeWidth={gridStrokeWidth}
        fill="none"
      />
    );
  }

  // Enhanced grid lines with increased visibility
  const gridLines = staticLabels.map((_, index) => {
    const { x, y } = getCoordinates(1, index);
    return (
      <Line
        key={`grid-line-${index}`}
        x1={center}
        y1={center}
        x2={x}
        y2={y}
        stroke={gridColor}
        strokeWidth={gridStrokeWidth}
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
        {/* Background grid elements */}
        {gridCircles}
        {gridLines}

        {/* Data visualization */}
        <Path
          d={pathData}
          stroke={theme.colors.primary}
          strokeWidth={strokeWidth}
          fill={theme.colors.primary}
          fillOpacity={fillOpacity}
        />

        {/* Data points */}
        {points.map((point, index) => (
          <Circle
            key={`point-${index}`}
            cx={point.x}
            cy={point.y}
            r={6}
            fill={pointColor}
            stroke="#FFFFFF"
            strokeWidth={2}
            accessibilityLabel={`Data point ${staticLabels[index]}: ${data[index].value}`}
          />
        ))}

        {/* Labels */}
        {staticLabels.map((_, index) => {
          const { x, y, textAnchor, xOffset, yOffset, lines } = getLabelLayout(index);
          return (
            <React.Fragment key={`label-${index}`}>
              {lines.map((line, lineIndex) => (
                <SvgText
                  key={`label-${index}-line-${lineIndex}`}
                  x={x + xOffset}
                  y={y + yOffset + (lineIndex * 14)} // Increased line spacing from 12 to 14
                  fontSize={9}
                  fontFamily="SpaceMono-Regular"
                  textAnchor={textAnchor}
                  fill={theme.colors.primary}
                  fontWeight="bold"
                >
                  {line}
                </SvgText>
              ))}
            </React.Fragment>
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
    padding: 8, // Added padding to container
  },
});
