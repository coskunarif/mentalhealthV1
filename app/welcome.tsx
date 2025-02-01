import { View, StyleSheet } from 'react-native';
import { Text, Surface, Button, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { globalStyles } from './config/styles';

export default function Page() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.primaryContainer }]}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text
            variant="displaySmall"
            style={[
              globalStyles.heading3,
              styles.title,
              { color: theme.colors.primary }
            ]}
          >
            Welcome to Mental Health
          </Text>
          <Text
            variant="bodyLarge"
            style={[
              globalStyles.bodyLarge,
              styles.subtitle,
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
            labelStyle={globalStyles.labelLarge}
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
    padding: 24,
  },
  textContainer: {
    alignItems: 'center',
    gap: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    width: '100%',
    maxWidth: 280,
  },
  buttonContent: {
    height: 48,
  },
});
