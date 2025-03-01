// File: app\components\SliderCard.tsx
// Updated SliderCard component with improved scale indicators and visual feedback

import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../config/theme';
import typographyStyles from '../config/typography.styles';
import localStyles from '../config/MoodSelector.styles';

export type SliderCardProps = {
  mood: { label: string; icon: any; key: keyof typeof theme.moodColors; value: number };
  sliderColor: string;
  onSlidingComplete: (value: number, label: string) => void;
  isRelated?: boolean;
};

const SliderCard: React.FC<SliderCardProps> = ({
  mood,
  sliderColor,
  onSlidingComplete,
  isRelated = false,
}) => {
  // Get a softer background color based on the mood color for better visual hierarchy
  const getBackgroundColor = () => {
    return theme.moodColors[mood.key] + '10'; // 10% opacity
  };

  // Determine text color based on intensity for better feedback
  const getValueTextColor = () => {
    if (mood.value >= 70) return theme.colors.error;
    if (mood.value >= 40) return theme.colors.primary;
    return theme.colors.onSurfaceVariant;
  };

  return (
    <Card
      style={[
        localStyles.component_card_elevated,
        localStyles.mood_slider_card,
        { 
          marginBottom: theme.spacing.medium,
          backgroundColor: isRelated ? theme.colors.surface : getBackgroundColor(),
          borderLeftWidth: 4,
          borderLeftColor: theme.moodColors[mood.key]
        },
      ]}
      accessibilityLabel={`${isRelated ? 'Related ' : ''}Intensity slider for ${mood.label}`}
    >
      <Card.Content>
        <View style={[localStyles.mood_headerRow, { marginBottom: theme.spacing.small }]}>
          <MaterialCommunityIcons 
            name={mood.icon} 
            size={24} 
            color={theme.moodColors[mood.key]} 
          />
          <Text style={[
            typographyStyles.text_body, 
            theme.fonts.bodyMedium, 
            { 
              marginLeft: theme.spacing.small,
              color: theme.colors.onSurface,
              flex: 1
            }
          ]}>
            {mood.label}
          </Text>
          <Text style={[
            typographyStyles.text_body,
            theme.fonts.bodyMedium,
            {
              fontWeight: '600',
              color: getValueTextColor()
            }
          ]}>
            {mood.value}/100
          </Text>
        </View>
        
        <View style={{ paddingHorizontal: theme.spacing.tiny }}>
          <Slider
            value={mood.value}
            minimumValue={0}
            maximumValue={100}
            step={1}
            thumbTintColor={sliderColor}
            minimumTrackTintColor={sliderColor}
            maximumTrackTintColor={theme.colors.surfaceVariant}
            onSlidingComplete={(val) => onSlidingComplete(val, mood.label)}
            style={{ height: theme.scaleFont(20) }}
          />
          
          {/* Scale indicators with tick marks */}
          <View style={[
            localStyles.mood_sliderTicksContainer,
            { marginTop: -theme.spacing.tiny }
          ]}>
            {[0, 25, 50, 75, 100].map(tick => (
              <View key={tick} style={localStyles.mood_sliderTick} />
            ))}
          </View>
          
          <View style={[localStyles.mood_sliderLabels, { marginTop: theme.spacing.tiny }]}>
            <Text style={[typographyStyles.text_caption, theme.fonts.labelSmall]}>0</Text>
            <Text style={[typographyStyles.text_caption, theme.fonts.labelSmall]}>25</Text>
            <Text style={[typographyStyles.text_caption, theme.fonts.labelSmall]}>50</Text>
            <Text style={[typographyStyles.text_caption, theme.fonts.labelSmall]}>75</Text>
            <Text style={[typographyStyles.text_caption, theme.fonts.labelSmall]}>100</Text>
          </View>
          
          <View style={[localStyles.mood_sliderLabels, { marginTop: theme.spacing.small }]}>
            <Text style={[typographyStyles.text_caption, theme.fonts.labelSmall]}>Low Intensity</Text>
            <View style={{ flex: 1 }} />
            <Text style={[typographyStyles.text_caption, theme.fonts.labelSmall]}>High Intensity</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default SliderCard;
