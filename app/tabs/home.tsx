import React from 'react';
import { View, ScrollView as RNScrollView, Dimensions, StyleSheet } from 'react-native';
import { Text, Surface, useTheme, TouchableRipple, IconButton } from 'react-native-paper';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Svg, { Polygon } from 'react-native-svg';

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
  { title: 'Gain awarenes', subtitle: 'Awareness exercise 8', duration: '23.5 min' },
  { title: 'Breath up', subtitle: 'Breath exercise 7', duration: '19.5 min' },
];

export default function HomePage() {
  const router = useRouter();
  const theme = useTheme();
  const screenWidth = Dimensions.get('window').width;
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
    <RNScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        {/* Week Header */}
        <Text variant="headlineSmall" style={{ color: theme.colors.primary }}>
          Week 1
        </Text>

        {/* Radar Chart */}
        <Surface style={styles.chartContainer} elevation={0}>
          <Svg height="300" width="300">
            <Polygon
              points={getPolygonPoints()}
              fill={`${theme.colors.primary}40`}
              stroke={theme.colors.primary}
              strokeWidth="2"
            />
          </Svg>
          {radarPoints.map((point, index) => (
            <Text
              key={index}
              variant="labelSmall"
              style={[
                styles.radarLabel,
                {
                  color: theme.colors.primary,
                  top: centerY + radius * 1.2 * Math.sin((index / radarPoints.length) * 2 * Math.PI - Math.PI / 2),
                  left: centerX + radius * 1.2 * Math.cos((index / radarPoints.length) * 2 * Math.PI - Math.PI / 2),
                },
              ]}
            >
              {point.label}
            </Text>
          ))}
        </Surface>

        {/* Day Progress */}
        <View style={styles.dayProgress}>
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <Surface
              key={day}
              style={[
                styles.dayCircle,
                {
                  borderColor: theme.colors.primary,
                },
              ]}
              elevation={0}
            >
              <Text
                variant="labelSmall"
                style={{ color: theme.colors.primary }}
              >
                Day {day}
              </Text>
            </Surface>
          ))}
        </View>

        {/* Next Session */}
        <TouchableRipple
          onPress={() => router.push('/player')}
          style={[styles.nextSession, { backgroundColor: theme.colors.primary }]}
        >
          <View style={styles.nextSessionContent}>
            <View>
              <Text variant="labelMedium" style={{ color: theme.colors.onPrimary }}>
                Next session
              </Text>
              <Text variant="titleLarge" style={{ color: theme.colors.onPrimary }}>
                Exotic Breath
              </Text>
            </View>
            <IconButton
              icon="play-circle"
              iconColor={theme.colors.onPrimary}
              size={32}
            />
          </View>
        </TouchableRipple>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableRipple
            onPress={() => router.push('/mood')}
            style={[
              styles.actionButton,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            <View style={styles.actionButtonContent}>
              <MaterialCommunityIcons
                name="emoticon-outline"
                size={36}
                color={theme.colors.onPrimary}
              />
              <Text
                variant="titleMedium"
                style={[styles.actionButtonText, { color: theme.colors.onPrimary }]}
              >
                Talk about{'\n'}your mood
              </Text>
            </View>
          </TouchableRipple>

          <TouchableRipple
            onPress={() => router.push('/survey')}
            style={[
              styles.actionButton,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            <View style={styles.actionButtonContent}>
              <MaterialCommunityIcons
                name="account-outline"
                size={36}
                color={theme.colors.onPrimary}
              />
              <Text
                variant="titleMedium"
                style={[styles.actionButtonText, { color: theme.colors.onPrimary }]}
              >
                Keep introducing{'\n'}yourself
              </Text>
            </View>
          </TouchableRipple>
        </View>

        {/* Recent Played */}
        <View style={styles.recentPlayed}>
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.primary }}
          >
            Recent Played
          </Text>
          {recentPlayed.map((item, index) => (
            <View key={index} style={styles.recentItem}>
              <View>
                <Text
                  variant="bodyLarge"
                  style={{ color: theme.colors.primary }}
                >
                  {item.title}
                </Text>
                <Text
                  variant="bodyMedium"
                  style={{ color: theme.colors.onSurfaceVariant }}
                >
                  {item.subtitle}
                </Text>
              </View>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                {item.duration}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </RNScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 24,
  },
  chartContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radarLabel: {
    position: 'absolute',
    textAlign: 'center',
  },
  dayProgress: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextSession: {
    borderRadius: 28,
    overflow: 'hidden',
  },
  nextSessionContent: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
    height: 160,
  },
  actionButton: {
    flex: 1,
    borderRadius: 24,
    overflow: 'hidden',
  },
  actionButtonContent: {
    padding: 24,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionButtonText: {
    textAlign: 'center',
    lineHeight: 24,
  },
  recentPlayed: {
    gap: 16,
  },
  recentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
