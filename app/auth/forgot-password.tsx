import React from 'react';
import { Box, Text, VStack, Input, Button, Icon, Center } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function ForgotPassword() {
  return (
    <Center flex={1} bg="white" px="4">
      <VStack space={4} w="100%">
        <Box alignItems="center" mb="6">
          <Text fontSize="2xl" fontWeight="bold" color="darkBlue.900">
            Reset Password
          </Text>
          <Text fontSize="sm" color="muted.500" textAlign="center" mt="2">
            Enter your email address and we'll send you instructions to reset your password.
          </Text>
        </Box>

        {/* Email Input */}
        <Input
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="email" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          placeholder="Email"
          size="lg"
        />

        {/* Reset Password Button */}
        <Button
          size="lg"
          bg="blue.500"
          _pressed={{ bg: "blue.600" }}
          mt="2"
        >
          Send Reset Instructions
        </Button>

        {/* Back to Login */}
        <Button
          variant="ghost"
          _text={{ color: "blue.500" }}
          onPress={() => router.back()}
        >
          Back to Login
        </Button>
      </VStack>
    </Center>
  );
}
