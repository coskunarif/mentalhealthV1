import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Button, Surface, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { miscStyles, typographyStyles } from '../config';
import type DataPoint from '../components/RadarChart';
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
    // Test comment
    const theme = useTheme<AppTheme>();
    const { user, loading } = useAuth();
    const [radarData, setRadarData] = useState<RadarData[]>([]);
    const [chartLabels, setChartLabels] = useState<string[]>([]);
    const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);

    useEffect(() => {
        const fetchRadarData = async () => {
            try {
                console.log('🔍 [HOME DEBUG] Fetching radar data, user:', user?.uid);
                if (user) {
                    const { data, labels } = await ExerciseService.getRadarData(user.uid);
                    
                    // Validate radar data before setting state
                    console.log('🔍 [HOME DEBUG] Received radar data:', JSON.stringify(data));
                    console.log('🔍 [HOME DEBUG] Received radar labels:', JSON.stringify(labels));
                    
                    // Check if data is valid
                    if (!Array.isArray(data)) {
                        console.error('❌ [HOME DEBUG] Radar data is not an array:', data);
                        setRadarData([]);
                    } else if (data.length === 0) {
                        console.warn('⚠️ [HOME DEBUG] Radar data array is empty');
                        setRadarData([]);
                    } else {
                        // Validate each data point
                        const validData = data.map((point, index) => {
                            // Ensure each point has a valid value property
                            if (typeof point !== 'object' || point === null) {
                                console.error(`❌ [HOME DEBUG] Invalid data point at index ${index}:`, point);
                                return { label: `Unknown ${index}`, value: 0 };
                            }
                            
                            if (typeof point.value !== 'number' || isNaN(point.value)) {
                                console.error(`❌ [HOME DEBUG] Invalid value at index ${index}:`, point.value);
                                return { ...point, value: 0 };
                            }
                            
                            // Ensure value is between 0-1
                            if (point.value < 0 || point.value > 1) {
                                console.warn(`⚠️ [HOME DEBUG] Value out of range at index ${index}:`, point.value);
                                return { 
                                    ...point, 
                                    value: Math.min(Math.max(point.value, 0), 1) 
                                };
                            }
                            
                            return point;
                        });
                        
                        console.log('🔍 [HOME DEBUG] Validated radar data:', JSON.stringify(validData));
                        setRadarData(validData);
                    }
                    
                    // Validate labels
                    if (!Array.isArray(labels)) {
                        console.error('❌ [HOME DEBUG] Radar labels is not an array:', labels);
                        setChartLabels([]);
                    } else {
                        console.log('🔍 [HOME DEBUG] Setting chart labels:', labels);
                        setChartLabels(labels);
                    }
                } else {
                    console.log('🔍 [HOME DEBUG] No user, setting empty radar data');
                    setRadarData([]);
                    setChartLabels([]);
                }
            } catch (error) {
                console.error('❌ [HOME DEBUG] Error fetching radar data:', error);
                // Set default empty values on error
                setRadarData([]);
                setChartLabels([]);
            }
        };

        const fetchRecentActivities = async () => {
            try {
                console.log('🔍 [HOME DEBUG] Fetching recent activities, user:', user?.uid);
                if (user) {
                    const activities = await ExerciseService.getRecentActivities(user.uid);
                    console.log('🔍 [HOME DEBUG] Received activities:', JSON.stringify(activities));
                    setRecentActivities(activities);
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
