import React, { useEffect, useState, useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Button, Surface, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { miscStyles, typographyStyles } from '../config';
import RadarChart from '../components/RadarChart';
import RecentActivities from '../components/RecentActivities';
import QuickActions from '../components/QuickActions';
import TodaysFocus from '../components/TodaysFocus';
import { useAuth } from '../hooks/useAuth';
import type { AppTheme } from '../types/theme';
import { ExerciseService } from '../services/exercise.service';

const todaysFocus = {
  goal: "Complete your daily breathing exercise (15 min).",
  affirmation: "You're capable of handling whatever comes today."
};

interface RadarData {
    label: string;
    value: number;
}

interface RecentActivity {
    id: string;
    type: string;
    title: string;
    subtitle: string;
    duration: number;
    timestamp: Date;
}

export default function Home() {
    const theme = useTheme<AppTheme>();
    const { user, loading } = useAuth();
    const [radarData, setRadarData] = useState<RadarData[]>([]);
    const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);

    useEffect(() => {
        const fetchRadarData = async () => {
            try {
                if (user) {
                    const data = await ExerciseService.getRadarData(user.uid);
                    setRadarData(data);
                } else {
                  setRadarData([]);
                }
            } catch (error) {
                console.error('Error fetching radar data:', error);
            }
        };

        const fetchRecentActivities = async () => {
            try {
              if (user) {
                const activities = await ExerciseService.getRecentActivities(user.uid);
                setRecentActivities(activities);
              } else {
                setRecentActivities([]);
              }
            } catch (error) {
                console.error('Error fetching recent activities:', error);
            }
        };

        if (!loading) {
          fetchRadarData();
          fetchRecentActivities();
        }
    }, [user, loading]);


    // Create styles inside the component with useMemo for performance
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme?.colors?.background || '#F2F7F4',
        },
        contentContainer: {
            padding: 16,
            paddingBottom: 32,
        },
        section: {
            borderRadius: 12, // Hardcode fallback values instead of theme?.componentSizes?.cardBorderRadius
            marginBottom: 16,
            padding: 16,
            backgroundColor: theme?.colors?.surface || '#FFFFFF',
            shadowColor: theme?.colors?.shadow || '#000000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1.5,
            elevation: 1,
        },
        sectionTitle: {
            marginBottom: 16,
            fontSize: 20,
            fontWeight: '500',
            letterSpacing: 0.15,
        },
        actionButton: {
            marginTop: 24,
            marginBottom: 8,
            marginHorizontal: 16,
            borderRadius: 20, // Hardcode fallback
            height: 40,
            elevation: 2,
        },
    });

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
        >
            {/* Radar Chart Section */}
            <Surface style={styles.section} elevation={1}>
                <Text variant="headlineMedium" style={styles.sectionTitle}>
                    Your Progress
                </Text>
                <RadarChart data={radarData} />
            </Surface>

            {/* Quick Actions Section */}
            <QuickActions sectionStyle={styles.section} />

            {/* Today's Focus Section */}
            <TodaysFocus
                goal={todaysFocus.goal}
                affirmation={todaysFocus.affirmation}
                sectionStyle={styles.section}
            />

            {/* Recent Activities Section */}
            <Surface style={styles.section} elevation={1}>
                <Text variant="headlineMedium" style={styles.sectionTitle}>
                    Recent Activities
                </Text>
                <RecentActivities activities={recentActivities} />
            </Surface>
        </ScrollView>
    );
}
