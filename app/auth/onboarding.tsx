import { useState } from 'react';
import { View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { YStack, Button, Text, XStack, Select } from 'tamagui';
import { useAuth } from '../../context/auth';

export default function Onboarding() {
  const router = useRouter();
  const { user } = useAuth();
  const [meditationLevel, setMeditationLevel] = useState('');
  const [stressLevel, setStressLevel] = useState('');
  const [error, setError] = useState('');

  const handleComplete = async () => {
    try {
      setError('');
      // Here you would typically save the user preferences to your database
      // For now, we'll just redirect to the main app
      router.replace('/tabs');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ 
        title: 'Welcome',
        headerBackVisible: false 
      }} />
      
      <YStack padding="$4" space="$4" flex={1}>
        <Text fontSize="$8" fontWeight="bold">Let's Get Started</Text>
        <Text>Tell us a bit about yourself so we can personalize your experience.</Text>
        
        <Select
          value={meditationLevel}
          onValueChange={setMeditationLevel}
          placeholder="Select your meditation experience"
        >
          <Select.Item label="Beginner" value="beginner" />
          <Select.Item label="Intermediate" value="intermediate" />
          <Select.Item label="Advanced" value="advanced" />
        </Select>
        
        <Select
          value={stressLevel}
          onValueChange={setStressLevel}
          placeholder="What's your current stress level?"
        >
          <Select.Item label="Low" value="low" />
          <Select.Item label="Medium" value="medium" />
          <Select.Item label="High" value="high" />
        </Select>
        
        {error ? <Text color="$red10">{error}</Text> : null}
        
        <Button
          theme="active"
          onPress={handleComplete}
          marginTop="$4"
          disabled={!meditationLevel || !stressLevel}
        >
          Complete Setup
        </Button>
      </YStack>
    </View>
  );
}
