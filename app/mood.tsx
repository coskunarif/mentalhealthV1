import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Surface, TouchableRipple, IconButton, useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { globalStyles } from './config/styles';

const emotions = [
  { name: 'Enlightenment', color: '#8A2BE2' }, // Purple
  { name: 'Peace', color: '#9370DB' },
  { name: 'Joy', color: '#9B59B6' },
  { name: 'Love', color: '#87CEEB' }, // Light blue
  { name: 'Reason', color: '#48D1CC' },
  { name: 'Acceptance', color: '#98FB98' },
  { name: 'Willingness', color: '#90EE90' },
  { name: 'Neutrality', color: '#8FBC8F' },
  { name: 'Courage', color: '#9ACD32' },
  { name: 'Pride', color: '#FFEB3B' },
  { name: 'Anger', color: '#FFA07A' },
  { name: 'Desire', color: '#FFA500' },
  { name: 'Grief', color: '#FF7F50' },
  { name: 'Apathy', color: '#FF6347' },
  { name: 'Guilt', color: '#FF4500' },
  { name: 'Shame', color: '#FF8C00' },
];

export default function MoodScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [selectedEmotion, setSelectedEmotion] = useState<string>('');

  const handleEmotionSelect = (emotion: string) => {
    setSelectedEmotion(emotion);
  };

  return (
    <Surface style={{ flex: 1, backgroundColor: theme.colors.primaryContainer }}>
      {/* Back Button */}
      <View style={{ position: 'absolute', top: 16, left: 16, zIndex: 1 }}>
        <IconButton
          icon="arrow-left"
          mode="contained"
          size={24}
          onPress={() => router.back()}
          containerColor={theme.colors.primary}
          iconColor={theme.colors.onPrimary}
        />
      </View>

      {/* Main Content */}
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 24, paddingTop: 80 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 12, paddingBottom: 24 }}>
          {emotions.map((emotion, index) => {
            const isSelected = selectedEmotion === emotion.name;
            return (
              <TouchableRipple
                key={index}
                onPress={() => handleEmotionSelect(emotion.name)}
                style={{
                  backgroundColor: isSelected ? emotion.color : `${emotion.color}40`,
                  borderRadius: 12,
                  overflow: 'hidden',
                }}
              >
                <View style={{ 
                  padding: 16,
                  alignItems: 'center',
                }}>
                  <Text
                    variant="titleMedium"
                    style={[
                      globalStyles.text,
                      { color: isSelected ? 'white' : '#000000' }
                    ]}
                  >
                    {emotion.name}
                  </Text>
                </View>
              </TouchableRipple>
            );
          })}
        </View>
      </ScrollView>
    </Surface>
  );
}
