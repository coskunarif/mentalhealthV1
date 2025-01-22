import { useState } from 'react';
import { View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { YStack, Button, Input, Text, XStack } from 'tamagui';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../config/firebase';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailSignIn = async () => {
    try {
      setError('');
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/tabs');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.replace('/tabs');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title: 'Sign In' }} />
      
      <YStack padding="$4" space="$4" flex={1}>
        <Text fontSize="$8" fontWeight="bold">Welcome Back</Text>
        
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
          onPress={handleEmailSignIn}
          marginTop="$4"
        >
          Sign In
        </Button>
        
        <Button
          theme="gray"
          onPress={handleGoogleSignIn}
          marginTop="$2"
        >
          Sign in with Google
        </Button>
        
        <XStack justifyContent="center" marginTop="$4">
          <Text>Don't have an account? </Text>
          <Text
            color="$blue10"
            onPress={() => router.push('/auth/sign-up')}
          >
            Sign Up
          </Text>
        </XStack>
      </YStack>
    </View>
  );
}
