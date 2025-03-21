import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ViewStyle,
} from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import localStyles from '../config/MoodPyramid.styles';
import { typographyStyles } from '../config';
import { useAppTheme } from '../hooks/useAppTheme';
import EnhancedButton from './EnhancedButton';
import { ScreenLayout } from './ScreenLayout'; // Import ScreenLayout

type Emotion = {
  label: string;
  color: string;
  width: string | number;
};

type EmotionSelection = {
  label: string;
  color: string;
};

type BubbleConfig = {
  size: number;
  fontSize: number;
  style: {
    left?: number;
    right?: number;
    top: number;
    zIndex: number;
  };
};

type Props = {
  onPrevious: () => void;
  onFinish: () => void;
};

const screenHeight = Dimensions.get('window').height;

const getBubbleConfig = (screenWidth: number): BubbleConfig[] => {
  const theme = useAppTheme();
  const baseSize = Math.min(screenWidth * 0.4, 160); // Responsive base size
  const fontSize = theme.scaleFont(Math.min(screenWidth * 0.042, 18)); // Responsive font size
  return [
    {
      size: baseSize * 1.05,
      fontSize: fontSize,
      style: {
        left: screenWidth * 0.06,
        top: 20,
        zIndex: 3,
      },
    },
    {
      size: baseSize * 0.95,
      fontSize: theme.scaleFont(fontSize * 0.9),
      style: {
        right: screenWidth * 0.09,
        top: 20,
        zIndex: 2,
      },
    },
    {
      size: baseSize * 0.85,
      fontSize: theme.scaleFont(fontSize * 0.8),
      style: {
        left: screenWidth * 0.32,
        top: baseSize * 1,
        zIndex: 1,
      },
    },
  ];
};

export function MoodPyramid({ onPrevious, onFinish }: Props) {
  const theme = useAppTheme();
  const [selectedEmotions, setSelectedEmotions] = useState<EmotionSelection[]>([]);
  const emotions: Emotion[] = [
    { label: 'Peace', color: theme.moodColors.peace, width: '40%' },
    { label: 'Joy', color: theme.moodColors.joy, width: '55%' },
    { label: 'Love', color: theme.moodColors.love, width: '70%' },
    { label: 'Reason', color: theme.moodColors.reason, width: '85%' },
    { label: 'Acceptance', color: theme.moodColors.acceptance, width: '100%' },
  ];
  const screenWidth = Dimensions.get('window').width;
  const bubbleConfig = getBubbleConfig(screenWidth);

  const handleEmotionSelect = (emotion: Emotion) => {
    if (selectedEmotions.some(e => e.label === emotion.label)) {
      setSelectedEmotions(prev => prev.filter(e => e.label !== emotion.label));
    } else if (selectedEmotions.length < 3) {
      setSelectedEmotions(prev => [...prev, { label: emotion.label, color: emotion.color }]);
    }
  };

  const handleBubbleClick = (index: number) => {
    if (selectedEmotions[index]) {
      setSelectedEmotions(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ScreenLayout
      title="Focus Emotions"
      onBackPress={handleBack}
      elevation={0}
      scrollable={true}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 120,
        paddingHorizontal: 16
      }}
      bottomContent={
        <View style={[
          localStyles.mood_buttonContainer,
          {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: 'row',
            padding: 16,
            backgroundColor: theme.colors.background,
            borderTopWidth: 1,
            borderTopColor: theme.withOpacity(theme.colors.outline, 0.08),
          }
        ]}>
          <View style={{
            flex: 1,
            marginRight: theme.spacing.small,
          }}>
            <EnhancedButton
              mode="contained"
              onPress={onPrevious}
              accessibilityLabel="Return to previous screen"
              fullWidth
              icon="arrow-left"
            >
              PREVIOUS
            </EnhancedButton>
          </View>
          <View style={{
            flex: 1,
            marginLeft: theme.spacing.small
          }}>
            <EnhancedButton
              mode="contained"
              onPress={onFinish}
              accessibilityLabel="Complete emotion selection"
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
        Identify the emotions to focus on
      </Text>

      <View style={[localStyles.pyramid_container, { marginBottom: 24 }]}>
        {emotions.map(emotion => (
          <TouchableOpacity
            key={emotion.label}
            onPress={() => handleEmotionSelect(emotion)}
            accessibilityLabel={`Select emotion ${emotion.label}`}
            accessibilityRole="button"
            style={[
              localStyles.pyramid_item,
              {
                backgroundColor: emotion.color,
                width: emotion.width,
                ...(selectedEmotions.some(e => e.label === emotion.label) && {
                  borderWidth: 2,
                  borderColor: theme.colors.outline,
                }),
              } as ViewStyle,
            ]}
          >
            <Text style={localStyles.pyramid_text}>{emotion.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text
        style={[
          theme.fonts.bodySmall,
          {
            textAlign: 'center',
            marginTop: theme.spacing.small,
            color: theme.colors.onSurfaceVariant,
          },
        ]}
      >
        Tap up to 3 emotions to focus on your mindfulness journey.
      </Text>
      <Text
        style={[
          typographyStyles.text_heading3,
          {
            color: theme.colors.primary,
            marginTop: theme.spacing.medium,
            marginBottom: 16
          },
        ]}
      >
        Focus Emotions
      </Text>
      <View style={[
        localStyles.pyramid_bubbleContainer,
        {
          position: 'relative',
          minHeight: 400,
          marginBottom: 24
        }
      ]}>
        {bubbleConfig.map((config, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleBubbleClick(index)}
            accessibilityLabel={
              selectedEmotions[index]
                ? `Remove ${selectedEmotions[index].label}`
                : `Select focus emotion ${index + 1}`
            }
            accessibilityRole="button"
            style={[
              localStyles.pyramid_bubble,
              {
                position: 'absolute',
                width: config.size,
                height: config.size,
                backgroundColor: selectedEmotions[index]?.color || theme.colors.background,
                borderWidth: 2,
                borderColor: theme.colors.outline,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 3,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
              },
              config.style
            ]}
          >
            {selectedEmotions[index] ? (
              <Text
                style={[
                  localStyles.pyramid_bubbleText,
                  { fontSize: config.fontSize },
                ]}
              >
                {selectedEmotions[index].label}
              </Text>
            ) : (
              <Text
                style={[
                  typographyStyles.text_heading3,
                  {
                    fontSize: config.fontSize * 0.8,
                    color: theme.colors.primary,
                    textAlign: 'center',
                    fontWeight: 'bold', // Added for emphasis
                  },
                ]}
              >
                Focus{'\n'}Emotions
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScreenLayout>
  );
}
