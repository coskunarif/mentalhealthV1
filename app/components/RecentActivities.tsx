import React from 'react';
import { View, Pressable } from 'react-native';
import { Text, Surface, useTheme } from 'react-native-paper';
import { Link } from 'expo-router';
import { cardStyles, miscStyles, typographyStyles } from '../config';
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

export default function RecentActivities({ activities }: RecentActivitiesProps) {
  const theme = useTheme<AppTheme>();
  return (
    <View style={miscStyles.recentActivities_container}>
      <Surface style={[cardStyles.component_card_container, miscStyles.recentActivities_container]}>
        {activities.map((activity, index) => (
          <Link
            key={activity.id}
            href={{
              pathname: "/player",
              params: {
                meditationId: activity.id,
                title: activity.title,
                subtitle: activity.subtitle,
                returnTo: 'tabs/home',
              },
            }}
            asChild
          >
            <Pressable>
              <View style={[
                miscStyles.recentActivities_item,
                index < activities.length - 1 && miscStyles.recentActivities_itemBorder,
              ]}>
                <View>
                  <Text style={typographyStyles.text_body}>{activity.title}</Text>
                  <Text style={{ ...typographyStyles.text_caption, color: theme.colors.secondary }}>
                    {activity.subtitle}
                  </Text>
                </View>
                <Text style={{ ...typographyStyles.text_caption, color: theme.colors.secondary }}>
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
