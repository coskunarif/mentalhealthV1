import { useState } from 'react';
import { View, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, Surface, TextInput, Button, useTheme, HelperText } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { globalStyles } from '../config/styles';

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
    <Surface style={globalStyles.authContainer}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={globalStyles.fill}
      >
        <ScrollView 
          contentContainerStyle={[
            globalStyles.authContent,
            globalStyles.centerContent
          ]}
        >
          <View style={[globalStyles.authLogoContainer, { maxWidth: 400 }]}>
            <Image
              source={require('../../assets/images/adaptive-icon.png')}
              style={globalStyles.authAppIcon}
            />
            
            <Text style={globalStyles.authHeading}>
              Welcome Back
            </Text>
          </View>

          <View style={globalStyles.authFormContainer}>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              mode="outlined"
              error={!!error}
              style={globalStyles.authInput}
              contentStyle={globalStyles.bodyMedium}
              left={<TextInput.Icon icon="email" />}
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              mode="outlined"
              error={!!error}
              style={globalStyles.authInput}
              contentStyle={globalStyles.bodyMedium}
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />

            <HelperText 
              type="error" 
              visible={!!error}
              style={globalStyles.authErrorText}
            >
              {error}
            </HelperText>

            <View style={globalStyles.authActions}>
              <Button
                mode="contained"
                onPress={handleSignIn}
                loading={loading}
                disabled={loading}
                style={globalStyles.authPrimaryButton}
                contentStyle={globalStyles.buttonContent}
                labelStyle={globalStyles.labelLarge}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>

              <Button
                mode="text"
                onPress={() => router.push('/auth/sign-up')}
                style={globalStyles.authTextButton}
                labelStyle={globalStyles.labelLarge}
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
