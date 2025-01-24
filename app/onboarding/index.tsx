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
  IconButton,
  Icon,
  Progress,
  Flex,
  Pressable
} from 'native-base';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useOnboardingStore } from '../../store/onboarding';

const options = [
  "Almost never",
  "Rarely",
  "Sometimes",
  "Usually",
  "Almost always"
];

const questions = [
  "How often do you feel stressed?",
  "How often do you practice mindfulness?",
  "How often do you exercise?",
  "How often do you feel anxious?",
  "How often do you meditate?"
];

export default function OnboardingScreen() {
  const router = useRouter();
  const setOnboardingComplete = useOnboardingStore(
    (state) => state.setOnboardingComplete
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);

  const bgColor = useColorModeValue('warmGray.50', 'coolGray.800');
  const textColor = useColorModeValue('coolGray.800', 'warmGray.50');
  const cardBg = useColorModeValue('white', 'coolGray.700');

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = selectedOption;
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption('');
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setSelectedOption(answers[currentStep - 1] || '');
    }
  };

  const handleComplete = () => {
    setOnboardingComplete(true);
    router.push('/');
  };

  return (
    <Box flex={1} bg={bgColor} safeArea>
      <VStack space={6} flex={1} px={4} py={6}>
        <Flex direction="row" justify="space-between" align="center">
          <IconButton
            icon={<Icon as={MaterialIcons} name="arrow-back" size="md" />}
            onPress={handleBack}
            variant="ghost"
            isDisabled={currentStep === 0}
            _icon={{
              color: textColor,
              _dark: { color: 'warmGray.50' }
            }}
          />
          <Pressable onPress={() => router.push('/')}>
            <Text color="primary.500" fontWeight="medium">
              Skip
            </Text>
          </Pressable>
        </Flex>

        <VStack space={4} flex={1}>
          <Progress
            value={(currentStep + 1) * (100 / questions.length)}
            size="sm"
            colorScheme="primary"
            bg="coolGray.200"
            _dark={{ bg: 'coolGray.600' }}
          />

          <Heading
            size="lg"
            color={textColor}
            _dark={{ color: 'warmGray.50' }}
          >
            {questions[currentStep]}
          </Heading>

          <Radio.Group
            name="options"
            value={selectedOption}
            onChange={value => setSelectedOption(value)}
          >
            <VStack space={3}>
              {options.map((option) => (
                <Pressable
                  key={option}
                  onPress={() => setSelectedOption(option)}
                >
                  <Box
                    bg={cardBg}
                    p={4}
                    rounded="lg"
                    borderWidth={1}
                    borderColor={selectedOption === option ? 'primary.500' : 'coolGray.200'}
                    _dark={{
                      borderColor: selectedOption === option ? 'primary.500' : 'coolGray.600'
                    }}
                  >
                    <Radio
                      value={option}
                      size="sm"
                      colorScheme="primary"
                      _text={{
                        fontSize: 'md',
                        color: textColor,
                        _dark: { color: 'warmGray.50' }
                      }}
                    >
                      {option}
                    </Radio>
                  </Box>
                </Pressable>
              ))}
            </VStack>
          </Radio.Group>
        </VStack>

        <Button
          size="lg"
          onPress={handleNext}
          isDisabled={!selectedOption}
          _text={{ fontSize: 'md' }}
        >
          {currentStep === questions.length - 1 ? 'Complete' : 'Next'}
        </Button>
      </VStack>
    </Box>
  );
}
