import React, { useState } from 'react';
import { Box, Text, VStack, Input, Button, Icon, Pressable, Center, useToast } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '../../context/auth';

export default function Welcome() {
  const [show, setShow] = React.useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const toast = useToast();
  
  const handleSignIn = async () => {
    if (!email || !password) {
      toast.show({
        description: "Please enter both email and password",
        placement: "top"
      });
      return;
    }

    setIsLoading(true);
    try {
      await signIn(email, password);
      // No need to navigate, the index page will handle navigation based on auth state
    } catch (error: any) {
      toast.show({
        description: error.message || "Sign in failed",
        placement: "top"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Center flex={1} bg="white" px="4">
      <VStack space={4} w="100%">
        {/* App Logo */}
        <Box alignItems="center" mb="6">
          <Box 
            bg="blue.500" 
            p="4" 
            rounded="2xl"
            shadow={3}
          >
            <Text fontSize="4xl" color="white" fontWeight="bold">
              MH
            </Text>
          </Box>
          <Text fontSize="2xl" fontWeight="bold" color="darkBlue.900" mt="2">
            Mental Health App
          </Text>
        </Box>

        {/* Email Input */}
        <Input
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="person" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          placeholder="Email"
          size="lg"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* Password Input */}
        <Input
          type={show ? "text" : "password"}
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="lock" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          InputRightElement={
            <Pressable onPress={() => setShow(!show)}>
              <Icon
                as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
                size={5}
                mr="2"
                color="muted.400"
              />
            </Pressable>
          }
          placeholder="Password"
          size="lg"
          value={password}
          onChangeText={setPassword}
        />

        {/* Sign In Button */}
        <Button
          size="lg"
          bg="blue.500"
          _pressed={{ bg: "blue.600" }}
          mt="2"
          onPress={handleSignIn}
          isLoading={isLoading}
        >
          Sign In
        </Button>

        {/* Forgot Password */}
        <Button
          variant="ghost"
          _text={{ color: "blue.500" }}
          onPress={() => router.push('/auth/forgot-password' as any)}
        >
          Forgot Password?
        </Button>

        {/* Create Account Link */}
        <Button
          variant="ghost"
          _text={{ color: "blue.500" }}
          mt="4"
          onPress={() => router.push('/auth/sign-up' as any)}
        >
          Don't have an account? Create here
        </Button>
      </VStack>
    </Center>
  );
}
