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
      size: 162,
      fontSize: 18,
      style: { 
        left: '7%',
        top: 10,
        zIndex: 1,
      }
    },
    { 
      size: 132,
      fontSize: 15,
      style: { 
        right: '15%',
        top: 20,
        zIndex: 1,
      }
    },
    { 
      size: 110,
      fontSize: 13,
      style: { 
        left: '40%',
        top: 140,
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
        style={[styles.layout_scrollView, { padding: 16 }]}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text style={[styles.header_shadow, { textAlign: 'center', color: theme.colors.primary }]}>Identify the emotions to focus on</Text>
        
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