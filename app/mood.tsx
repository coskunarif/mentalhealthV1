import React, { useState } from 'react';
import { Box, Text, ScrollView, HStack, Pressable, VStack, IconButton, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

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

const topEmotions = ['Neutrality', 'Pride', 'Love'];

export default function MoodScreen() {
  const router = useRouter();
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [selectedEmotion, setSelectedEmotion] = useState<string>('');

  const handleEmotionSelect = (emotion: string) => {
    setSelectedEmotion(emotion);
    if (selectedEmotions.length < 3 && !selectedEmotions.includes(emotion)) {
      setSelectedEmotions([...selectedEmotions, emotion]);
    }
  };

  const removeEmotion = (emotion: string) => {
    setSelectedEmotions(selectedEmotions.filter(e => e !== emotion));
  };

  return (
    <Box flex={1} bg="white" safeArea>
      {/* Back Button */}
      <Box position="absolute" top={4} left={4} zIndex={1}>
        <IconButton
          icon={<Icon as={MaterialIcons} name="arrow-back" size={6} color="gray.500" />}
          variant="ghost"
          rounded="full"
          _pressed={{ bg: 'gray.100' }}
          onPress={() => router.back()}
        />
      </Box>

      <VStack flex={1} px={6} pt={16}>
        {/* Question */}
        <Text
          fontSize="2xl"
          color="green.600"
          textAlign="center"
          mb={8}
        >
          Which one describes{'\n'}you better?
        </Text>

        {/* Selected Emotions */}
        <HStack space={2} mb={8} justifyContent="center">
          {topEmotions.map((emotion, index) => (
            <Box
              key={index}
              w="30%"
              h={10}
              bg={selectedEmotions.includes(emotion) ? 'green.100' : 'gray.100'}
              rounded="md"
              alignItems="center"
              justifyContent="center"
            >
              <Text
                fontSize="sm"
                color={selectedEmotions.includes(emotion) ? 'green.600' : 'gray.500'}
              >
                {emotion}
              </Text>
            </Box>
          ))}
        </HStack>

        {/* Emotions List */}
        <ScrollView flex={1} showsVerticalScrollIndicator={false}>
          <VStack space={1}>
            {emotions.map((emotion, index) => (
              <Pressable
                key={index}
                onPress={() => handleEmotionSelect(emotion.name)}
              >
                <Box
                  w="full"
                  h={12}
                  bg={emotion.color}
                  opacity={selectedEmotion === emotion.name ? 1 : 0.7}
                  rounded="md"
                  alignItems="center"
                  justifyContent="center"
                  mb={1}
                >
                  <Text
                    fontSize={selectedEmotion === emotion.name ? "lg" : "md"}
                    fontWeight={selectedEmotion === emotion.name ? "bold" : "normal"}
                    color="white"
                  >
                    {emotion.name}
                  </Text>
                </Box>
              </Pressable>
            ))}
          </VStack>
        </ScrollView>
      </VStack>
    </Box>
  );
}
