import { 
  Box, 
  VStack, 
  Text, 
  Heading, 
  ScrollView, 
  useColorModeValue,
  Pressable,
  HStack,
  Icon,
  Image,
  AspectRatio
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const categories = [
  {
    title: 'Meditation',
    description: 'Find peace and clarity through guided meditation sessions',
    icon: 'self-improvement',
    sessions: 12
  },
  {
    title: 'Breathing',
    description: 'Learn breathing techniques to reduce stress and anxiety',
    icon: 'air',
    sessions: 8
  },
  {
    title: 'Sleep',
    description: 'Improve your sleep quality with calming exercises',
    icon: 'nightlight',
    sessions: 10
  },
  {
    title: 'Mindfulness',
    description: 'Practice mindfulness to stay present and focused',
    icon: 'psychology',
    sessions: 15
  }
];

const featuredSessions = [
  {
    title: 'Morning Calm',
    duration: '10 min',
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1474418397713-7ede21d49118?q=80&w=2053&auto=format&fit=crop'
  },
  {
    title: 'Stress Relief',
    duration: '15 min',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2099&auto=format&fit=crop'
  },
  {
    title: 'Deep Focus',
    duration: '20 min',
    level: 'Advanced',
    image: 'https://images.unsplash.com/photo-1506126279646-a697353d3166?q=80&w=2070&auto=format&fit=crop'
  }
];

export default function ExploreScreen() {
  const bgColor = useColorModeValue('warmGray.50', 'coolGray.800');
  const cardBg = useColorModeValue('white', 'coolGray.700');
  const textColor = useColorModeValue('coolGray.800', 'warmGray.50');
  const mutedColor = useColorModeValue('coolGray.500', 'coolGray.400');

  return (
    <ScrollView bg={bgColor}>
      <VStack space={6} flex={1} p={4}>
        {/* Featured Sessions */}
        <VStack space={4}>
          <Heading size="lg" color={textColor}>Featured Sessions</Heading>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
          >
            <HStack space={4}>
              {featuredSessions.map((session, index) => (
                <Pressable 
                  key={index}
                  onPress={() => {}}
                >
                  <Box 
                    width={280}
                    bg={cardBg}
                    rounded="lg"
                    overflow="hidden"
                    shadow={1}
                  >
                    <AspectRatio ratio={16/9}>
                      <Image
                        source={{ uri: session.image }}
                        alt={session.title}
                        resizeMode="cover"
                      />
                    </AspectRatio>
                    <VStack p={4} space={1}>
                      <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                        {session.title}
                      </Text>
                      <HStack space={2}>
                        <Text fontSize="sm" color={mutedColor}>
                          {session.duration}
                        </Text>
                        <Text fontSize="sm" color={mutedColor}>
                          •
                        </Text>
                        <Text fontSize="sm" color={mutedColor}>
                          {session.level}
                        </Text>
                      </HStack>
                    </VStack>
                  </Box>
                </Pressable>
              ))}
            </HStack>
          </ScrollView>
        </VStack>

        {/* Categories */}
        <VStack space={4}>
          <Heading size="lg" color={textColor}>Categories</Heading>
          <VStack space={3}>
            {categories.map((category, index) => (
              <Pressable 
                key={index}
                onPress={() => {}}
              >
                <Box 
                  bg={cardBg}
                  p={4}
                  rounded="lg"
                  shadow={1}
                  borderWidth={1}
                  borderColor={useColorModeValue('coolGray.200', 'coolGray.700')}
                >
                  <HStack space={4} alignItems="center">
                    <Icon 
                      as={MaterialIcons}
                      name={category.icon}
                      size="lg"
                      color="primary.500"
                    />
                    <VStack flex={1} space={1}>
                      <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                        {category.title}
                      </Text>
                      <Text fontSize="sm" color={mutedColor}>
                        {category.description}
                      </Text>
                      <Text fontSize="sm" color="primary.500">
                        {category.sessions} sessions
                      </Text>
                    </VStack>
                    <Icon 
                      as={MaterialIcons}
                      name="chevron-right"
                      size="sm"
                      color={mutedColor}
                    />
                  </HStack>
                </Box>
              </Pressable>
            ))}
          </VStack>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
