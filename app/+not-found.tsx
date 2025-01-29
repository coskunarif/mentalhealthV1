import { View, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';
import { Text, Surface, TouchableRipple, useTheme } from 'react-native-paper';

export default function NotFoundScreen() {
  const theme = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.content}>
          <Text
            variant="headlineSmall"
            style={[
              styles.title,
              { color: theme.colors.onSurface }
            ]}
          >
            This screen doesn't exist.
          </Text>
          <Link href="/" asChild>
            <TouchableRipple>
              <Text
                variant="labelLarge"
                style={{ color: theme.colors.primary }}
              >
                Go to home screen!
              </Text>
            </TouchableRipple>
          </Link>
        </View>
      </Surface>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 16,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
