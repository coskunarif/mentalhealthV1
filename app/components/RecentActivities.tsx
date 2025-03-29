import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Divider, useTheme, TouchableRipple } from 'react-native-paper';
import type { AppTheme } from '../types/theme';

interface Activity {
  id: string;
  type: string; // Change from enum to string
  title: string;
  subtitle: string;
  duration: number;
  timestamp?: Date; // Add this to your interface
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

// Inside the component, add this function:
const getTimeBadge = (timestamp?: Date): string => {
  if (!timestamp) return '';
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);
  
  if (timestamp >= today) return 'Today';
  if (timestamp >= yesterday) return 'Yesterday';
  if (timestamp >= lastWeek) return 'Last Week';
  return 'Earlier';
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
      itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  badgeContainer: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    backgroundColor: theme.colors.surfaceVariant,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '500',
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
              <View style={styles.itemHeader}>
                <Text style={styles.title}>{activity.title}</Text>
                {getTimeBadge(activity.timestamp) && (
                  <View style={[styles.badgeContainer, {
                    backgroundColor: theme.colors.surfaceVariant
                  }]}>
                    <Text style={styles.badgeText}>{getTimeBadge(activity.timestamp)}</Text>
                  </View>
                )}
              </View>
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
