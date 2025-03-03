import React, { useState, useEffect, useCallback } from 'react';
import { View, Pressable, FlatList, ScrollView, Dimensions } from 'react-native';
import { Text, Card, Modal, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import localStyles from '../config/MoodSelector.styles';
import { typographyStyles } from '../config';
import { theme } from '../config/theme';
import type { AppTheme } from '../types/theme';
import EnhancedButton from './EnhancedButton';
import SliderCard from './SliderCard';

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
            // More consistent selection highlight with Material Design principles
            backgroundColor: theme.colors.surface, // Keep background light
            borderWidth: 2, // Use thicker border for selection
            borderColor: theme.moodColors[item.key], // Use the mood color directly
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
        <MaterialCommunityIcons 
          name={item.icon} 
          size={40} 
          color={theme.moodColors[item.key]} 
        />
        <Text
          style={[
            typographyStyles.text_caption,
            theme.fonts.labelMedium,
            { 
              marginTop: theme.spacing.tiny,
              color: isSelected ? theme.moodColors[item.key] : theme.colors.onSurfaceVariant,
              fontWeight: isSelected ? '600' : '400',
              textAlign: 'center',
              flexShrink: 1,
              // Prevent long text from wrapping awkwardly
              ...(item.label.length > 8 ? { 
                fontSize: theme.scaleFont(10),
              } : {})
            },
          ]}
          numberOfLines={1}
        >
          {item.label}
        </Text>
        
        {/* Add selection indicator dot for better accessibility */}
        {isSelected && (
          <View 
            style={{
              position: 'absolute',
              bottom: 4,
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: theme.moodColors[item.key],
            }}
          />
        )}
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
          maxHeight: '65%', // Reduced to ensure buttons remain visible
          maxWidth: 550, // Add maximum width for better appearance on larger screens
          alignSelf: 'center', // Center the modal
        }}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: theme.spacing.large }}>
          <Card style={{ borderRadius: theme.shape.borderRadius, elevation: 0, borderWidth: 0 }}>
            <Card.Title
              title={selectedMood?.label}
              titleStyle={{ 
                // Dynamically set text color based on mood color brightness
                color: selectedMood 
                  ? getBrightness(theme.moodColors[selectedMood.key]) > 0.6 
                    ? theme.colors.onSurface 
                    : theme.moodColors[selectedMood.key]
                  : theme.colors.primary,
                fontWeight: '600',
                fontSize: theme.scaleFont(20), // Increased from 18 for better visibility
                letterSpacing: 0.15, // Add letter spacing for better readability
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
      <View style={[
        localStyles.mood_buttonContainer,
        isSmallScreen && { flexDirection: 'column' } // Stack buttons on small screens
      ]}>
        <View style={{ 
          flex: 1, 
          marginRight: isSmallScreen ? 0 : theme.spacing.small,
          marginBottom: isSmallScreen ? theme.spacing.small : 0
        }}>
          <EnhancedButton
            mode="outlined"
            onPress={onNext}
            accessibilityLabel="Proceed to focus emotions screen"
            fullWidth
            labelStyle={{
              fontWeight: '500',
              fontSize: theme.scaleFont(14),
              color: theme.colors.primary,
              textTransform: 'uppercase',
              letterSpacing: 0.5, // Add letter spacing for better readability
            }}
          >
            NEXT: EMOTIONS
          </EnhancedButton>
        </View>
        <View style={{ 
          flex: 1, 
          marginLeft: isSmallScreen ? 0 : theme.spacing.small 
        }}>
          <EnhancedButton
            mode="contained"
            onPress={onFinish}
            accessibilityLabel="Complete mood selection and return to previous screen"
            fullWidth
            labelStyle={{
              fontWeight: '500',
              fontSize: theme.scaleFont(14),
              color: theme.colors.onPrimary,
              textTransform: 'uppercase',
              letterSpacing: 0.5, // Add letter spacing for better readability
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
