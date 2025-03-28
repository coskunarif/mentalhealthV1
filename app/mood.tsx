import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Dimensions, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native'; // Added StyleSheet
import { router, useLocalSearchParams } from 'expo-router';
import type { RootStackParamList } from './types/navigation';
import { layoutStyles, miscStyles } from './config';
import MoodSelector from './components/MoodSelector';
import { MoodPyramid } from './components/MoodPyramid';
import { useAppTheme } from './hooks/useAppTheme'; // Import useAppTheme
import type { IconName } from './components/MoodSelector';
import MoodService from './services/mood.service';
import UserService from './services/user.service'; // Import UserService
import { MoodDefinition } from './models/mood.model';
import { Text } from 'react-native-paper';
import { useAuth } from './hooks/useAuth'; // Import useAuth

// Interface for the state managed within this component, derived from MoodDefinition
interface MoodState extends MoodDefinition {
  label: string; // Add label to match MoodType expected by MoodSelector
  value: number;
  duration: number;
  isSelected: boolean;
}

// Move ProgressDots inside MoodScreen or pass theme as prop
// For simplicity, moving it inside:
// const ProgressDots = ({ activeScreen, theme }: { activeScreen: number, theme: AppTheme }) => ( ... );

export default function MoodScreen() {
  const theme = useAppTheme(); // Use the hook here
  const [selectedMood, setSelectedMood] = useState<MoodState | null>(null);
  const [moods, setMoods] = useState<MoodState[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const { returnTo = 'tabs/home' } = useLocalSearchParams<RootStackParamList['mood']>();

  // Define ProgressDots component here to access theme from hook
  const ProgressDots = ({ activeScreen }: { activeScreen: number }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 10 }}>
      {[0, 1].map((index) => (
        <View
          key={index}
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor:
              index === activeScreen ? theme.colors.primary : theme.colors.surfaceVariant,
            marginHorizontal: 4,
          }}
        />
      ))}
    </View>
  );

  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [activeScreen, setActiveScreen] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  // Fetch Mood Definitions
  useEffect(() => {
    const fetchMoodDefinitions = async () => {
      setLoading(true);
      setError(null);
      try {
        const definitions = await MoodService.getMoodDefinitions();
        // Map definitions to initial state, ensuring 'label' is included
        const initialMoodsState = definitions.map(def => ({
          ...def,
          label: def.name, // Set label explicitly from name
          value: 0,
          duration: 0,
          isSelected: false,
        }));
        setMoods(initialMoodsState);
      } catch (err: any) {
        console.error('[MoodScreen] Error fetching mood definitions:', err);
        setError(err.message || 'Failed to load mood options.');
      } finally {
        setLoading(false);
      }
    };

    fetchMoodDefinitions();
  }, []);


  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', () => {
      setScreenWidth(Dimensions.get('window').width);
    });
    return () => subscription?.remove();
  }, []);

  const handleMoodSelect = (index: number) => {
    const mood = moods[index];
    // Use 'name' for comparison as it's the unique identifier from definition
    setSelectedMood(selectedMood?.name === mood.name ? null : mood);
  };

  // Use 'name' instead of 'label' for identifying the mood to update
  const handleSliderChange = (value: number, name: string) => {
    setMoods(prevMoods =>
      prevMoods.map(mood => ({
        ...mood,
        value: mood.name === name ? value : mood.value,
        isSelected: mood.name === name ? true : mood.isSelected,
      }))
    );
  };

  // Use 'name' instead of 'label'
  const handleDurationChange = (value: number) => {
    if (!selectedMood) return;
    setMoods(prevMoods =>
      prevMoods.map(mood => ({
        ...mood,
        duration: mood.name === selectedMood.name ? value : mood.duration,
      }))
    );
  };

  const handleSubmit = async () => {
    if (!user?.uid) {
      console.error("User not logged in, cannot save mood.");
      setError("You must be logged in to save your mood.");
      return;
    }
    setError(null); // Clear previous errors

    const selectedMoodEntries = moods.filter(mood => mood.isSelected);

    if (selectedMoodEntries.length === 0) {
      console.log("No mood selected to save.");
      // Optionally show a message to the user
      router.replace(returnTo as keyof RootStackParamList); // Still navigate back
      return;
    }

    try {
      const now = new Date();
      const savePromises = selectedMoodEntries.map(mood => {
        const entryData = {
          userId: user.uid,
          mood: mood.name,
          value: mood.value,
          duration: mood.duration, // Assuming duration is set via slider
          timestamp: now,
          // factors: [], // Add factors if collected
          // notes: "",   // Add notes if collected
        };

        // Save to 'moods' collection
        const saveEntryPromise = MoodService.saveMoodEntry(entryData);

        // Save to 'activities' subcollection
        const trackActivityPromise = UserService.trackActivity({
          userId: user.uid,
          type: 'mood',
          timestamp: now,
          details: {
            title: mood.name, // Use mood name as title for activity
            value: mood.value,
            // Add other relevant details if needed
          }
        });

        return Promise.all([saveEntryPromise, trackActivityPromise]);
      });

      await Promise.all(savePromises);
      console.log(`Successfully saved ${selectedMoodEntries.length} mood entries and activities.`);
      router.replace(returnTo as keyof RootStackParamList);

    } catch (error) {
      console.error('Error saving mood entries:', error);
      setError("Failed to save mood. Please try again.");
      // Handle saving error (e.g., show snackbar) - error state is set
    }
  };

  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const screenIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setActiveScreen(screenIndex);
  };

  const handleNext = () => {
    scrollViewRef.current?.scrollTo({ x: screenWidth, animated: true });
  };

  const handlePrevious = () => {
    scrollViewRef.current?.scrollTo({ x: 0, animated: true });
  };

  const handleFinish = () => {
    handleSubmit();
  };

  useEffect(() => {
    // Only scroll if moods have loaded
    if (moods.length > 0) {
      scrollViewRef.current?.scrollTo({ x: activeScreen * screenWidth, animated: true });
    }
  }, [activeScreen, screenWidth, moods]); // Add moods dependency

  // Handle Loading and Error States
  if (loading) {
    return (
      <SafeAreaView style={[layoutStyles.layout_container, styles.centeredContainer]}>
        <ActivityIndicator size="large" />
        <Text>Loading mood options...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[layoutStyles.layout_container, styles.centeredContainer]}>
        <Text style={{ color: theme.colors.error }}>{error}</Text>
        {/* Optionally add a retry button */}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={layoutStyles.layout_container}>
      <ProgressDots activeScreen={activeScreen} />
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
        scrollEnabled={!isSliding}
      >
        <View style={{ width: screenWidth, flex: 1 }}>
          <MoodSelector
            moods={moods}
            selectedMood={selectedMood}
            onMoodSelect={handleMoodSelect}
            onSliderChange={handleSliderChange}
            onDurationChange={handleDurationChange}
            onNext={handleNext}
            onFinish={handleFinish}
          />
        </View>
        <View style={{ width: screenWidth, flex: 1 }}>
          <MoodPyramid onPrevious={handlePrevious} onFinish={handleFinish} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Define styles using StyleSheet
const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
