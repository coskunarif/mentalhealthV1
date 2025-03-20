import React, { useState, useEffect, useCallback } from 'react';
import { View, Pressable, FlatList, ScrollView, Dimensions } from 'react-native';
import { Text, Card, Modal, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { router } from 'expo-router';
import localStyles from '../config/MoodSelector.styles';
import { typographyStyles } from '../config';
import { theme } from '../config/theme';
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
  key: keyof AppTheme['moodColors'];
  value: number;
  duration: number;
  isSelected: boolean;
  count?: number; // Optional bubble count
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

      {/* Mood Grid */}
      <View style={{ 
        paddingHorizontal: 16, 
        marginBottom: 20,
        height: Dimensions.get('window').height * 0.33, // Ekranın 1/3'ünü kaplasın
      }}>
        <View style={[
          localStyles.mood_gridContainer,
          { 
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignContent: 'flex-start',
          }
        ]}>
          {moods.map((item, index) => {
            const isSelected = selectedMood?.label === item.label;
            const moodColor = theme.moodColors[item.key];
            
            return (
              <Pressable
                key={item.label}
                onPress={() => onMoodSelect(index)}
                style={({ pressed }) => [
                  {
                    width: '30%', // 3 sütun için
                    aspectRatio: 1, // Kare şeklinde
                    margin: '1.5%', // Aralarında boşluk
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: theme.shape.borderRadius,
                    backgroundColor: theme.colors.surface,
                    // Tüm butonlara hafif gölge ekleyelim
                    shadowColor: theme.colors.shadow,
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                    elevation: 1,
                  },
                  pressed && { opacity: 0.8 }, // Basıldığında hafif opaklık
                  isSelected && {
                    // Seçildiğinde daha belirgin gölge
                    shadowColor: moodColor,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 3,
                  },
                ]}
                accessibilityLabel={`Select mood ${item.label}`}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
              >
                {/* Seçim göstergesi olarak ince bir çerçeve ekleyelim */}
                {isSelected && (
                  <View 
                    style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      borderRadius: theme.shape.borderRadius,
                      borderWidth: 1.5,
                      borderColor: moodColor,
                    }}
                  />
                )}
                
                <MaterialCommunityIcons 
                  name={item.icon} 
                  size={28}
                  color={moodColor} 
                />
                
                <Text
                  style={[
                    typographyStyles.text_caption,
                    theme.fonts.labelMedium,
                    { 
                      marginTop: theme.spacing.tiny,
                      color: isSelected ? moodColor : theme.colors.onSurfaceVariant,
                      fontWeight: isSelected ? '600' : '400',
                      textAlign: 'center',
                      fontSize: theme.scaleFont(12),
                    },
                  ]}
                  numberOfLines={1}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Duration Slider */}
      {selectedMood && (
        <View style={{ marginTop: 20, paddingHorizontal: 16 }}>
          <SliderCard
            variant="duration"
            icon="clock-outline"
            label="How long have you felt this way?"
            value={selectedMood.duration || 0}
            onSlidingComplete={onDurationChange}
            labels={['< 3 months', '6 months', '> 1 year']}
            steps={33}
          />

          {/* Emot Slider */}
          <SliderCard
            variant="emotion"
            icon={selectedMood.icon}
            label={selectedMood.label}
            value={selectedMood.value}
            moodKey={selectedMood.key}
            onSlidingComplete={(val) => handleSliderComplete(val, selectedMood.label)}
          />
        </View>
      )}
    </ScreenLayout>
  );
}

export default MoodSelector;
