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
import { theme } from '../config/theme';
import EnhancedButton from './EnhancedButton';

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
    left?: number | string;
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
      const baseSize = Math.min(screenWidth * 0.4, 160); // Ekran genişliğine göre maksimum boyut
      
      return [
        {
          // Love (pembe) - En büyük bubble, sol üstte
          size: baseSize * 1.05,
          fontSize: theme.scaleFont(18),
          style: { 
            left: screenWidth * 0.06, 
            top: 20,
            zIndex: 3 
          },
        },
        {
          // Joy (sarı) - Orta boy bubble, sağ üstte
          size: baseSize * 0.95,
          fontSize: theme.scaleFont(16),
          style: { 
            right: screenWidth * 0.09, 
            top: 20,
            zIndex: 2 
          },
        },
        {
          // Peace (mavi) - En küçük bubble, alt ortada
          size: baseSize * 0.85,
          fontSize: theme.scaleFont(14),
          style: { 
            left: screenWidth * 0.32, // İki bubble'ın ortasına konumlandır
            top: baseSize * 1, // Üst bubble'ların biraz altında
            zIndex: 1 
          },
        },
      ];
    };

export function MoodPyramid({ onPrevious, onFinish }: Props) {
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
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center',
        paddingHorizontal: 4,
        paddingTop: 8,
        marginBottom: 8
      }}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={handleBack}
          style={{ marginLeft: -8 }}
          accessibilityLabel="Go back"
        />
        <Text style={[
          typographyStyles.text_heading3,
          {
            color: theme.colors.onSurface,
            marginLeft: 4,
            fontWeight: '500'
          }
        ]}>
          Focus Emotions
        </Text>
      </View>
      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ 
          flexGrow: 1,
          paddingBottom: 120,
          paddingHorizontal: 16
        }}
        showsVerticalScrollIndicator={true}
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
                {
                  ...config.style,
                  left: typeof config.style.left === 'string' ? parseInt(config.style.left) : config.style.left
                }
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
      </ScrollView>

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
            labelStyle={{
              fontWeight: '500',
              fontSize: theme.scaleFont(14),
              letterSpacing: 0.1,
              textTransform: 'uppercase',
              color: theme.colors.onPrimary,
            }}
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
