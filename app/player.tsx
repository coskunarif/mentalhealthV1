import React, { useState } from 'react';
import { Box, VStack, Text, Pressable, Icon, Center, IconButton } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Dimensions, Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useRouter } from 'expo-router';

// Star burst component
const StarBurst = () => {
  const stars = Array(6).fill(0); // Create 6 star points
  const size = Dimensions.get('window').width * 0.6;

  return (
    <Box w={size} h={size}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        {stars.map((_, i) => {
          const rotation = (i * 60) % 360;
          const opacity = 0.2 + (i * 0.1);
          return (
            <Path
              key={i}
              d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z"
              fill="#4169E1"
              opacity={opacity}
              transform={`rotate(${rotation} 50 50)`}
            />
          );
        })}
      </Svg>
    </Box>
  );
};

export default function PlayerScreen() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0.38); // 7:28 out of 19:00

  // Format time function
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const currentTime = 448; // 7:28 in seconds
  const totalTime = 1140; // 19:00 in seconds

  return (
    <Box flex={1} bg="#F0F5F0" safeArea>
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

      <VStack flex={1} space={8} alignItems="center" justifyContent="center" p={6}>
        {/* Star Burst Animation */}
        <Center mb={8}>
          <StarBurst />
        </Center>

        {/* Title and Subtitle */}
        <VStack space={2} alignItems="center">
          <Text
            fontSize="3xl"
            color="green.600"
            fontWeight="medium"
            textAlign="center"
          >
            Caotic Breath
          </Text>
          <Text
            fontSize="lg"
            color="gray.600"
            textAlign="center"
          >
            Breath up
          </Text>
          <Text
            fontSize="md"
            color="gray.500"
            textAlign="center"
          >
            exersize 13
          </Text>
        </VStack>

        {/* Progress Bar */}
        <VStack w="full" space={2}>
          <Box
            w="full"
            h={1}
            bg="gray.200"
            rounded="full"
            overflow="hidden"
          >
            <Box
              w={`${progress * 100}%`}
              h="full"
              bg="green.500"
            />
          </Box>
          <Box w="full" flexDirection="row" justifyContent="space-between">
            <Text color="gray.500" fontSize="sm">
              {formatTime(currentTime)}
            </Text>
            <Text color="gray.500" fontSize="sm">
              {formatTime(totalTime)}
            </Text>
          </Box>
        </VStack>

        {/* Play Button */}
        <Pressable
          onPress={() => setIsPlaying(!isPlaying)}
          w={20}
          h={20}
          rounded="full"
          bg="green.500"
          shadow={3}
          alignItems="center"
          justifyContent="center"
          _pressed={{
            bg: "green.600",
            transform: [{ scale: 0.98 }]
          }}
        >
          <Icon
            as={MaterialIcons}
            name={isPlaying ? "pause" : "play-arrow"}
            size={12}
            color="white"
          />
        </Pressable>
      </VStack>
    </Box>
  );
}
