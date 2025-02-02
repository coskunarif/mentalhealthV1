import React from 'react';
import { View, ScrollView as RNScrollView, Dimensions } from 'react-native';
import { Text, Surface, useTheme, TouchableRipple } from 'react-native-paper';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Svg, { Polygon } from 'react-native-svg';
import { createGradientConfig } from '../utils/styleEnhancements';
import { globalStyles } from '../config/styles';

const radarPoints = [
  { label: 'Balance past\nmemories', value: 0.8 },
  { label: 'Change your\nopinion', value: 0.6 },
  { label: 'Support dreams', value: 0.7 },
  { label: 'Gain awareness', value: 0.9 },
  { label: 'Breath\nup', value: 0.75 },
];

const recentPlayed = [
  { title: 'Breath up', subtitle: 'Breath exercise 12', duration: '18.5 min' },
  { title: 'Support your dreams', subtitle: 'Dreams exercise 5', duration: '14.5 min' },
  { title: 'Gain awareness', subtitle: 'Awareness exercise 8', duration: '23.5 min' },
  { title: 'Breath up', subtitle: 'Breath exercise 7', duration: '19.5 min' },
];

export default function HomePage() {
  const router = useRouter();
  const theme = useTheme();
  const centerX = 150;
  const centerY = 150;
  const radius = 100;

  // Calculate radar chart points
  const getPolygonPoints = () => {
    return radarPoints
      .map((point, index) => {
        const angle = (index / radarPoints.length) * 2 * Math.PI - Math.PI / 2;
        const x = centerX + radius * point.value * Math.cos(angle);
        const y = centerY + radius * point.value * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(' ');
  };

  return (
    <RNScrollView style={globalStyles.homeContainer}>
      <View style={globalStyles.homeContent}>
        {/* Week Header */}
        <Text style={globalStyles.homeScreenHeader}>Week 1</Text>

        {/* Radar Chart */}
        <Surface style={globalStyles.radarChartContainer}>
          <Svg height="300" width="300">
            <Polygon
              points={getPolygonPoints()}
              fill={`${theme.colors.primary}40`}
              stroke={theme.colors.primary}
              strokeWidth="2"
            />
          </Svg>
          {radarPoints.map((point, index) => {
            const angle = (index / radarPoints.length) * 2 * Math.PI - Math.PI / 2;
            const x = centerX + (radius + 30) * Math.cos(angle);
            const y = centerY + (radius + 30) * Math.sin(angle);
            return (
              <Text
                key={point.label}
                style={[
                  globalStyles.radarLabel,
                  {
                    left: x - 40,
                    top: y - 10,
                    width: 80,
                  },
                ]}
              >
                {point.label}
              </Text>
            );
          })}
        </Surface>

        {/* Day Progress */}
        <View style={globalStyles.dayProgressContainer}>
          {[1, 2, 3, 4, 5].map((day) => (
            <View
              key={day}
              style={[
                globalStyles.dayCircle,
                day < 3 && { backgroundColor: theme.colors.primary },
              ]}
            >
              <Text
                style={[
                  globalStyles.labelLarge,
                  {
                    color: day < 3 ? theme.colors.onPrimary : theme.colors.primary,
                  },
                ]}
              >
                {day}
              </Text>
            </View>
          ))}
        </View>

        {/* Next Session */}
        <View style={globalStyles.nextSessionCard}>
          <TouchableRipple
            onPress={() => router.push('/player')}
            style={globalStyles.nextSessionContent}
          >
            <>
              <View>
                <Text style={globalStyles.titleLarge}>Next Session</Text>
                <Text style={globalStyles.bodyMedium}>Breath Exercise 13</Text>
                <Text style={[globalStyles.labelMedium, { color: theme.colors.primary }]}>
                  20 min
                </Text>
              </View>
              <MaterialIcons
                name="play-circle-filled"
                size={48}
                color={theme.colors.primary}
              />
            </>
          </TouchableRipple>
        </View>

        {/* Action Buttons */}
        <View style={globalStyles.actionButtonsContainer}>
          {['Take Survey', 'Track Mood'].map((action, index) => (
            <View
              key={action}
              style={globalStyles.actionButtonWrapper}
            >
              <TouchableRipple
                onPress={() => router.push(index === 0 ? '/survey' : '/mood')}
                style={globalStyles.actionButtonContent}
              >
                <>
                  <MaterialCommunityIcons
                    name={index === 0 ? 'clipboard-text' : 'emoticon'}
                    size={32}
                    color={theme.colors.primary}
                  />
                  <Text style={globalStyles.actionButtonText}>{action}</Text>
                </>
              </TouchableRipple>
            </View>
          ))}
        </View>

        {/* Recent Activities */}
        <View style={globalStyles.recentActivitiesContainer}>
          <Text style={globalStyles.titleLarge}>Recent Activities</Text>
          {recentPlayed.map((item, index) => (
            <Surface key={index} style={globalStyles.recentActivityItem}>
              <View>
                <Text style={globalStyles.recentActivityTitle}>{item.title}</Text>
                <Text style={globalStyles.recentActivitySubtitle}>
                  {item.subtitle}
                </Text>
              </View>
              <Text style={globalStyles.recentActivityDuration}>
                {item.duration}
              </Text>
            </Surface>
          ))}
        </View>
      </View>
    </RNScrollView>
  );
}
