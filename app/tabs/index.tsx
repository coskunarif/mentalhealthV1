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
  Progress,
  Avatar
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../../context/auth';

export default function HomeScreen() {
  const { user } = useAuth();
  
  const bgColor = useColorModeValue('warmGray.50', 'coolGray.800');
  const cardBg = useColorModeValue('white', 'coolGray.700');
  const textColor = useColorModeValue('coolGray.800', 'warmGray.50');
  const mutedColor = useColorModeValue('coolGray.500', 'coolGray.400');

  const todayStats = {
    mindfulMinutes: 15,
    moodScore: 8,
    stressLevel: 3,
    completedTasks: 2,
  };

  const upcomingActivities = [
    {
      title: 'Morning Meditation',
      time: '8:00 AM',
      duration: '15 min',
      icon: 'self-improvement'
    },
    {
      title: 'Breathing Exercise',
      time: '12:00 PM',
      duration: '10 min',
      icon: 'air'
    },
    {
      title: 'Evening Reflection',
      time: '8:00 PM',
      duration: '10 min',
      icon: 'nightlight'
    }
  ];

  return (
    <ScrollView bg={bgColor}>
      <VStack space={6} flex={1} p={4}>
        {/* Header */}
        <HStack space={4} alignItems="center">
          <Avatar 
            size="md"
            source={{ uri: user?.photoURL || undefined }}
            fallbackText={user?.email?.[0].toUpperCase()}
            bg="primary.500"
          />
          <VStack>
            <Text fontSize="lg" fontWeight="semibold" color={textColor}>
              Welcome back
            </Text>
            <Text fontSize="sm" color={mutedColor}>
              {user?.email}
            </Text>
          </VStack>
        </HStack>

        {/* Today's Progress */}
        <Box bg={cardBg} p={4} rounded="lg" shadow={1}>
          <VStack space={4}>
            <Heading size="sm" color={textColor}>Today's Progress</Heading>
            
            <VStack space={3}>
              <VStack>
                <HStack justifyContent="space-between">
                  <Text fontSize="sm" color={mutedColor}>Mindful Minutes</Text>
                  <Text fontSize="sm" color={textColor}>{todayStats.mindfulMinutes} min</Text>
                </HStack>
                <Progress 
                  value={todayStats.mindfulMinutes} 
                  max={30}
                  size="xs" 
                  colorScheme="primary"
                />
              </VStack>

              <VStack>
                <HStack justifyContent="space-between">
                  <Text fontSize="sm" color={mutedColor}>Mood Score</Text>
                  <Text fontSize="sm" color={textColor}>{todayStats.moodScore}/10</Text>
                </HStack>
                <Progress 
                  value={todayStats.moodScore} 
                  max={10}
                  size="xs" 
                  colorScheme="emerald"
                />
              </VStack>

              <VStack>
                <HStack justifyContent="space-between">
                  <Text fontSize="sm" color={mutedColor}>Stress Level</Text>
                  <Text fontSize="sm" color={textColor}>{todayStats.stressLevel}/10</Text>
                </HStack>
                <Progress 
                  value={todayStats.stressLevel} 
                  max={10}
                  size="xs" 
                  colorScheme="orange"
                />
              </VStack>
            </VStack>
          </VStack>
        </Box>

        {/* Upcoming Activities */}
        <VStack space={4}>
          <Heading size="sm" color={textColor}>Upcoming Activities</Heading>
          
          <VStack space={3}>
            {upcomingActivities.map((activity, index) => (
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
                      name={activity.icon}
                      size="md"
                      color="primary.500"
                    />
                    <VStack flex={1}>
                      <Text fontSize="md" fontWeight="medium" color={textColor}>
                        {activity.title}
                      </Text>
                      <HStack space={2}>
                        <Text fontSize="sm" color={mutedColor}>
                          {activity.time}
                        </Text>
                        <Text fontSize="sm" color={mutedColor}>
                          •
                        </Text>
                        <Text fontSize="sm" color={mutedColor}>
                          {activity.duration}
                        </Text>
                      </HStack>
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
