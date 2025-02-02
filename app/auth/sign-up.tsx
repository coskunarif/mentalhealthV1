import { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, Surface, TextInput, Button, useTheme, Snackbar } from 'react-native-paper';
import { router } from 'expo-router';
import { useAuth } from '../../context/auth';
import { globalStyles } from '../config/styles';

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
          <View style={globalStyles.authFormContainer}>
            <Text style={globalStyles.authHeading}>
              Create Account
            </Text>
            
            <Text style={globalStyles.authSubheading}>
              Join us on your journey to mental wellness
            </Text>
            
            <View style={globalStyles.authFormFields}>
              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                left={<TextInput.Icon icon="email" />}
                style={globalStyles.authInput}
                contentStyle={globalStyles.bodyMedium}
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
                style={globalStyles.authInput}
                contentStyle={globalStyles.bodyMedium}
              />

              <TextInput
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                mode="outlined"
                left={<TextInput.Icon icon="lock-check" />}
                right={
                  <TextInput.Icon
                    icon={showConfirmPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                }
                style={globalStyles.authInput}
                contentStyle={globalStyles.bodyMedium}
              />

              <View style={globalStyles.authActions}>
                <Button
                  mode="contained"
                  onPress={handleSignUp}
                  loading={loading}
                  disabled={loading}
                  style={globalStyles.authPrimaryButton}
                  contentStyle={globalStyles.buttonContent}
                  labelStyle={globalStyles.labelLarge}
                >
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </Button>

                <Button
                  mode="text"
                  onPress={() => router.back()}
                  style={globalStyles.authTextButton}
                  labelStyle={globalStyles.labelLarge}
                >
                  Already have an account? Sign In
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          style={globalStyles.authSnackbar}
          action={{
            label: 'Close',
            onPress: () => setSnackbarVisible(false),
          }}
        >
          <Text style={[globalStyles.bodyMedium, { color: theme.colors.onError }]}>
            {snackbarMessage}
          </Text>
        </Snackbar>
      </KeyboardAvoidingView>
    </Surface>
  );
}
