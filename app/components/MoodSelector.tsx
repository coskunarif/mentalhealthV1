import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, Modal } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import localStyles from '../config/MoodSelector.styles';
import { layoutStyles, typographyStyles } from '../config';
import { theme } from '../config/theme';
import type { AppTheme } from '../types/theme';
import EnhancedButton from './EnhancedButton';

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

export function MoodSelector({
  moods,
  selectedMood,
  onMoodSelect,
  onSliderChange,
  onDurationChange,
  onNext,
  onFinish,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [mainSliderValues, setMainSliderValues] = useState<Record<string, number>>({});
  const [mainSliderColors, setMainSliderColors] = useState<Record<string, string>>({});
  const [relatedMoodValues, setRelatedMoodValues] = useState<Record<string, number>>({});
  const [relatedSliderColors, setRelatedSliderColors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (selectedMood) {
      setMainSliderValues(prev => ({ ...prev, [selectedMood.label]: selectedMood.value }));
      updateSliderColor(selectedMood.value, selectedMood.label, false);
    }
  }, [selectedMood]);

  const getSliderColor = (value: number) => {
    if (value <= 33) return theme.chartColors.progress.inactive;
    if (value <= 66) return theme.chartColors.progress.active;
    return theme.colors.primary;
  };

  const updateSliderColor = (value: number, label: string, isRelated: boolean) => {
    const color = getSliderColor(value);
    if (isRelated) {
      setRelatedSliderColors(prev => ({ ...prev, [label]: color }));
    } else {
      setMainSliderColors(prev => ({ ...prev, [label]: color }));
    }
  };

  const handleRelatedMoodChange = (value: number, label: string) => {
    setRelatedMoodValues(prev => ({ ...prev, [label]: value }));
    updateSliderColor(value, label, true);
    onSliderChange(value, label);
  };

  const handleMainSliderChange = (value: number, label: string) => {
    setMainSliderValues(prev => ({ ...prev, [label]: value }));
    updateSliderColor(value, label, false);
    onSliderChange(value, label);
  };

  const handleSelectMood = (index: number) => {
    onMoodSelect(index);
    setShowModal(true);
  };

  const renderSliderCard = (mood: MoodType | null, isRelated = false) => {
    if (!mood) return null;
    const sliderValue = isRelated
      ? relatedMoodValues[mood.label] || 0
      : mainSliderValues[mood.label] || mood.value;
    const sliderColor = isRelated
      ? relatedSliderColors[mood.label] || getSliderColor(0)
      : mainSliderColors[mood.label] || getSliderColor(sliderValue);

    return (
      <Card
        key={mood.label}
        style={[localStyles.component_card_elevated, localStyles.mood_slider_card, { padding: theme.spacing.small }]}
        accessibilityLabel={`${isRelated ? 'Related ' : ''}Intensity slider for ${mood.label}`}
      >
        <Card.Content style={{ gap: theme.spacing.tiny }}>
          <View style={localStyles.mood_headerRow}>
            <MaterialCommunityIcons name={mood.icon} size={24} color={theme.moodColors[mood.key]} />
            <Text style={[typographyStyles.text_body, theme.fonts.bodyMedium]}>
              {mood.label}
            </Text>
          </View>
          <Slider
            value={sliderValue}
            minimumValue={0}
            maximumValue={100}
            step={1}
            thumbTintColor={sliderColor}
            minimumTrackTintColor={sliderColor}
            maximumTrackTintColor={theme.colors.surfaceVariant}
            onValueChange={(val) => {
              isRelated ? handleRelatedMoodChange(val, mood.label) : handleMainSliderChange(val, mood.label);
            }}
            style={{ height: theme.scaleFont(16) }}
          />
          <View style={[localStyles.mood_sliderLabels, { marginTop: -theme.spacing.tiny / 2 }]}>
            <Text style={[typographyStyles.text_caption, theme.fonts.labelSmall]}>Low</Text>
            <Text style={[typographyStyles.text_caption, theme.fonts.labelSmall]}>High</Text>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const renderDurationSlider = (mood: MoodType | null) => {
    if (!mood) return null;
    return (
      <Card
        style={[localStyles.component_card_elevated, localStyles.mood_slider_card, { padding: theme.spacing.small }]}
        accessibilityLabel={`Duration slider for ${mood.label}`}
      >
        <Card.Content style={{ gap: theme.spacing.tiny }}>
          <View style={localStyles.mood_headerRow}>
            <MaterialCommunityIcons name="clock-outline" size={24} color={theme.colors.primary} />
            <Text style={[typographyStyles.text_body, theme.fonts.bodyMedium]}>
              How long
            </Text>
          </View>
          <Slider
            value={mood.duration}
            minimumValue={0}
            maximumValue={100}
            step={33}
            thumbTintColor={theme.colors.primary}
            minimumTrackTintColor={theme.colors.primary}
            onValueChange={onDurationChange}
            style={{ height: theme.scaleFont(16) }}
            accessibilityLabel={`Set duration for ${mood.label}`}
          />
          <View style={[localStyles.mood_sliderLabels, { marginTop: -theme.spacing.tiny / 2 }]}>
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
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={[layoutStyles.layout_scrollView, { padding: theme.spacing.medium }]}
        contentContainerStyle={{ paddingBottom: theme.spacing.medium * 6.25 }}
      >
        <Text
          style={[
            typographyStyles.text_heading2,
            { textAlign: 'center', color: theme.colors.primary, marginBottom: theme.spacing.medium },
          ]}
        >
          How are you feeling?
        </Text>
        <View style={localStyles.mood_gridContainer}>
          {moods.map((mood, index) => (
            <TouchableOpacity
              key={mood.label}
              onPress={() => handleSelectMood(index)}
              style={[
                localStyles.mood_item,
                {
                  flexBasis: '30%',
                  flexGrow: 1,
                  maxWidth: '33%',
                  aspectRatio: 1,
                },
                selectedMood?.label === mood.label && {
                  backgroundColor: theme.moodColors[mood.key] + '20',
                  borderWidth: 2,
                  borderColor: theme.colors.outline,
                  elevation: 2,
                },
              ]}
              accessibilityLabel={`Select mood ${mood.label}`}
              accessibilityRole="button"
              accessibilityState={{ selected: selectedMood?.label === mood.label }}
            >
              <MaterialCommunityIcons name={mood.icon} size={40} color={theme.moodColors[mood.key]} />
              <Text
                style={[
                  typographyStyles.text_caption,
                  theme.fonts.labelMedium,
                  { marginTop: theme.spacing.tiny },
                ]}
              >
                {mood.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Modal
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          padding: theme.spacing.medium,
          borderRadius: theme.shape.borderRadius,
          elevation: 4,
        }}
      >
        <Card>
          <Card.Title title={selectedMood?.label} />
          <Card.Content>
            {renderDurationSlider(selectedMood)}
            {renderSliderCard(selectedMood)}
            {selectedMood &&
              Object.entries(relatedMoods).map(([moodKey, relatedKeys]) => {
                if (selectedMood.key !== moodKey.toLowerCase()) return null;
                return relatedKeys.map(rKey => {
                  const relatedMood: MoodType = {
                    label: rKey.charAt(0).toUpperCase() + rKey.slice(1),
                    key: rKey,
                    icon: 'emoticon-sad', // Map actual icons if desired
                    value: relatedMoodValues[rKey] || 0,
                    duration: selectedMood.duration,
                    isSelected: false,
                  };
                  return renderSliderCard(relatedMood, true);
                });
              })}
          </Card.Content>
        </Card>
      </Modal>
      <View style={localStyles.mood_buttonContainer}>
        <EnhancedButton
          mode="outlined"
          onPress={onNext}
          style={[localStyles.mood_button]}
          accessibilityLabel="Proceed to select focus emotions"
        >
          Next: Focus Emotions
        </EnhancedButton>
        <EnhancedButton
          mode="contained"
          onPress={onFinish}
          style={[localStyles.mood_button]}
          accessibilityLabel="Complete mood selection and return to previous screen"
        >
          Finish
        </EnhancedButton>
      </View>
    </View>
  );
}
