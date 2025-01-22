import { useState } from 'react';
import { View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { YStack, Button, Text, XStack, Select } from 'tamagui';
import { useOnboardingStore } from '../../store/onboarding';

export default function OnboardingScreen() {
  const router = useRouter();
  const setOnboardingComplete = useOnboardingStore(
    (state) => state.setOnboardingComplete
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [meditationLevel, setMeditationLevel] = useState('');
  const [stressLevel, setStressLevel] = useState('');

  const steps = [
    {
      title: 'Welcome to Mental Health App',
      description: 'Let\'s get to know you better to personalize your experience.',
      isLastStep: false,
    },
    {
      title: 'Your Meditation Experience',
      description: 'How familiar are you with meditation?',
      isLastStep: false,
    },
    {
      title: 'Current Stress Level',
      description: 'How would you describe your current stress level?',
      isLastStep: true,
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save onboarding data and redirect to main app
      setOnboardingComplete(meditationLevel, stressLevel);
      router.replace('/');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <YStack space="$4">
            <Text fontSize="$6" textAlign="center">
              We'll help you manage stress and anxiety through guided meditation and mindfulness exercises.
            </Text>
          </YStack>
        );
      case 1:
        return (
          <YStack space="$4">
            <Select
              value={meditationLevel}
              onValueChange={setMeditationLevel}
              placeholder="Select your experience level"
            >
              <Select.Item label="Beginner - Never meditated" value="beginner" />
              <Select.Item label="Intermediate - Some experience" value="intermediate" />
              <Select.Item label="Advanced - Regular practice" value="advanced" />
            </Select>
          </YStack>
        );
      case 2:
        return (
          <YStack space="$4">
            <Select
              value={stressLevel}
              onValueChange={setStressLevel}
              placeholder="Select your stress level"
            >
              <Select.Item label="Low - Feeling calm" value="low" />
              <Select.Item label="Medium - Some stress" value="medium" />
              <Select.Item label="High - Very stressed" value="high" />
            </Select>
          </YStack>
        );
      default:
        return null;
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Stack.Screen 
        options={{ 
          headerShown: false,
        }} 
      />
      
      <YStack 
        flex={1} 
        padding="$4" 
        space="$4"
        justifyContent="space-between"
      >
        <YStack space="$4" paddingTop="$8">
          <Text 
            fontSize="$8" 
            fontWeight="bold"
            textAlign="center"
          >
            {currentStepData.title}
          </Text>
          
          <Text 
            fontSize="$4" 
            color="$gray11"
            textAlign="center"
          >
            {currentStepData.description}
          </Text>

          {renderStepContent()}
        </YStack>

        <YStack space="$4" paddingBottom="$4">
          <Button
            theme="active"
            size="$4"
            onPress={handleNext}
            disabled={
              (currentStep === 1 && !meditationLevel) ||
              (currentStep === 2 && !stressLevel)
            }
          >
            {currentStepData.isLastStep ? 'Get Started' : 'Continue'}
          </Button>
        </YStack>
      </YStack>
    </View>
  );
}
