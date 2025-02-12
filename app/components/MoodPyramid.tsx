import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, DimensionValue, ViewStyle } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { theme } from '@/app/config/theme';
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
    { label: 'Peace', color: '#87CEEB', width: '40%' },
    { label: 'Joy', color: '#FFD700', width: '55%' },
    { label: 'Love', color: '#FF69B4', width: '70%' },
    { label: 'Reason', color: '#FFA500', width: '85%' },
    { label: 'Acceptance', color: '#9370DB', width: '100%' },
  ];

  const bubbleConfig = [
    { 
      size: 140,
      fontSize: 16,
      style: { 
        left: '15%',
        top: 20,
        zIndex: 1,
      }
    },
    { 
      size: 120,
      fontSize: 14,
      style: { 
        right: '15%',
        top: 20,
        zIndex: 1,
      }
    },
    { 
      size: 100,
      fontSize: 12,
      style: { 
        left: '40%',
        top: 150,
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
    <ScrollView style={[styles.layout_scrollView, { padding: 16, paddingBottom: 80 }]}>
      <Text style={styles.text_heading3}>Identify the emotions to focus on</Text>
      
      <View style={styles.pyramid_container}>
        {emotions.map((emotion) => (
          <TouchableOpacity
            key={emotion.label}
            onPress={() => handleEmotionSelect(emotion)}
            style={[
              styles.pyramid_item,
              { 
                backgroundColor: emotion.color,
                width: emotion.width,
              } as ViewStyle,
              selectedEmotions.some(e => e.label === emotion.label) && 
              styles.pyramid_itemSelected
            ]}
          >
            <Text style={styles.pyramid_text}>{emotion.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.text_heading3, styles.pyramid_focusTitle]}>Focus Emotions</Text>
      <View style={styles.pyramid_bubbleContainer}>
        {bubbleConfig.map((config, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleBubbleClick(index)}
            style={[
              styles.pyramid_bubble,
              {
                width: config.size,
                height: config.size,
                backgroundColor: selectedEmotions[index]?.color || 'transparent',
                borderWidth: 2,
                borderColor: theme.colors.outline,
              },
              {
                ...config.style as ViewStyle
              }
            ]}
          >
            {selectedEmotions[index] && (
              <Text style={[
                styles.pyramid_bubbleText,
                { fontSize: config.fontSize }
              ]}>
                {selectedEmotions[index].label}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

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
          labelStyle={styles.mood_buttonText}
        >
          Finish
        </Button>
      </View>
    </ScrollView>
  );
} 