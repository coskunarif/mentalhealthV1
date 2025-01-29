import { View } from 'react-native';
import { Button, Text, Surface, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Surface style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        <View style={{ alignItems: 'center', gap: 24 }}>
          <Text 
            variant="headlineLarge" 
            style={{ 
              textAlign: 'center',
              color: theme.colors.primary,
              fontWeight: 'bold'
            }}
          >
            Welcome to Mental Health
          </Text>
          <Text
            variant="bodyLarge"
            style={{
              textAlign: 'center',
              color: theme.colors.onSurfaceVariant,
              paddingHorizontal: 24
            }}
          >
            Calm yourself for your mental health{'\n'}and also your mind from the problems{'\n'}that exist in this world
          </Text>
          <Button
            mode="contained"
            onPress={() => router.push('/survey')}
            style={{
              borderRadius: 28,
              paddingHorizontal: 32
            }}
            contentStyle={{
              height: 56
            }}
          >
            Get Started
          </Button>
        </View>
      </View>
    </Surface>
  );
}
