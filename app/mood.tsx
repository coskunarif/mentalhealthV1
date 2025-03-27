import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Dimensions, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native'; // Added StyleSheet
import { router, useLocalSearchParams } from 'expo-router';
import type { RootStackParamList } from './types/navigation';
import { layoutStyles, miscStyles } from './config';
import MoodSelector from './components/MoodSelector';
import { MoodPyramid } from './components/MoodPyramid';
import { theme } from './config/theme';
import type { IconName } from './components/MoodSelector';
import MoodService from './services/mood.service'; // Import MoodService
import { MoodDefinition } from './models/mood.model'; // Import MoodDefinition
import { Text } from 'react-native-paper'; // Added Text for error/loading

// Interface for the state managed within this component, derived from MoodDefinition
interface MoodState extends MoodDefinition {
  label: string; // Add label to match MoodType expected by MoodSelector
  value: number;
  duration: number;
  isSelected: boolean;
}

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

export default function MoodScreen() {
  const [selectedMood, setSelectedMood] = useState<MoodState | null>(null);
  const [moods, setMoods] = useState<MoodState[]>([]); // Initialize as empty
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state

  const { returnTo = 'tabs/home' } = useLocalSearchParams<RootStackParamList['mood']>();

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
    // TODO: Refactor saving logic to use MoodService.saveMoodEntry
    // This likely requires iterating through selected moods and calling the service for each.
    // Need user context (useAuth hook) to pass userId to the service.
    try {
      const selectedMoodEntries = moods
        .filter(mood => mood.isSelected)
        .map(mood => ({
          // userId: user?.uid, // Get user ID from auth context
          mood: mood.name, // Use 'name' as the mood identifier
          value: mood.value,
          duration: mood.duration,
          timestamp: new Date(), // Use current time or allow selection
        }));

      console.log('Mood entries to save:', selectedMoodEntries);
      // Example: Call service for each entry (needs user ID)
      // for (const entry of selectedMoodEntries) {
      //   if (entry.userId) {
      //     await MoodService.saveMoodEntry(entry);
      //   }
      // }

      router.replace(returnTo as keyof RootStackParamList);
    } catch (error) {
      console.error('Error preparing mood entries:', error);
      // Handle saving error (e.g., show snackbar)
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
