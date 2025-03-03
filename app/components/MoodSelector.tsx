// Updates to fix button design, selection highlight, and modal styling

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Pressable, FlatList, ScrollView } from 'react-native';
import { Text, Card, Modal, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import localStyles from '../config/MoodSelector.styles';
import { typographyStyles } from '../config';
import { theme } from '../config/theme';
import type { AppTheme } from '../types/theme';
import EnhancedButton from './EnhancedButton';
import SliderCard from './SliderCard';

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

const relatedMoods: { [key: string]: (keyof AppTheme['moodColors'])[] } = {
  Shame: ['humiliation'],
  Guilt: ['grief', 'regret'],
  Fear: ['anxiety'],
  Anger: ['hate', 'aggression'],
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
  const [showModal, setShowModal] = useState(false);

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
    (value: number, label: string, isRelated = false) => {
      updateSliderState(label, value);
      onSliderChange(value, label);
    },
    [onSliderChange]
  );

  const handleSelectMood = (index: number) => {
    onMoodSelect(index);
    setShowModal(true);
  };

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
        onSlidingComplete={(val, label) => handleSliderComplete(val, label, false)}
      />
    );
  };

  const renderRelatedMoodSliders = () => {
    if (!selectedMood) return null;
    return Object.entries(relatedMoods).flatMap(([moodKey, relatedKeys]) => {
      if (selectedMood.label.toLowerCase() !== moodKey.toLowerCase()) return [];
      return relatedKeys.map(rKey => {
        const relatedMood: MoodType = {
          label: rKey.charAt(0).toUpperCase() + rKey.slice(1),
          key: rKey,
          icon: 'emoticon-sad',
          value: slidersState[rKey]?.value || 0,
          duration: selectedMood.duration,
          isSelected: false,
        };
        const sliderState = slidersState[rKey] || {
          value: relatedMood.value,
          color: getSliderColor(relatedMood.value),
        };
        return (
          <SliderCard
            key={relatedMood.label}
            mood={relatedMood}
            sliderColor={sliderState.color}
            isRelated
            onSlidingComplete={(val, label) => handleSliderComplete(val, label, true)}
          />
        );
      });
    });
  };

  const renderMoodItem = ({ item, index }: { item: MoodType; index: number }) => {
    const isSelected = selectedMood?.label === item.label;
    return (
      <Pressable
        onPress={() => handleSelectMood(index)}
        style={({ pressed }) => [
          localStyles.mood_item,
          pressed && { opacity: 0.8 },
          isSelected && {
            // Enhanced selection highlight with a soft tint of the emotion color
            backgroundColor: theme.moodColors[item.key] + '15',
            borderWidth: 1,
            borderColor: theme.moodColors[item.key] + '40',
            elevation: theme.colors.elevation.level2,
            shadowColor: theme.moodColors[item.key],
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
          },
        ]}
        accessibilityLabel={`Select mood ${item.label}`}
        accessibilityRole="button"
        accessibilityState={{ selected: isSelected }}
      >
        <MaterialCommunityIcons name={item.icon} size={40} color={theme.moodColors[item.key]} />
        <Text
          style={[
            typographyStyles.text_caption,
            theme.fonts.labelMedium,
            { 
              marginTop: theme.spacing.tiny,
              color: isSelected ? theme.moodColors[item.key] : theme.colors.onSurfaceVariant,
              fontWeight: isSelected ? '600' : '400',
              textAlign: 'center', // Ensure text is centered
              flexShrink: 1, // Allow text to shrink if needed
              // Prevent long text from wrapping awkwardly
              ...(item.label.length > 8 ? { 
                fontSize: theme.scaleFont(10), // Smaller font for longer words
              } : {})
            },
          ]}
          numberOfLines={1} // Prevent wrapping for consistency
        >
          {item.label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <FlatList
        data={moods}
        ListHeaderComponent={
          <Text
            style={[
              typographyStyles.text_heading2,
              {
                textAlign: 'center',
                color: theme.colors.primary,
                marginTop: theme.spacing.large,
                marginBottom: theme.spacing.large,
              },
            ]}
          >
            How are you feeling?
          </Text>
        }
        renderItem={renderMoodItem}
        keyExtractor={(item) => item.label}
        numColumns={3}
        contentContainerStyle={localStyles.mood_gridContainer}
        ListFooterComponent={<View style={{ height: theme.spacing.large * 2 }} />}
      />

      {/* Enhanced Modal Implementation */}
      <Modal
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        style={{ 
          zIndex: 10 // Increased from 3 to ensure proper layering
        }}
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          padding: theme.spacing.large,
          paddingTop: theme.spacing.large * 1.5,
          margin: theme.spacing.medium,
          marginTop: theme.spacing.large,
          borderRadius: theme.shape.borderRadius,
          elevation: theme.colors.elevation.level4,
          shadowColor: theme.colors.shadow,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          maxHeight: '70%', // Reduced from 75% to ensure buttons remain visible
        }}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: theme.spacing.large }}>
          <Card style={{ borderRadius: theme.shape.borderRadius, elevation: 0, borderWidth: 0 }}>
            <Card.Title
              title={selectedMood?.label}
              titleStyle={{ 
                color: selectedMood ? theme.moodColors[selectedMood.key] : theme.colors.primary,
                fontWeight: '600',
                fontSize: theme.scaleFont(18) 
              }}
              right={(props) => (
                <IconButton
                  {...props}
                  icon="close"
                  iconColor={theme.colors.onSurfaceVariant}
                  size={24}
                  onPress={() => setShowModal(false)}
                  style={{ 
                    padding: theme.spacing.medium,
                    margin: theme.spacing.small 
                  }}
                  accessibilityLabel="Close modal"
                />
              )}
            />
            <Card.Content style={{ marginTop: theme.spacing.large }}>
              <Card
                style={[
                  localStyles.mood_slider_card,
                  localStyles.component_card_elevated,
                  { marginBottom: theme.spacing.large, borderWidth: 0, paddingVertical: theme.spacing.small },
                ]}
              >
                <Card.Content>
                  <View style={[localStyles.mood_headerRow, { marginBottom: theme.spacing.small }]}>
                    <MaterialCommunityIcons
                      name="clock-outline"
                      size={24}
                      color={theme.colors.primary}
                    />
                    <Text style={[
                      typographyStyles.text_body,
                      theme.fonts.bodyMedium,
                      { marginLeft: theme.spacing.small, color: theme.colors.onSurface }
                    ]}>
                      How long have you felt this way?
                    </Text>
                  </View>
                  <Slider
                    value={selectedMood?.duration || 0}
                    minimumValue={0}
                    maximumValue={100}
                    step={33}
                    thumbTintColor={theme.colors.primary}
                    minimumTrackTintColor={theme.colors.primary}
                    maximumTrackTintColor={theme.colors.surfaceVariant}
                    onSlidingComplete={onDurationChange}
                    style={{ height: theme.scaleFont(20) }}
                    accessibilityLabel={`Set duration for ${selectedMood?.label}`}
                  />
                  <View style={[localStyles.mood_sliderLabels, { marginTop: theme.spacing.small }]}>
                    <Text style={[typographyStyles.text_caption, theme.fonts.labelSmall]}>
                      {'< 3 months'}
                    </Text>
                    <Text style={[typographyStyles.text_caption, theme.fonts.labelSmall]}>
                      6 months
                    </Text>
                    <Text style={[typographyStyles.text_caption, theme.fonts.labelSmall]}>
                      {'> 1 year'}
                    </Text>
                  </View>
                </Card.Content>
              </Card>
              {renderMainSliderCard()}
              {renderRelatedMoodSliders()}
            </Card.Content>
          </Card>
        </ScrollView>
      </Modal>

      {/* Enhanced button container */}
      <View style={[localStyles.mood_buttonContainer, { padding: theme.spacing.medium }]}>
        <View style={{ flex: 1, marginHorizontal: theme.spacing.small }}>
          <EnhancedButton
            mode="outlined"
            onPress={onNext}
            accessibilityLabel="Proceed to focus emotions screen"
            fullWidth
            labelStyle={{
              fontWeight: '600',
              fontSize: theme.scaleFont(16),
              color: theme.colors.primary,
              textTransform: 'uppercase',
            }}
          >
            NEXT: EMOTIONS
          </EnhancedButton>
        </View>
        <View style={{ flex: 1, marginHorizontal: theme.spacing.small }}>
          <EnhancedButton
            mode="contained"
            onPress={onFinish}
            accessibilityLabel="Complete mood selection and return to previous screen"
  fullWidth
  labelStyle={{
    fontWeight: '600',
    fontSize: theme.scaleFont(16),
    color: theme.colors.onPrimary, // Fixed color - was "primary" which would be green on green
    textTransform: 'uppercase',
  }}
>
    FINISH
  </EnhancedButton>
</View>
      </View>
    </View>
  );
}

export default MoodSelector;
