import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import type { RootStackParamList } from './types/navigation';
import styles from './config/styles';
import { MoodSelector } from './components/MoodSelector';
import { MoodPyramid } from './components/MoodPyramid';

type MoodType = {
  label: string;
  color: string;
  icon: string;
  value: number;
  duration: number;
  isSelected: boolean;
};

export default function MoodScreen() {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [moods, setMoods] = useState<MoodType[]>([
    { label: 'Shame', color: '#87CEEB', icon: 'emoticon-sad', value: 0, duration: 0, isSelected: false },
    { label: 'Guilt', color: '#FFD700', icon: 'emoticon-confused', value: 0, duration: 0, isSelected: false },
    { label: 'Apathy', color: '#E6E6FA', icon: 'emoticon-neutral', value: 0, duration: 0, isSelected: false },
    { label: 'Grief', color: '#FF69B4', icon: 'emoticon-cry', value: 0, duration: 0, isSelected: false },
    { label: 'Fear', color: '#FF69B4', icon: 'emoticon-scared', value: 0, duration: 0, isSelected: false },
    { label: 'Desire', color: '#FF69B4', icon: 'emoticon-excited', value: 0, duration: 0, isSelected: false },
    { label: 'Anger', color: '#FF69B4', icon: 'emoticon-angry', value: 0, duration: 0, isSelected: false },
    { label: 'Pride', color: '#FF69B4', icon: 'emoticon-cool', value: 0, duration: 0, isSelected: false },
    { label: 'Willfulness', color: '#FF69B4', icon: 'emoticon-confident', value: 0, duration: 0, isSelected: false },
  ]);

  const { returnTo = 'tabs/home' } = useLocalSearchParams<RootStackParamList['mood']>();

  const screenWidth = Dimensions.get('window').width;
  const [activeScreen, setActiveScreen] = useState(0);

  const handleMoodSelect = (index: number) => {
    const mood = moods[index];
    setSelectedMood(selectedMood?.label === mood.label ? null : mood);
  };

  const handleSliderChange = (value: number, label: string) => {
    setMoods(prevMoods =>
      prevMoods.map(mood => ({
        ...mood,
        value: mood.label === label ? value : mood.value,
        isSelected: mood.label === label ? true : mood.isSelected
      }))
    );
  };

  const handleDurationChange = (value: number) => {
    if (!selectedMood) return;
    
    setMoods(prevMoods =>
      prevMoods.map(mood => ({
        ...mood,
        duration: mood.label === selectedMood.label ? value : mood.duration
      }))
    );
  };

  const handleSubmit = async () => {
    try {
      const moodValues = moods
        .filter(mood => mood.isSelected)
        .reduce((acc, mood) => ({
          ...acc,
          [mood.label]: {
            value: mood.value,
            duration: mood.duration
          }
        }), {});
      
      console.log(moodValues);
      router.replace(returnTo as keyof RootStackParamList);
    } catch (error) {
      console.error('Error saving mood:', error);
    }
  };

  const handleScroll = (event: any) => {
    const screenIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setActiveScreen(screenIndex);
  };

  const handleNext = () => {
    scrollViewRef.current?.scrollTo({
      x: screenWidth,
      animated: true
    });
  };

  const handlePrevious = () => {
    scrollViewRef.current?.scrollTo({
      x: 0,
      animated: true
    });
  };

  const handleFinish = () => {
    router.replace(returnTo as keyof RootStackParamList);
  };

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      x: activeScreen * screenWidth,
      animated: true
    });
  }, [activeScreen, screenWidth]);

  return (
    <View style={styles.layout_container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={[styles.mood_gridContainer, { width: screenWidth }]}>
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

        <View style={[styles.mood_gridContainer, { width: screenWidth }]}>
          <MoodPyramid
            onPrevious={handlePrevious}
            onFinish={handleFinish}
          />
        </View>
      </ScrollView>
    </View>
  );
}
