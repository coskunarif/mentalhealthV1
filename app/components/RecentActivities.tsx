import React from 'react';
import { View, Pressable } from 'react-native';
import { Text, Surface, useTheme } from 'react-native-paper';
import { Link } from 'expo-router';
import styles from '../config/styles';
import type { AppTheme } from '../types/theme';

interface Activity {
  id: string;
  type: 'breath' | 'dreams' | 'awareness';
  title: string;
  subtitle: string;
  duration: number; // in minutes
}

interface RecentActivitiesProps {
  activities: Activity[];
}

export default function RecentActivities({ activities }: RecentActivitiesProps) {
  const theme = useTheme<AppTheme>();
  return (
    <View style={styles.recentActivities_container}>
      <Text style={[styles.text_heading3, styles.recentActivities_title]}>Recent Activities</Text>
      <Surface style={[styles.component_card_container, styles.recentActivities_surface]}>
        {activities.map((activity, index) => (
          <Link
            key={activity.id}
            href={{
              pathname: "/player",
              params: { 
                meditationId: activity.id,
                title: activity.title,
                subtitle: activity.subtitle,
                returnTo: 'tabs/home'
              }
            }}
            asChild
          >
            <Pressable>
              <View
                style={[
                  styles.recentActivities_item,
                  index < activities.length - 1 && styles.recentActivities_itemBorder
                ]}
              >
                <View>
                  <Text style={styles.text_body}>{activity.title}</Text>
                  <Text style={[styles.text_caption, { color: theme.colors.secondary }]}>
                    {activity.subtitle}
                  </Text>
                </View>
                <Text style={[styles.text_caption, { color: theme.colors.secondary }]}>
                  {activity.duration.toFixed(1)} min
                </Text>
              </View>
            </Pressable>
          </Link>
        ))}
      </Surface>
    </View>
  );
}
