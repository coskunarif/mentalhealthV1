import { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, Surface, TextInput, Button, useTheme, Snackbar } from 'react-native-paper';
import { router } from 'expo-router';
import { useAuth } from '../../context/auth';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { signUp } = useAuth();
  const theme = useTheme();

  const showMessage = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const handleSignUp = async () => {
    if (loading) return;
    if (password !== confirmPassword) {
      showMessage('Passwords do not match');
      return;
    }

    if (!email || !password) {
      showMessage('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password);
      // The index page will handle navigation
    } catch (error: any) {
      showMessage(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Surface style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={{ 
            flexGrow: 1,
            justifyContent: 'center',
            padding: 24
          }}
        >
          <View style={{ 
            width: '100%',
            maxWidth: 400,
            alignSelf: 'center',
            gap: 24
          }}>
            <Text
              variant="headlineMedium"
              style={{
                color: theme.colors.onBackground,
                fontWeight: 'bold'
              }}
            >
              Create Account
            </Text>
            
            <View style={{ gap: 16 }}>
              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                left={<TextInput.Icon icon="account" />}
                style={{ backgroundColor: theme.colors.background }}
              />

              <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                mode="outlined"
                left={<TextInput.Icon icon="lock" />}
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                style={{ backgroundColor: theme.colors.background }}
              />

              <TextInput
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                mode="outlined"
                left={<TextInput.Icon icon="lock" />}
                right={
                  <TextInput.Icon
                    icon={showConfirmPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                }
                style={{ backgroundColor: theme.colors.background }}
              />

              <Button
                mode="contained"
                onPress={handleSignUp}
                loading={loading}
                disabled={loading}
                contentStyle={{ height: 48 }}
                style={{ marginTop: 8 }}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Button>

              <Button
                mode="text"
                onPress={() => router.back()}
                style={{ marginTop: 8 }}
              >
                Already have an account? Sign In
              </Button>
            </View>
          </View>
        </ScrollView>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          action={{
            label: 'Close',
            onPress: () => setSnackbarVisible(false),
          }}
        >
          {snackbarMessage}
        </Snackbar>
      </KeyboardAvoidingView>
    </Surface>
  );
}
