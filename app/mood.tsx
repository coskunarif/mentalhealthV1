import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import type { RootStackParamList } from './types/navigation';
import { layoutStyles, miscStyles } from './config';
import MoodSelector from './components/MoodSelector';
import { MoodPyramid } from './components/MoodPyramid';
import { theme } from './config/theme';
import type { IconName } from './components/MoodSelector';

interface MoodType {
  label: string;
  key: keyof typeof theme.moodColors;
  icon: IconName;
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
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [moods, setMoods] = useState<MoodType[]>([
    { label: 'Shame', key: 'shame', icon: 'emoticon-sad', value: 0, duration: 0, isSelected: false },
    { label: 'Guilt', key: 'guilt', icon: 'emoticon-confused', value: 0, duration: 0, isSelected: false },
    { label: 'Apathy', key: 'apathy', icon: 'emoticon-neutral', value: 0, duration: 0, isSelected: false },
    { label: 'Grief', key: 'grief', icon: 'emoticon-cry', value: 0, duration: 0, isSelected: false },
    { label: 'Fear', key: 'fear', icon: 'emoticon-frown', value: 0, duration: 0, isSelected: false },
    { label: 'Desire', key: 'desire', icon: 'emoticon-excited', value: 0, duration: 0, isSelected: false },
    { label: 'Anger', key: 'anger', icon: 'emoticon-angry', value: 0, duration: 0, isSelected: false },
    { label: 'Pride', key: 'pride', icon: 'emoticon-cool', value: 0, duration: 0, isSelected: false },
    { label: 'Willfulness', key: 'willfulness', icon: 'emoticon-cool', value: 0, duration: 0, isSelected: false },
  ]);

  const { returnTo = 'tabs/home' } = useLocalSearchParams<RootStackParamList['mood']>();

  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [activeScreen, setActiveScreen] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', () => {
      setScreenWidth(Dimensions.get('window').width);
    });
    return () => subscription?.remove();
  }, []);

  const handleMoodSelect = (index: number) => {
    const mood = moods[index];
    setSelectedMood(selectedMood?.label === mood.label ? null : mood);
  };

  const handleSliderChange = (value: number, label: string) => {
    setMoods(prevMoods =>
      prevMoods.map(mood => ({
        ...mood,
        value: mood.label === label ? value : mood.value,
        isSelected: mood.label === label ? true : mood.isSelected,
      }))
    );
  };

  const handleDurationChange = (value: number) => {
    if (!selectedMood) return;
    setMoods(prevMoods =>
      prevMoods.map(mood => ({
        ...mood,
        duration: mood.label === selectedMood.label ? value : mood.duration,
      }))
    );
  };

  const handleSubmit = async () => {
    try {
      const moodValues = moods
        .filter(mood => mood.isSelected)
        .reduce((acc, mood) => ({
          ...acc,
          [mood.label]: { value: mood.value, duration: mood.duration },
        }), {});
      console.log(moodValues);
      router.replace(returnTo as keyof RootStackParamList);
    } catch (error) {
      console.error('Error saving mood:', error);
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
    scrollViewRef.current?.scrollTo({ x: activeScreen * screenWidth, animated: true });
  }, [activeScreen, screenWidth]);

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
