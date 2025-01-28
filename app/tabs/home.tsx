import React from 'react';
import { Box, VStack, Text, HStack, Pressable, Icon, ScrollView } from 'native-base';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Svg, { Polygon } from 'react-native-svg';

const radarPoints = [
  { label: 'Balance past\nmemories', value: 0.8 },
  { label: 'Change your\nopinion', value: 0.6 },
  { label: 'Support dreams', value: 0.7 },
  { label: 'Gain awareness', value: 0.9 },
  { label: 'Breath\nup', value: 0.75 },
];

const recentPlayed = [
  { title: 'Breath up', subtitle: 'Breath exercise 12', duration: '18.5 min' },
  { title: 'Support your dreams', subtitle: 'Dreams exercise 5', duration: '14.5 min' },
  { title: 'Gain awarenes', subtitle: 'Awareness exercise 8', duration: '23.5 min' },
  { title: 'Breath up', subtitle: 'Breath exercise 7', duration: '19.5 min' },
];

export default function HomePage() {
  const router = useRouter();
  const screenWidth = Dimensions.get('window').width;
  const centerX = 150;
  const centerY = 150;
  const radius = 100;

  // Calculate radar chart points
  const getPolygonPoints = () => {
    return radarPoints
      .map((point, index) => {
        const angle = (index / radarPoints.length) * 2 * Math.PI - Math.PI / 2;
        const x = centerX + radius * point.value * Math.cos(angle);
        const y = centerY + radius * point.value * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(' ');
  };

  return (
    <ScrollView bg="white" flex={1}>
      <VStack space={6} p={4}>
        {/* Week Header */}
        <Text fontSize="2xl" color="green.600" fontWeight="medium">
          Week 1
        </Text>

        {/* Radar Chart */}
        <Box h="300" alignItems="center" justifyContent="center">
          <Svg height="300" width="300">
            <Polygon
              points={getPolygonPoints()}
              fill="rgba(255, 223, 0, 0.3)"
              stroke="green"
              strokeWidth="2"
            />
          </Svg>
          {radarPoints.map((point, index) => (
            <Text
              key={index}
              position="absolute"
              fontSize="xs"
              color="green.600"
              textAlign="center"
              style={{
                top: centerY + radius * 1.2 * Math.sin((index / radarPoints.length) * 2 * Math.PI - Math.PI / 2),
                left: centerX + radius * 1.2 * Math.cos((index / radarPoints.length) * 2 * Math.PI - Math.PI / 2),
              }}
            >
              {point.label}
            </Text>
          ))}
        </Box>

        {/* Day Progress */}
        <HStack space={2} justifyContent="center">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <Box
              key={day}
              w="40px"
              h="40px"
              rounded="full"
              borderWidth={1}
              borderColor="green.500"
              alignItems="center"
              justifyContent="center"
            >
              <Text color="green.600" fontSize="xs">
                Day {day}
              </Text>
            </Box>
          ))}
        </HStack>

        {/* Next Session */}
        <Pressable
          bg="green.500"
          rounded="full"
          p={4}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          onPress={() => router.push('/player')}
        >
          <VStack>
            <Text color="white" fontSize="sm">
              Next session
            </Text>
            <Text color="white" fontSize="lg" fontWeight="bold">
              Exotic Breath
            </Text>
          </VStack>
          <Icon as={MaterialIcons} name="play-circle-filled" size="xl" color="white" />
        </Pressable>

        {/* Action Buttons */}
        <HStack space={4}>
          <Pressable
            flex={1}
            bg="green.500"
            rounded="lg"
            p={4}
            alignItems="center"
            onPress={() => router.push('/mood')}
          >
            <Icon as={MaterialCommunityIcons} name="emoticon-outline" size="xl" color="white" mb={2} />
            <Text color="white" textAlign="center">
              Talk about{'\n'}your mood
            </Text>
          </Pressable>
          <Pressable
            flex={1}
            bg="green.500"
            rounded="lg"
            p={4}
            alignItems="center"
            onPress={() => router.push('/survey')}
          >
            <Icon as={MaterialIcons} name="person-outline" size="xl" color="white" mb={2} />
            <Text color="white" textAlign="center">
              Keep introducing{'\n'}yourself
            </Text>
          </Pressable>
        </HStack>

        {/* Recent Played */}
        <VStack space={4}>
          <Text fontSize="lg" color="green.600" fontWeight="medium">
            Recent Played
          </Text>
          {recentPlayed.map((item, index) => (
            <HStack key={index} justifyContent="space-between" alignItems="center">
              <VStack>
                <Text fontSize="md" color="green.600">
                  {item.title}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {item.subtitle}
                </Text>
              </VStack>
              <Text fontSize="sm" color="gray.500">
                {item.duration}
              </Text>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </ScrollView>
  );
}
