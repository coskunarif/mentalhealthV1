import React, { useState } from 'react';
import { Box, VStack, Text, Pressable, Progress, Center, Button, HStack } from 'native-base';
import { useRouter } from 'expo-router';

const questions = [
  {
    id: 0,
    text: 'How do you typically feel or react when you sense danger or a threat?',
    options: [
      'I feel a strong urge to or escape the situation',
      'I become paralyzed with fear',
      'I remain calm and analytical',
      'I feel overwhelmed and someone make decisions for me',
    ],
  },
  {
    id: 1,
    text: 'Which definition describes you better',
    options: [
      'Option 1',
      'Option 2',
      'Option 3',
      'Option 4',
    ],
  },
  // Add more questions as needed
];

export default function SurveyScreen() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});

  const handleSelect = (questionId: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      router.replace('/tabs/home');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Box flex={1} bg="white" safeArea p={4}>
      {/* Progress Bar */}
      <Progress
        value={progress}
        mb={8}
        bg="coolGray.100"
        _filledTrack={{
          bg: "green.500"
        }}
      />

      {/* Question */}
      <Text
        fontSize="xl"
        color="green.600"
        textAlign="center"
        mb={8}
        fontWeight="medium"
      >
        {questions[currentQuestion].text}
      </Text>

      {/* Options */}
      <VStack space={4} flex={1}>
        {questions[currentQuestion].options.map((option, index) => (
          <Pressable
            key={index}
            onPress={() => handleSelect(currentQuestion, index)}
          >
            <Box
              bg={selectedAnswers[currentQuestion] === index ? 'green.100' : 'coolGray.100'}
              p={4}
              rounded="lg"
              borderWidth={selectedAnswers[currentQuestion] === index ? 1 : 0}
              borderColor="green.500"
            >
              <Text
                color={selectedAnswers[currentQuestion] === index ? 'green.700' : 'coolGray.700'}
                fontSize="md"
              >
                {option}
              </Text>
            </Box>
          </Pressable>
        ))}
      </VStack>

      {/* Navigation Buttons */}
      <HStack space={4} justifyContent="space-between" mt={6}>
        <Button
          flex={1}
          variant="ghost"
          colorScheme="green"
          onPress={handlePrevious}
          isDisabled={currentQuestion === 0}
        >
          Previous
        </Button>
        <Button
          flex={1}
          colorScheme="green"
          onPress={handleNext}
          isDisabled={selectedAnswers[currentQuestion] === undefined}
        >
          {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </HStack>

      {/* Navigation Dots */}
      <Center mt={4} flexDir="row">
        {questions.map((_, index) => (
          <Box
            key={index}
            w={2}
            h={2}
            rounded="full"
            bg={index === currentQuestion ? 'green.500' : 'coolGray.200'}
            mx={1}
          />
        ))}
      </Center>
    </Box>
  );
}
