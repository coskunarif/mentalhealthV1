import { Box, Button, Text, VStack } from 'native-base';
import { useRouter } from 'expo-router';

export default function Page() {
  const router = useRouter();

  return (
    <Box flex={1} bg="white" safeArea>
      <Box flex={1} justifyContent="center" alignItems="center">
        <VStack space={6} alignItems="center">
          <Text
            fontSize="4xl"
            fontWeight="bold"
            textAlign="center"
            color="primary.500"
          >
            Welcome to Mental Health
          </Text>
          <Text
            fontSize="md"
            textAlign="center"
            color="coolGray.600"
            px={6}
          >
            Calm yourself for your mental health{'\n'}and also your mind from the problems{'\n'}that exist in this world
          </Text>
          <Button
            size="lg"
            onPress={() => router.push('/survey')}
            bg="primary.500"
            _pressed={{ bg: 'primary.600' }}
            rounded="full"
            px={8}
          >
            Get Started
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
