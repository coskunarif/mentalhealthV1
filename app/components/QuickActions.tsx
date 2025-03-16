import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Text, Surface, useTheme } from 'react-native-paper';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import type { AppTheme } from '../types/theme';
import { typographyStyles } from '../config';
import styles from '../config/quickActions.styles';

type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

const actions: {
  title: string;
  icon: MaterialIconName;
  href: string;
  color: string;
}[] = [
  {
    title: 'Take Survey',
    icon: 'assignment',
    href: '/survey',
    color: '#5DA47A',
  },
  {
    title: 'Track Mood',
    icon: 'mood',
    href: '/mood',
    color: '#5DA47A',
  },
];

interface QuickActionsProps {
  sectionStyle?: object;
}

export default function QuickActions({ sectionStyle }: QuickActionsProps) {
  const theme = useTheme<AppTheme>();
  const buttonScales = React.useMemo(
    () => actions.map(() => new Animated.Value(1)),
    [actions]
  );

  return (
    <Surface style={[
      styles.container,
      sectionStyle,
      {
        borderRadius: theme.componentSizes.cardBorderRadius,
        backgroundColor: theme.colors.surface,
        elevation: 1,
      },
    ]}>
      <Text style={[typographyStyles.text_heading2, styles.title]}>
        Quick Actions
      </Text>
      <View style={styles.fabContainer}>
        {actions.map((action, index) => (
          <Link key={index} href={action.href} asChild>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                transform: [{ scale: buttonScales[index] }], // Use the right scale for this button
              }}
              onPressIn={() => {
                Animated.timing(buttonScales[index], {
                  toValue: 0.95,
                  duration: 100,
                  useNativeDriver: true,
                }).start();
              }}
              onPressOut={() => {
                Animated.timing(buttonScales[index], {
                  toValue: 1,
                  duration: 100,
                  useNativeDriver: true,
                }).start();
              }}
            >
              <View>
                <View style={[styles.fabButton, { backgroundColor: theme.colors.primary }]}>
                  <MaterialIcons
                    name={action.icon}
                    size={32} // Increased from 28
                    color={theme.colors.onPrimary}
                  />
                </View>
                <View style={styles.labelContainer}>
                  <Text style={styles.labelText}>
                    {action.title}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </Surface>
  );
}
