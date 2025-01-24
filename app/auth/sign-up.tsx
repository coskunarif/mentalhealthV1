import { useState } from 'react';
import { Image } from 'react-native';
import { 
  Box, 
  VStack, 
  Input, 
  Button, 
  Text, 
  Center, 
  useColorModeValue,
  Pressable,
  Icon,
  FormControl
} from 'native-base';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { MaterialIcons } from '@expo/vector-icons';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const bgColor = useColorModeValue('warmGray.50', 'coolGray.800');
  const textColor = useColorModeValue('coolGray.800', 'warmGray.50');
  const inputBg = useColorModeValue('white', 'coolGray.700');

  const handleSignUp = async () => {
    if (loading) return;
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace('/onboarding');
    } catch (err) {
      setError('Failed to create account');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center flex={1} bg={bgColor} px="4">
      <Box safeArea w="100%" maxW="400">
        <VStack space={4} alignItems="center">
          <Image
            source={require('../../assets/images/adaptive-icon.png')}
            style={{
              width: 80,
              height: 80,
              marginBottom: 20,
              resizeMode: 'contain',
            }}
          />
          
          <Text
            fontSize="3xl"
            fontWeight="bold"
            color={textColor}
            _dark={{ color: 'warmGray.50' }}
          >
            Create Account
          </Text>

          <FormControl isInvalid={!!error}>
            <VStack space={4} w="100%">
              <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                size="lg"
                bg={inputBg}
                _focus={{
                  borderColor: 'primary.500',
                  bg: inputBg,
                }}
              />

              <Input
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                type={showPassword ? 'text' : 'password'}
                size="lg"
                bg={inputBg}
                _focus={{
                  borderColor: 'primary.500',
                  bg: inputBg,
                }}
                InputRightElement={
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <Icon
                      as={MaterialIcons}
                      name={showPassword ? 'visibility' : 'visibility-off'}
                      size={5}
                      mr="2"
                      color="muted.400"
                    />
                  </Pressable>
                }
              />

              <Input
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                type={showConfirmPassword ? 'text' : 'password'}
                size="lg"
                bg={inputBg}
                _focus={{
                  borderColor: 'primary.500',
                  bg: inputBg,
                }}
                InputRightElement={
                  <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Icon
                      as={MaterialIcons}
                      name={showConfirmPassword ? 'visibility' : 'visibility-off'}
                      size={5}
                      mr="2"
                      color="muted.400"
                    />
                  </Pressable>
                }
              />

              {error && (
                <Text color="error.500" fontSize="sm">
                  {error}
                </Text>
              )}

              <Button
                size="lg"
                onPress={handleSignUp}
                isLoading={loading}
                isLoadingText="Creating Account"
                _loading={{
                  bg: 'primary.600',
                }}
              >
                Sign Up
              </Button>

              <Button
                variant="ghost"
                onPress={() => router.push('/auth/sign-in')}
              >
                Already have an account? Sign In
              </Button>
            </VStack>
          </FormControl>
        </VStack>
      </Box>
    </Center>
  );
}
