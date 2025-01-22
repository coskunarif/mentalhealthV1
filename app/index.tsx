import { View } from 'react-native';
import { Redirect } from 'expo-router';
import { useOnboardingStore } from '../store/onboarding';

export default function Page() {
  const hasCompletedOnboarding = useOnboardingStore(
    (state) => state.hasCompletedOnboarding
  );

  // If onboarding is not completed, redirect to onboarding
  if (!hasCompletedOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  // Otherwise show the main app screen (we'll add this later)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* Main app content will go here */}
    </View>
  );
}
