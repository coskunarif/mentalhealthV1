import React, { useState, useEffect, useCallback } from 'react';
import { View, Pressable, FlatList, ScrollView, Dimensions } from 'react-native';
import { Text, Card, Modal, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { router } from 'expo-router';
import localStyles from '../config/MoodSelector.styles';
import { typographyStyles } from '../config';
import { useAppTheme } from '../hooks/useAppTheme'; // Import useAppTheme
import type { AppTheme } from '../types/theme';
import EnhancedButton from './EnhancedButton';
import SliderCard from './SliderCard';
import { ScreenLayout } from './ScreenLayout'; // Import ScreenLayout
import { MoodService } from '../services/mood.service';

// Add responsive button sizing based on screen width
const windowWidth = Dimensions.get('window').width;
const isSmallScreen = windowWidth < 360;

export type IconName =
  | 'emoticon-sad'
  | 'emoticon-confused'
  | 'emoticon-neutral'
  | 'emoticon-cry'
  | 'emoticon-frown'
  | 'emoticon-angry'
  | 'emoticon-cool'
  | 'clock-outline'
  | 'help-circle'
  | 'emoticon-happy'
  | 'emoticon-excited';

type MoodType = {
  label: string;
  icon: IconName;
  key: string;
  value: number;
  duration: number;
  isSelected: boolean;
  count?: number;
  // Consciousness fields (optional for backward compatibility)
  consciousnessValue?: number;
  consciousnessLevel?: string;
};

type Props = {
  moods: MoodType[];
  selectedMood: MoodType | null;
  onMoodSelect: (index: number) => void;
  onSliderChange: (value: number, label: string) => void;
  onDurationChange: (value: number) => void;
  onNext: () => void;
  onFinish: () => void;
};

function MoodSelector({
  moods,
  selectedMood,
  onMoodSelect,
  onSliderChange,
  onDurationChange,
  onNext,
  onFinish,
}: Props) {
  const theme = useAppTheme(); // Use the hook
  const [slidersState, setSlidersState] = useState<{
    [label: string]: { value: number; color: string };
  }>({});

  useEffect(() => {
    if (selectedMood) {
      setSlidersState(prev => ({
        ...prev,
        [selectedMood.label]: {
          value: selectedMood.value,
          color: getSliderColor(selectedMood.value),
        },
      }));
    }
  }, [selectedMood]);

  const getSliderColor = (value: number) => {
    if (value <= 33) return theme.chartColors.progress.inactive;
    if (value <= 66) return theme.chartColors.progress.active;
    return theme.colors.primary;
  };

  const updateSliderState = (label: string, value: number) => {
    const color = getSliderColor(value);
    setSlidersState(prev => ({ ...prev, [label]: { value, color } }));
  };

  const handleSliderComplete = useCallback(
    (value: number, label: string) => {
      updateSliderState(label, value);
      onSliderChange(value, label);
    },
    [onSliderChange]
  );

  const handleBack = () => {
    router.back();
  };

  const handleFinish = async () => {
    const userId = 'user-id'; // Replace with actual user ID

    if (selectedMood) {
      try {
        await MoodService.saveMoodEntry({
          userId,
          timestamp: new Date(),
          mood: selectedMood.label,
          value: selectedMood.value,
        });
        onFinish();
      } catch (error) {
        console.error('Error saving mood entry:', error);
      }
    }
  };

  // Mood grouping by consciousness level removed

  // Consciousness-related code removed

  // Hawkins scale visualization removed

  return (
    <ScreenLayout
      title="Mood Tracker"
      onBackPress={handleBack}
      elevation={0}
      contentContainerStyle={{ paddingBottom: 100 }} // Add space for buttons
      bottomContent={
        <View style={[
          localStyles.mood_buttonContainer,
          isSmallScreen && { flexDirection: 'column' }
        ]}>
          <View style={{
            flex: 1,
            marginRight: isSmallScreen ? 0 : theme.spacing.small,
            marginBottom: isSmallScreen ? theme.spacing.small : 0
          }}>
            <EnhancedButton
              mode="contained"
              onPress={onNext}
              accessibilityLabel="Proceed to focus emotions screen"
              fullWidth
              icon="arrow-right"
            >
              NEXT
            </EnhancedButton>
          </View>
          <View style={{
            flex: 1,
            marginLeft: isSmallScreen ? 0 : theme.spacing.small
          }}>
            <EnhancedButton
              mode="contained"
              onPress={handleFinish}
              accessibilityLabel="Complete mood selection"
              fullWidth
              icon="check"
            >
              FINISH
            </EnhancedButton>
          </View>
        </View>
      }
    >
      <Text
        style={[
          typographyStyles.text_heading2,
          {
            textAlign: 'center',
            color: theme.colors.onSurface,
            marginTop: theme.spacing.large,
            marginBottom: theme.spacing.large,
            fontWeight: '500',
            letterSpacing: 0,
          },
        ]}
      >
        How are you feeling?
      </Text>
      <ScrollView style={{ marginBottom: 20 }}>
        {/* Chunk all moods into rows of 3 for a flat grid */}
        {(() => {
          const chunks: MoodType[][] = [];
          for (let i = 0; i < moods.length; i += 3) {
            chunks.push(moods.slice(i, i + 3));
          }
          return chunks.map((row, rowIdx) => (
            <View key={rowIdx} style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 12 }}>
              {row.map((item, colIdx) => {
                const isSelected = selectedMood?.label === item.label;
                const moodColor = theme.moodColors[item.key as keyof AppTheme['moodColors']] || theme.colors.primary;
                return (
                  <View key={item.label} style={{ flex: 1, alignItems: 'center', maxWidth: '33%' }}>
                    <Pressable
                      onPress={() => {
                        console.log('Mood selected:', item);
                        onMoodSelect(moods.findIndex(m => m.label === item.label));
                      }}
                      style={({ pressed }) => [
                        {
                          width: '100%',
                          aspectRatio: 1,
                          marginHorizontal: 4,
                          alignItems: 'center', justifyContent: 'center',
                          borderRadius: theme.shape.borderRadius,
                          backgroundColor: theme.colors.surface,
                          borderWidth: isSelected ? 2 : 1,
                          borderColor: isSelected ? moodColor : theme.colors.surfaceVariant,
                          shadowColor: theme.colors.shadow,
                          shadowOffset: { width: 0, height: 1 },
                          shadowOpacity: 0.1, shadowRadius: 2, elevation: 1,
                        },
                        pressed && { opacity: 0.8 },
                      ]}
                      accessibilityLabel={`Select mood ${item.label}`}
                      accessibilityRole="button"
                      accessibilityState={{ selected: isSelected }}
                    >
                      <MaterialCommunityIcons
                        name={item.icon}
                        size={28}
                        color={moodColor}
                      />
                      <Text style={{ fontWeight: isSelected ? '700' : '400', color: isSelected ? moodColor : theme.colors.onSurfaceVariant, fontSize: 13, marginTop: 2 }}>
                        {item.label}
                      </Text>
                      {/* Consciousness badge removed */}
                    </Pressable>
                  </View>
                );
              })}
              {/* Fill empty columns if less than 3 moods in this row */}
              {row.length < 3 && Array.from({ length: 3 - row.length }).map((_, i) => (
                <View key={`empty-${i}`} style={{ flex: 1, maxWidth: '33%' }} />
              ))}
            </View>
          ));
        })()}

        {/* Show sliders when a mood is selected */}
        {selectedMood && (
          <>
            <SliderCard
              variant="emotion"
              label={selectedMood.label}
              moodKey={selectedMood.key as keyof AppTheme['moodColors']}
              icon={selectedMood.icon}
              value={slidersState[selectedMood.label]?.value ?? selectedMood.value}
              onSlidingComplete={value => handleSliderComplete(value, selectedMood.label)}
            />
            <SliderCard
              variant="duration"
              label="How long have you felt this way?"
              icon="clock-outline"
              value={selectedMood.duration ?? 0}
              onSlidingComplete={onDurationChange}
              labels={["< 3 months", "6 months", "> 1 year"]}
              steps={2}
            />
          </>
        )}
      </ScrollView>
    </ScreenLayout>
  );
}

export default MoodSelector;
