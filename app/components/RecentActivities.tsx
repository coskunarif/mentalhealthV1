import React from 'react';
import { View, Pressable } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { Link } from 'expo-router';
import { styles } from '../config/styles';

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
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={[styles.text.heading3, { marginBottom: 16 }]}>Recent Activities</Text>
      <Surface style={[styles.component.card.container, { padding: 0 }]}>
        {activities.map((activity, index) => (
          <Link
            key={activity.id}
            href={`/breath-exercise?id=${activity.id}`}
            asChild
          >
            <Pressable>
              <View
                style={[
                  {
                    padding: 16,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottomWidth: index < activities.length - 1 ? 1 : 0,
                    borderBottomColor: styles.colors.surfaceVariant,
                  },
                ]}
              >
                <View>
                  <Text style={styles.text.body}>{activity.title}</Text>
                  <Text style={[styles.text.caption, { color: styles.colors.secondary }]}>
                    {activity.subtitle}
                  </Text>
                </View>
                <Text style={[styles.text.caption, { color: styles.colors.secondary }]}>
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
