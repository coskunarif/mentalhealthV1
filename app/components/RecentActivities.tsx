import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Divider, Surface, useTheme, TouchableRipple } from 'react-native-paper';
import { Link } from 'expo-router';
import { typographyStyles } from '../config';
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
    <Surface style={styles.container} elevation={1}>
      {activities.map((activity, index) => (
        <React.Fragment key={activity.id}>
          <Link
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
            <TouchableRipple 
              onPress={() => {}} 
              rippleColor={theme.withOpacity(theme.colors.primary, 0.12)}
              style={styles.touchable}
            >
              <View style={styles.item}>
                <View style={styles.contentContainer}>
                  <Text style={[typographyStyles.text_body, styles.title]}>
                    {activity.title}
                  </Text>
                  <Text style={[
                    typographyStyles.text_caption, 
                    styles.subtitle,
                    { color: theme.colors.secondary }
                  ]}>
                    {activity.subtitle}
                  </Text>
                </View>
                <Text style={[
                  typographyStyles.text_caption,
                  styles.duration,
                  { color: theme.colors.secondary }
                ]}>
                  {activity.duration.toFixed(1)} min
                </Text>
              </View>
            </TouchableRipple>
          </Link>
          {index < activities.length - 1 && (
            <Divider 
              style={[
                styles.divider, 
                { opacity: 0.5 }
              ]} 
            />
          )}
        </React.Fragment>
      ))}
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12, // Material Design M3 card radius
    overflow: 'hidden',
    marginVertical: 8,
  },
  touchable: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 40,
  },
  contentContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    marginBottom: 4,
    fontWeight: '500',
  },
  subtitle: {
    lineHeight: 16,
  },
  duration: {
    fontWeight: '500',
  },
  divider: {
    marginHorizontal: 16,
  }
});
