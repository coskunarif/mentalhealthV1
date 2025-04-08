import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Divider, useTheme, TouchableRipple, Icon } from 'react-native-paper'; // Import Icon
import type { AppTheme } from '../types/theme';
import { UserActivity } from '../models/user.model'; // Import UserActivity type

interface Activity extends UserActivity { // Use UserActivity interface
  // Inherits properties from UserActivity
}

interface RecentActivitiesProps {
  activities: UserActivity[]; // Use UserActivity[]
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

// Add the icon mapping function
const getActivityIcon = (type: string): string => {
  switch (type) {
    case 'exercise':
      return 'fitness-center'; // Material Icons name
    case 'mood':
      return 'mood'; // Material Icons name
    case 'survey':
      return 'assignment'; // Material Icons name
    default:
      return 'history'; // Default icon
  }
};

export default function RecentActivities({ activities }: RecentActivitiesProps) {
  const theme = useTheme<AppTheme>();

    const styles = React.useMemo(() => StyleSheet.create({
    item: {
      // Removed paddingHorizontal, handled by touchable
      paddingVertical: 8,
      minHeight: 48,
      flexDirection: 'row', // Arrange icon and text horizontally
      alignItems: 'center', // Align items vertically
    },
    iconContainer: {
      marginRight: 16, // Space between icon and text
      width: 24, // Fixed width for alignment
      alignItems: 'center',
    },
    textContainer: {
      flex: 1, // Allow text to take remaining space
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
              {/* Icon */}
              <View style={styles.iconContainer}>
                <Icon 
                  source={getActivityIcon(activity.type)} 
                  size={24} 
                  color={theme.colors.onSurfaceVariant} 
                />
              </View>
              {/* Text Content */}
              <View style={styles.textContainer}>
                <View style={styles.itemHeader}>
                  {/* Use activity.details.title if available, fallback to generated title */}
                  <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                    {activity.details?.title || 'Activity'} 
                  </Text>
                  {getTimeBadge(activity.timestamp) && (
                    <View style={[styles.badgeContainer, {
                      backgroundColor: theme.colors.surfaceVariant,
                      marginLeft: 8, // Add some space before the badge
                    }]}>
                      <Text style={styles.badgeText}>{getTimeBadge(activity.timestamp)}</Text>
                    </View>
                  )}
                </View>
                {/* Use activity.details.subtitle if available */}
                <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">
                  {activity.details?.subtitle || ''} 
                  {activity.details?.subtitle && activity.details?.duration ? ' • ' : ''}
                  {activity.details?.duration ? `${activity.details.duration} min` : ''}
                </Text>
              </View>
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
