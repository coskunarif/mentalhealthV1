import { View, StyleSheet } from 'react-native';
import { Text, Surface, Button, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { globalStyles } from './config/styles';

export default function Page() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text
            variant="displaySmall"
            style={[
              styles.title,
              globalStyles.textBold,
              { color: theme.colors.primary }
            ]}
          >
            Welcome to Mental Health
          </Text>
          <Text
            variant="bodyLarge"
            style={[
              styles.subtitle,
              globalStyles.text,
              { color: theme.colors.onSurfaceVariant }
            ]}
          >
            Calm yourself for your mental health{'\n'}and also your mind from the problems{'\n'}that exist in this world
          </Text>
          <Button
            mode="contained"
            onPress={() => router.push('/survey')}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Get Started
          </Button>
        </View>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    gap: 24,
    paddingHorizontal: 24,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  button: {
    borderRadius: 28,
    marginTop: 8,
  },
  buttonContent: {
    height: 48,
    paddingHorizontal: 32,
  },
});
