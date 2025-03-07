import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Divider, useTheme, TouchableRipple } from 'react-native-paper';
import type { AppTheme } from '../types/theme';

interface Activity {
  id: string;
  type: 'breath' | 'dreams' | 'awareness';
  title: string;
  subtitle: string;
  duration: number;
}

interface RecentActivitiesProps {
  activities: Activity[];
}

const getRippleColor = (color: string, opacity: number) => {
  // Basic implementation if withOpacity isn't available
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color; // Fallback to the original color
};

export default function RecentActivities({ activities }: RecentActivitiesProps) {
  const theme = useTheme<AppTheme>();

  const styles = React.useMemo(() => StyleSheet.create({
    item: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      minHeight: 48,
    },
    touchable: {
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    divider: {
      marginHorizontal: 16,
      opacity: 0.6,
      height: 0.5,
    },
    title: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
    },
  }), [theme]);

  return (
    <View>
      {activities.map((activity, index) => (
        <React.Fragment key={activity.id}>
          <TouchableRipple 
            onPress={() => {}} 
            rippleColor={getRippleColor(theme.colors.primary, 0.12)}
            style={styles.touchable}
          >
            <View style={styles.item}>
              <Text style={styles.title}>{activity.title}</Text>
              <Text style={styles.subtitle}>
                {activity.subtitle} • {activity.duration} min
              </Text>
            </View>
          </TouchableRipple>
          {index < activities.length - 1 && (
            <Divider style={styles.divider} />
          )}
        </React.Fragment>
      ))}
    </View>
  );
}
