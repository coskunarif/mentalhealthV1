import { useState } from 'react';
import { View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { YStack, Button, Input, Text, XStack } from 'tamagui';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      setError('');
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace('/auth/onboarding');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title: 'Sign Up' }} />
      
      <YStack padding="$4" space="$4" flex={1}>
        <Text fontSize="$8" fontWeight="bold">Create Account</Text>
        
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        {error ? <Text color="$red10">{error}</Text> : null}
        
        <Button
          theme="active"
          onPress={handleSignUp}
          marginTop="$4"
        >
          Sign Up
        </Button>
        
        <XStack justifyContent="center" marginTop="$4">
          <Text>Already have an account? </Text>
          <Text
            color="$blue10"
            onPress={() => router.push('/auth/sign-in')}
          >
            Sign In
          </Text>
        </XStack>
      </YStack>
    </View>
  );
}
