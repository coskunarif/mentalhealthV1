import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, DimensionValue, ViewStyle } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { theme } from '../config/theme';
import styles from '../config/styles';


type Emotion = {
  label: string;
  color: string;
  width: string | number;
};

type EmotionSelection = {
  label: string;
  color: string;
};

type Props = {
  onPrevious: () => void;
  onFinish: () => void;
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

  const bubbleConfig = [
    { 
      size: theme.scaleSize(162),
      fontSize: theme.scaleFont(18),
      style: { 
        left: '7%',
        top: 1,
        zIndex: 1,
      }
    },
    { 
      size: theme.scaleSize(132),
      fontSize: theme.scaleFont(15),
      style: { 
        right: '15%',
        top: 5,
        zIndex: 1,
      }
    },
    { 
      size: theme.scaleSize(110),
      fontSize: theme.scaleFont(13),
      style: { 
        left: '38.5%',
        top: 130,
        zIndex: 2,
      }
    },
  ];

  const handleEmotionSelect = (emotion: Emotion) => {
    if (selectedEmotions.find(e => e.label === emotion.label)) {
      setSelectedEmotions(prev => prev.filter(e => e.label !== emotion.label));
    } else if (selectedEmotions.length < 3) {
      const newEmotion: EmotionSelection = {
        label: emotion.label,
        color: emotion.color
      };
      setSelectedEmotions(prev => [...prev, newEmotion]);
    }
  };

  const handleBubbleClick = (index: number) => {
    if (selectedEmotions[index]) {
      setSelectedEmotions(prev => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView 
        style={[styles.layout_scrollView, { padding: theme.spacing.medium }]}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text style={[styles.header_shadow, { textAlign: 'center', color: theme.colors.primary }]}>Identify the emotions to focus on</Text>
        
        <View style={styles.pyramid_container}>
          {emotions.map((emotion) => (
            <TouchableOpacity
              key={emotion.label}
              onPress={() => handleEmotionSelect(emotion)}
              accessibilityLabel={`Select emotion ${emotion.label}`}
              accessibilityRole="button"
              style={[
                styles.pyramid_item,
                { 
                  backgroundColor: emotion.color,
                  width: emotion.width,
                  ...(selectedEmotions.some(e => e.label === emotion.label) && {
                    borderWidth: 2,
                    borderColor: '#E0E0E0'
                  })
                } as ViewStyle,
              ]}
            >
              <Text style={styles.pyramid_text}>{emotion.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.header_shadow, { textAlign: 'left', color: theme.colors.primary }]}>Focus Emotions</Text>
        <View style={styles.pyramid_bubbleContainer}>
          {bubbleConfig.map((config, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleBubbleClick(index)}
              accessibilityLabel={selectedEmotions[index] ? 
                `Remove ${selectedEmotions[index].label}` : 
                `Select focus emotion ${index + 1}`}
              accessibilityRole="button"
              style={[
                styles.pyramid_bubble,
                {
                  width: config.size,
                  height: config.size,
                  backgroundColor: selectedEmotions[index]?.color || '#F5F5F5',
                  borderWidth: 2,
                  borderColor: '#E0E0E0',
                  justifyContent: 'center',
                  alignItems: 'center'
                },
                {
                  ...config.style as ViewStyle
                }
              ]}
            >
              {selectedEmotions[index] ? (
                <Text style={[
                  styles.pyramid_bubbleText,
                  { fontSize: config.fontSize }
                ]}>
                  {selectedEmotions[index].label}
                </Text>
              ) : (
                <Text style={[
                  styles.text_heading3,
                  { 
                    fontSize: config.fontSize * 0.8,
                    color: theme.colors.primary,
                    textAlign: 'center'
                  }
                ]}>
                  Focus{'\n'}Emotions
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.mood_buttonContainer}>
        <Button
          mode="outlined"
          onPress={onPrevious}
          style={[styles.mood_button, styles.button_outlined]}
          labelStyle={styles.mood_buttonText}
        >
          Previous
        </Button>
        <Button
          mode="contained"
          onPress={onFinish}
          style={[styles.mood_button, styles.button_contained]}
          labelStyle={[styles.mood_buttonText, { color: theme.colors.onPrimary }]}
        >
          Finish
        </Button>
      </View>
    </View>
  );
}
