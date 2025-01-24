import { useState } from 'react';
import { 
  Box, 
  VStack, 
  Text, 
  Radio, 
  Button, 
  Center, 
  useColorModeValue,
  Heading,
  ScrollView
} from 'native-base';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/auth';

const experienceLevels = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert'
];

const stressLevels = [
  'Low',
  'Medium',
  'High'
];

export default function Onboarding() {
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedStressLevel, setSelectedStressLevel] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  const bgColor = useColorModeValue('warmGray.50', 'coolGray.800');
  const textColor = useColorModeValue('coolGray.800', 'warmGray.50');
  const cardBg = useColorModeValue('white', 'coolGray.700');

  const handleComplete = async () => {
    if (loading) return;
    setLoading(true);

    try {
      setError('');
      // Save user preferences here
      router.replace('/tabs');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView bg={bgColor}>
      <Center flex={1} px="4" py="12">
        <Box w="100%" maxW="400">
          <VStack space={8}>
            <VStack space={2} alignItems="center">
              <Heading
                size="xl"
                color={textColor}
                _dark={{ color: 'warmGray.50' }}
              >
                Let's Get Started
              </Heading>
              <Text
                fontSize="md"
                color="coolGray.500"
                textAlign="center"
                _dark={{ color: 'coolGray.300' }}
              >
                Tell us a bit about yourself so we can personalize your experience
              </Text>
            </VStack>

            <VStack space={6}>
              <VStack space={4}>
                <Text
                  fontSize="lg"
                  fontWeight="semibold"
                  color={textColor}
                  _dark={{ color: 'warmGray.50' }}
                >
                  What's your meditation experience level?
                </Text>
                <Radio.Group
                  name="experienceLevel"
                  value={selectedLevel}
                  onChange={value => setSelectedLevel(value)}
                >
                  <VStack space={3}>
                    {experienceLevels.map((level) => (
                      <Box
                        key={level}
                        bg={cardBg}
                        p="4"
                        rounded="lg"
                        borderWidth="1"
                        borderColor={selectedLevel === level ? 'primary.500' : 'coolGray.200'}
                        _dark={{
                          borderColor: selectedLevel === level ? 'primary.500' : 'coolGray.600'
                        }}
                      >
                        <Radio
                          value={level}
                          size="sm"
                          colorScheme="primary"
                          _text={{
                            fontSize: 'md',
                            color: textColor,
                            _dark: { color: 'warmGray.50' }
                          }}
                        >
                          {level}
                        </Radio>
                      </Box>
                    ))}
                  </VStack>
                </Radio.Group>
              </VStack>

              <VStack space={4}>
                <Text
                  fontSize="lg"
                  fontWeight="semibold"
                  color={textColor}
                  _dark={{ color: 'warmGray.50' }}
                >
                  What's your current stress level?
                </Text>
                <Radio.Group
                  name="stressLevel"
                  value={selectedStressLevel}
                  onChange={value => setSelectedStressLevel(value)}
                >
                  <VStack space={3}>
                    {stressLevels.map((level) => (
                      <Box
                        key={level}
                        bg={cardBg}
                        p="4"
                        rounded="lg"
                        borderWidth="1"
                        borderColor={selectedStressLevel === level ? 'primary.500' : 'coolGray.200'}
                        _dark={{
                          borderColor: selectedStressLevel === level ? 'primary.500' : 'coolGray.600'
                        }}
                      >
                        <Radio
                          value={level}
                          size="sm"
                          colorScheme="primary"
                          _text={{
                            fontSize: 'md',
                            color: textColor,
                            _dark: { color: 'warmGray.50' }
                          }}
                        >
                          {level}
                        </Radio>
                      </Box>
                    ))}
                  </VStack>
                </Radio.Group>
              </VStack>
            </VStack>

            {error ? <Text color="red.500" mb="4">{error}</Text> : null}

            <Button
              size="lg"
              onPress={handleComplete}
              isLoading={loading}
              isLoadingText="Saving"
              isDisabled={!selectedLevel || !selectedStressLevel}
              _loading={{
                bg: 'primary.600',
              }}
            >
              Complete Setup
            </Button>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
}
