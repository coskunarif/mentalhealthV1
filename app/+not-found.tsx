import { Link, Stack } from 'expo-router';
import { Box, Text, Pressable } from 'native-base';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Box flex={1} alignItems="center" justifyContent="center" p={4}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          This screen doesn't exist.
        </Text>
        <Link href="/" asChild>
          <Pressable>
            <Text color="primary.500" fontSize="md">
              Go to home screen!
            </Text>
          </Pressable>
        </Link>
      </Box>
    </>
  );
}
