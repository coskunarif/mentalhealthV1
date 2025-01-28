import { useState } from 'react';
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
  FormControl,
  useToast
} from 'native-base';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../../context/auth';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toast = useToast();
  const { signUp } = useAuth();

  const bgColor = useColorModeValue('warmGray.50', 'coolGray.800');
  const textColor = useColorModeValue('coolGray.800', 'warmGray.50');
  const inputBg = useColorModeValue('white', 'coolGray.700');

  const handleSignUp = async () => {
    if (loading) return;
    if (password !== confirmPassword) {
      toast.show({
        description: 'Passwords do not match',
        placement: 'top'
      });
      return;
    }

    if (!email || !password) {
      toast.show({
        description: 'Please fill in all fields',
        placement: 'top'
      });
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password);
      // The index page will handle navigation
    } catch (error: any) {
      toast.show({
        description: error.message || 'Failed to create account',
        placement: 'top'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center flex={1} bg={bgColor}>
      <Box w="90%" maxW="290" py="8">
        <VStack space={3}>
          <Text fontSize="2xl" fontWeight="bold" color={textColor}>
            Create Account
          </Text>
          
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              bg={inputBg}
              placeholder="Enter your email"
              size="lg"
              value={email}
              onChangeText={setEmail}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="person" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </FormControl>

          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              bg={inputBg}
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              size="lg"
              value={password}
              onChangeText={setPassword}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="lock" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              InputRightElement={
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Icon
                    as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />}
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              }
            />
          </FormControl>

          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input
              bg={inputBg}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              size="lg"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="lock" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              InputRightElement={
                <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Icon
                    as={<MaterialIcons name={showConfirmPassword ? "visibility" : "visibility-off"} />}
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              }
            />
          </FormControl>

          <Button
            mt="2"
            size="lg"
            bg="blue.500"
            _pressed={{ bg: "blue.600" }}
            onPress={handleSignUp}
            isLoading={loading}
          >
            Sign Up
          </Button>

          <Button
            variant="ghost"
            _text={{ color: "blue.500" }}
            onPress={() => router.back()}
          >
            Already have an account? Sign In
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
