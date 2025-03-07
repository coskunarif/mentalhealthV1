import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import type { AppTheme } from '../types/theme';
import { typographyStyles } from '../config';

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
    color: '#5DA47A', // Use theme color
  },
  {
    title: 'Track Mood',
    icon: 'mood',
    href: '/mood',
    color: '#5DA47A', // Use theme color
  },
];

export default function QuickActions() {
  const theme = useTheme<AppTheme>();
  
  return (
    <View style={styles.container}>
      <Text style={[typographyStyles.text_heading2, styles.title]}>
        Quick Actions
      </Text>
      <View style={styles.grid}>
        {actions.map((action, index) => (
          <Link key={index} href={action.href} asChild>
            <Card
              style={styles.card}
              mode="elevated"
            >
              <Card.Content style={styles.cardContent}>
                <MaterialIcons
                  name={action.icon}
                  size={24}
                  color={action.color}
                  style={styles.icon}
                />
                <Text style={[typographyStyles.text_body, styles.cardTitle]}>
                  {action.title}
                </Text>
              </Card.Content>
            </Card>
          </Link>
        ))}
      </View>
    </View>
  );
}

// Create styles for the component
const styles = StyleSheet.create({
  container: {
    marginVertical: 16, // Follow 8dp grid (16 = 8*2)
  },
  title: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 8, // Compensate for card margins
  },
  card: {
    flex: 1,
    minWidth: 140,
    maxWidth: '45%', // Allow for proper spacing
    margin: 8, // Follow 8dp grid
    borderRadius: 12, // Material Design M3 card radius
    elevation: 1,
  },
  cardContent: {
    alignItems: 'center',
    padding: 16, // MD standard padding
    gap: 8, // Add gap between icon and text
  },
  icon: {
    // marginBottom: 8, // Removed in favor of gap
  },
  cardTitle: {
    textAlign: 'center',
  },
});
