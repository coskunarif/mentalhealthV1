import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Button, Surface, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { miscStyles, typographyStyles } from '../config';
import { DataPoint } from '../components/RadarChart';
import RadarChart from '../components/RadarChart';
import RecentActivities from '../components/RecentActivities';
import QuickActions from '../components/QuickActions';
import TodaysFocus from '../components/TodaysFocus';
import { useAuth } from '../hooks/useAuth';
import type { AppTheme } from '../types/theme';
import { UserService } from '../services/user.service'; // Import UserService
import { MoodService } from '../services/mood.service'; // Import MoodService
import { UserActivity } from '../models/user.model'; // Import UserActivity
import { safeStringify } from '../lib/debug-utils';

const todaysFocus = {
  goal: "Complete your daily breathing exercise (15 min).",
  affirmation: "You're capable of handling whatever comes today."
};

// Removed local RecentActivity interface

export default function Home() {
    // Test comment
    const theme = useTheme<AppTheme>();
    const { user, loading } = useAuth();
    const [radarData, setRadarData] = useState<DataPoint[]>([]);
    const [chartLabels, setChartLabels] = useState<string[]>([]);
    const [recentActivities, setRecentActivities] = useState<UserActivity[]>([]); // Use UserActivity[]

    useEffect(() => {
        const fetchMoodData = async () => { // Renamed function
            try {
                console.log('🔍 [HOME DEBUG] Fetching mood radar data, user:', user?.uid); // Updated log
                if (user) {
                    // Fetch mood data using MoodService
                    const { data, labels } = await MoodService.getMoodRadarData(user.uid); 
                    
                    console.log('🔍 [HOME DEBUG] Received mood radar data:', safeStringify(data)); // Updated log
                    console.log('🔍 [HOME DEBUG] Received mood radar labels:', safeStringify(labels)); // Updated log
                    
                    // Basic validation (can be enhanced)
                    if (Array.isArray(data) && Array.isArray(labels)) {
                        setRadarData(data);
                        setChartLabels(labels);
                    } else {
                        console.error('❌ [HOME DEBUG] Invalid mood data/labels received');
                        setRadarData([]);
                        setChartLabels([]);
                    }
                } else {
                    console.log('🔍 [HOME DEBUG] No user, setting empty mood radar data'); // Updated log
                    setRadarData([]);
                    setChartLabels([]);
                }
            } catch (error) {
                console.error('❌ [HOME DEBUG] Error fetching mood radar data:', error); // Updated log
                setRadarData([]);
                setChartLabels([]);
            }
        };

        const fetchRecentActivities = async () => {
            try {
                console.log('🔍 [HOME DEBUG] Fetching recent activities, user:', user?.uid);
                if (user) {
                    // Use UserService to fetch activities which are already typed as UserActivity[]
                    const activities = await UserService.getRecentActivities(user.uid); 
                    console.log('🔍 [HOME DEBUG] Received activities:', safeStringify(activities));
                    
                    // Validate activities (UserService already returns UserActivity[])
                    if (!Array.isArray(activities)) {
                        console.error('❌ [HOME DEBUG] Activities is not an array:', activities);
                        setRecentActivities([]);
                    } else {
                        setRecentActivities(activities);
                    }
                } else {
                    setRecentActivities([]);
                }
            } catch (error) {
                console.error('❌ [HOME DEBUG] Error fetching recent activities:', error);
                setRecentActivities([]);
            }
        };

        if (!loading) {
            console.log('🔍 [HOME DEBUG] User loaded, fetching data...');
            fetchMoodData(); // Call the new function
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
            textAlign: 'left', // Explicitly set for consistency
            paddingLeft: 2, // Small padding for visual alignment
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
            {/* Radar Chart Section - Updated Title */}
            <Surface style={styles.section} elevation={1}>
                <Text variant="headlineMedium" style={styles.sectionTitle}>
                    Your Mood Patterns 
                </Text>
                <RadarChart data={radarData} labels={chartLabels} />
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
