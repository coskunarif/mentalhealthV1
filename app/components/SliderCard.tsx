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
  return (
    <Card
      style={[
        localStyles.component_card_elevated,
        localStyles.mood_slider_card,
        { marginBottom: theme.spacing.small },
      ]}
      accessibilityLabel={`${isRelated ? 'Related ' : ''}Intensity slider for ${mood.label}`}
    >
      <Card.Content>
        <View style={[localStyles.mood_headerRow, { marginBottom: theme.spacing.tiny }]}>
          <MaterialCommunityIcons name={mood.icon} size={24} color={theme.moodColors[mood.key]} />
          <Text style={[typographyStyles.text_body, theme.fonts.bodyMedium, { marginLeft: theme.spacing.small }]}>
            {mood.label} ({mood.value}/100)
          </Text>
        </View>
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
        <View style={[localStyles.mood_sliderLabels, { marginTop: theme.spacing.tiny }]}>
          <Text style={[typographyStyles.text_caption, theme.fonts.labelSmall]}>Low</Text>
          <Text style={[typographyStyles.text_caption, theme.fonts.labelSmall]}>High</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default SliderCard;
