import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native'; // Import StyleSheet
import { useTheme } from 'react-native-paper';
import Svg, { Path, Circle, Line, Text as SvgText } from 'react-native-svg'; // Import Line and Text
import type { AppTheme } from '../types/theme';

interface DataPoint {
  value: number;
  label: string;
}

interface RadarChartProps {
  data: DataPoint[];
  style?: ViewStyle;
  size?: number; // Add size prop
}

export default function RadarChart({ data, style, size = 250 }: RadarChartProps) { // Default size
  const theme = useTheme<AppTheme>();
  const center = size / 2;
  const radius = (size - 50) / 2; // Increased padding
  const angleStep = (Math.PI * 2) / data.length;

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
    const distance = radius * 1.15; // Adjust this multiplier for label distance
    const x = center + distance * Math.cos(angle);
    let y = center + distance * Math.sin(angle);

     //Vertical Adjustment for Collision Avoidance (Simple)
     if (angle < -Math.PI / 4 && angle > -3 * Math.PI / 4) {
        y -= 5; // Adjust top labels up slightly
    } else if (angle > Math.PI / 4 && angle < 3 * Math.PI / 4) {
        y += 5; // Adjust bottom labels down slightly
    }

    return { x, y };
  };


  // Create grid lines (concentric circles and radial lines)
  const gridCircles = [];
  for (let i = 1; i <= 5; i++) { // Example: 5 concentric circles
    const gridRadius = (radius / 5) * i;
    gridCircles.push(
      <Circle
        key={`grid-circle-${i}`}
        cx={center}
        cy={center}
        r={gridRadius}
        stroke={theme.colors.outlineVariant} // Light grid color
        strokeWidth={1}
        fill="none" // No fill for grid circles
      />
    );
  }

  const gridLines = data.map((_, index) => {
      const { x, y } = getCoordinates(1, index); // Outer edge for radial lines
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
      )
  });
    const points = data.map((point, index) => getCoordinates(point.value, index));
    const path = points.map(p => `${p.x},${p.y}`).join(' L');


  return (
    <View style={[localStyles.container, style]}>
      <Svg width={size} height={size}>
      {/* Background Grid */}
        {gridCircles}
        {gridLines}

        {/* Data Lines */}
        <Path
          d={`M${points[0].x},${points[0].y} ${path} Z`}
          stroke={theme.colors.secondary} // Different color for the path
          strokeWidth={2.5} // Thicker line
          fill={theme.colors.secondary}
          fillOpacity={0.2}
        />

        {/* Data Points */}
        {points.map((point, index) => (
          <Circle
            key={`point-${index}`}  // Correct key
            cx={point.x}
            cy={point.y}
            r={6} // Larger data points
            fill={theme.colors.tertiary} // Different fill color
            stroke={theme.colors.onSurface}
            strokeWidth={1}
            accessibilityLabel={`Data point ${data[index].label}: ${data[index].value}`} // Accessibility
          />
        ))}

        {/* Integrated Labels (Optional, but recommended) */}
        {data.map((point, index) => {
            const labelCoords = getLabelCoordinates( index); // Place labels outside the grid
            return (
              <SvgText
                key={`label-${index}`}  // Correct Key
                x={labelCoords.x}
                y={labelCoords.y}
                fontSize={12}
                textAnchor="middle"
                alignmentBaseline="middle"
                fill={theme.colors.onSurface} // Ensure readable label color

              >
                {point.label}
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
        justifyContent: 'center'
    },

})
