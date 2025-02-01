import { useState } from 'react';
import { View, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, Surface, TextInput, Button, useTheme, HelperText } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  const handleSignIn = async () => {
    if (loading) return;
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/');
    } catch (err) {
      setError('Invalid email or password');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Surface style={{ flex: 1, backgroundColor: theme.colors.primaryContainer }}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={{ 
            flexGrow: 1,
            justifyContent: 'center',
            padding: 16
          }}
        >
          <View style={{ 
            width: '100%',
            maxWidth: 400,
            alignSelf: 'center',
            alignItems: 'center',
            gap: 24
          }}>
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
              variant="headlineMedium"
              style={{
                color: theme.colors.onBackground,
                fontWeight: 'bold'
              }}
            >
              Welcome Back
            </Text>

            <View style={{ width: '100%', gap: 16 }}>
              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                mode="outlined"
                error={!!error}
                style={{ backgroundColor: theme.colors.background }}
              />

              <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                mode="outlined"
                error={!!error}
                style={{ backgroundColor: theme.colors.background }}
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
              />

              <HelperText type="error" visible={!!error}>
                {error}
              </HelperText>

              <Button
                mode="contained"
                onPress={handleSignIn}
                loading={loading}
                disabled={loading}
                contentStyle={{ height: 48 }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>

              <Button
                mode="text"
                onPress={() => router.push('/auth/sign-up')}
                style={{ marginTop: 8 }}
              >
                Don't have an account? Sign Up
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Surface>
  );
}
