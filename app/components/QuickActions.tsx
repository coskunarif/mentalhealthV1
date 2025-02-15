// File: app/components/QuickActions.tsx
import React from 'react';
import { View } from 'react-native';
import { Surface, Text, Button, useTheme } from 'react-native-paper';
import { Link } from 'expo-router';
import quickActionsStyles from '../config/quickActions.styles';
import type { AppTheme } from '../types/theme';

export default function QuickActions() {
  const theme = useTheme<AppTheme>();

  return (
    <Surface style={quickActionsStyles.surface}>
      {/* Section Title */}
      <Text variant="headlineMedium" style={quickActionsStyles.headerText}>
        Quick Actions
      </Text>

      {/* Buttons Container */}
      <View style={quickActionsStyles.actionsContainer}>
        <Link href="/survey" asChild>
          <Button
            mode="contained-tonal"
            icon="clipboard-text"
            style={quickActionsStyles.button}
            labelStyle={quickActionsStyles.buttonLabel}
          >
            Take Survey
          </Button>
        </Link>

        <Link href="/mood" asChild>
          <Button
            mode="contained-tonal"
            icon="emoticon"
            style={quickActionsStyles.button}
            labelStyle={quickActionsStyles.buttonLabel}
          >
            Track Mood
          </Button>
        </Link>
      </View>
    </Surface>
  );
}
