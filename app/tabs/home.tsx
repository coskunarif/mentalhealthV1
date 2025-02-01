import React from 'react';
import { View, ScrollView as RNScrollView, Dimensions, StyleSheet, Animated } from 'react-native';
import { Text, Surface, useTheme, TouchableRipple, IconButton } from 'react-native-paper';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Svg, { Polygon } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { enhanceShadow, createPressAnimation, createGradientConfig } from '../utils/styleEnhancements';

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

  // Animation values for various components
  const nextSessionScale = new Animated.Value(1);
  const actionButtonsScale = new Animated.Value(1);
  const recentItemsOpacity = new Animated.Value(0);
  const dayProgressScale = new Animated.Value(0.95);

  React.useEffect(() => {
    // Breathing animation for next session
    Animated.loop(
      Animated.sequence([
        Animated.timing(nextSessionScale, {
          toValue: 1.03,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(nextSessionScale, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Fade in animation for recent items
    Animated.timing(recentItemsOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Subtle pulse animation for day progress
    Animated.loop(
      Animated.sequence([
        Animated.timing(dayProgressScale, {
          toValue: 1.02,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(dayProgressScale, {
          toValue: 0.95,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

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
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      ...enhanceShadow('medium'),
    },
    radarLabel: {
      position: 'absolute',
      textAlign: 'center',
    },
    dayProgress: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 8,
      padding: 16,
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      ...enhanceShadow('soft'),
    },
    dayCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 1.5,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
    },
    nextSession: {
      borderRadius: 28,
      overflow: 'hidden',
      ...enhanceShadow('medium'),
      backgroundColor: theme.colors.surface,
    },
    nextSessionContent: {
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    actionButtons: {
      flexDirection: 'row',
      gap: 16,
      height: 160,
    },
    actionButtonWrapper: {
      flex: 1,
      ...enhanceShadow('medium'),
      backgroundColor: theme.colors.surface,
      borderRadius: 24,
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
      padding: 16,
      borderRadius: 16,
      marginBottom: 12,
      ...enhanceShadow('soft'),
    },
  });

  return (
    <RNScrollView style={[styles.container, { backgroundColor: theme.colors.primaryContainer }]}>
      <View style={styles.content}>
        {/* Week Header */}
        <Text variant="headlineSmall" style={{ color: theme.colors.primary, marginBottom: 8 }}>
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
        <Animated.View style={{ transform: [{ scale: dayProgressScale }] }}>
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
        </Animated.View>

        {/* Next Session with animation and gradient */}
        <Animated.View style={{ transform: [{ scale: nextSessionScale }] }}>
          <TouchableRipple
            onPress={() => router.push('/player')}
            style={[styles.nextSession]}
          >
            <LinearGradient
              colors={[theme.colors.primary, `${theme.colors.primary}E6`] as [string, string]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.nextSessionContent]}
            >
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
            </LinearGradient>
          </TouchableRipple>
        </Animated.View>

        {/* Action Buttons with enhanced visuals */}
        <View style={styles.actionButtons}>
          {['mood', 'survey'].map((route, index) => {
            const isFirst = route === 'mood';
            return (
              <Animated.View
                key={route}
                style={[
                  { transform: [{ scale: actionButtonsScale }] },
                  styles.actionButtonWrapper,
                ]}
              >
                <TouchableRipple
                  onPress={() => router.push(`/${route}`)}
                  style={[styles.actionButton]}
                >
                  <LinearGradient
                    colors={[theme.colors.primary, `${theme.colors.primary}E6`] as [string, string]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.actionButtonContent}
                  >
                    <MaterialCommunityIcons
                      name={isFirst ? "emoticon-outline" : "account-outline"}
                      size={36}
                      color={theme.colors.onPrimary}
                    />
                    <Text
                      variant="titleMedium"
                      style={[styles.actionButtonText, { color: theme.colors.onPrimary }]}
                    >
                      {isFirst ? 'Talk about\nyour mood' : 'Keep introducing\nyourself'}
                    </Text>
                  </LinearGradient>
                </TouchableRipple>
              </Animated.View>
            );
          })}
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
            <Animated.View 
              key={index} 
              style={{ 
                opacity: recentItemsOpacity,
                transform: [{ 
                  translateY: recentItemsOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  })
                }]
              }}
            >
              <TouchableRipple
                onPress={() => router.push('/player')}
              >
                <View style={[
                  styles.recentItem,
                  { backgroundColor: theme.colors.surface }
                ]}>
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
              </TouchableRipple>
            </Animated.View>
          ))}
        </View>
      </View>
    </RNScrollView>
  );
}
