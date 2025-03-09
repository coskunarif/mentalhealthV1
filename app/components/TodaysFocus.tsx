import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface, useTheme, Divider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import type { AppTheme } from '../types/theme';
import { typographyStyles } from '../config';

interface TodaysFocusProps {
  goal: string;
  affirmation: string;
  sectionStyle?: object;
}

export default function TodaysFocus({ goal, affirmation, sectionStyle }: TodaysFocusProps) {
  const theme = useTheme<AppTheme>();
  
  const styles = React.useMemo(() => StyleSheet.create({
    container: {
      borderRadius: theme.componentSizes.cardBorderRadius,
      backgroundColor: theme.colors.surface,
      elevation: 1,
      padding: 16,
    },
    title: {
      marginBottom: 16,
      fontSize: 20,
      fontWeight: '500',
      letterSpacing: 0.15,
    },
    sectionContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 16,
    },
    iconContainer: {
      marginRight: 12,
      marginTop: 2,
    },
    contentContainer: {
      flex: 1,
    },
    sectionLabel: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.colors.primary,
      marginBottom: 4,
    },
    text: {
      fontSize: 16,
      color: theme.colors.onSurface,
      lineHeight: 24,
    },
    divider: {
      marginVertical: 16,
    },
  }), [theme]);

  return (
    <Surface style={[styles.container, sectionStyle]} elevation={1}>
      <Text style={[typographyStyles.text_heading2, styles.title]}>
        Today's Focus
      </Text>
      
      <View style={styles.sectionContainer}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="track-changes" size={24} color={theme.colors.primary} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.sectionLabel}>Goal</Text>
          <Text style={styles.text}>{goal}</Text>
        </View>
      </View>
      
      <Divider style={styles.divider} />
      
      <View style={styles.sectionContainer}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="auto-awesome" size={24} color={theme.colors.primary} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.sectionLabel}>Affirmation</Text>
          <Text style={styles.text}>{affirmation}</Text>
        </View>
      </View>
    </Surface>
  );
}