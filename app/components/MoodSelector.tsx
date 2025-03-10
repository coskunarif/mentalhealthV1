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
import { CustomAppBar } from './CustomAppBar';

// Add brightness calculation function to determine text color
const getBrightness = (hexColor: string): number => {
  // Convert hex to RGB
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  // Calculate brightness (perceived luminance)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};

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

  const renderMainSliderCard = () => {
    if (!selectedMood) return null;
    const sliderState = slidersState[selectedMood.label] || {
      value: selectedMood.value,
      color: getSliderColor(selectedMood.value),
    };
    
    return (
      <SliderCard
        key={selectedMood.label}
        mood={{ ...selectedMood, value: sliderState.value }}
        sliderColor={sliderState.color}
        onSlidingComplete={(val) => handleSliderComplete(val, selectedMood.label)}
      />
    );
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <CustomAppBar 
        title="Mood Selection" 
        onBackPress={handleBack}
      />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 80 }}>
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
            <Card
              style={{
                borderRadius: theme.shape.borderRadius,
                marginBottom: 16,
                backgroundColor: theme.colors.background,
                borderWidth: 0,
                shadowColor: theme.colors.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <Card.Content style={{ padding: 16 }}>
                <View style={[localStyles.mood_headerRow, { marginBottom: 16 }]}>
                  <MaterialCommunityIcons
                    name="clock-outline"
                    size={24}
                    color={theme.colors.primary}
                  />
                  <Text style={[
                    typographyStyles.text_body,
                    theme.fonts.bodyMedium,
                    { marginLeft: 12, color: theme.colors.onSurface }
                  ]}>
                    How long have you felt this way?
                  </Text>
                </View>
                
                <View style={{ paddingHorizontal: 8 }}>
                  <Slider
                    value={selectedMood?.duration || 0}
                    minimumValue={0}
                    maximumValue={100}
                    step={33}
                    thumbTintColor={theme.colors.primary}
                    minimumTrackTintColor={theme.colors.primary}
                    maximumTrackTintColor={theme.withOpacity(theme.colors.onSurfaceVariant, 0.2)}
                    onSlidingComplete={onDurationChange}
                    style={{ height: 40 }}
                    accessibilityLabel={`Set duration for ${selectedMood?.label}`}
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                  />
                  
                  <View style={[localStyles.mood_sliderLabels, { marginTop: 8 }]}>
                    <Text style={[
                      typographyStyles.text_caption, 
                      theme.fonts.labelSmall,
                      { color: theme.colors.onSurfaceVariant }
                    ]}>
                      {'< 3 months'}
                    </Text>
                    <Text style={[
                      typographyStyles.text_caption, 
                      theme.fonts.labelSmall,
                      { color: theme.colors.onSurfaceVariant }
                    ]}>
                      6 months
                    </Text>
                    <Text style={[
                      typographyStyles.text_caption, 
                      theme.fonts.labelSmall,
                      { color: theme.colors.onSurfaceVariant }
                    ]}>
                      {'> 1 year'}
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>

            {/* Main Mood Slider */}
            {renderMainSliderCard()}
          </View>
        )}
      </ScrollView>

      {/* Button Container */}
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
            labelStyle={{
              fontWeight: '500',
              fontSize: theme.scaleFont(14),
              letterSpacing: 0.1,
              textTransform: 'uppercase',
              color: theme.colors.onPrimary,
            }}
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
            onPress={onFinish}
            accessibilityLabel="Complete mood selection"
            fullWidth
            labelStyle={{
              fontWeight: '500',
              fontSize: theme.scaleFont(14),
              letterSpacing: 0.1,
              textTransform: 'uppercase',
              color: theme.colors.onPrimary,
            }}
            icon="check"
          >
            FINISH
          </EnhancedButton>
        </View>
      </View>
    </View>
  );
}

export default MoodSelector;
