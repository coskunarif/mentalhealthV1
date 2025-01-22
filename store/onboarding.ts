import { create } from 'zustand';

interface OnboardingState {
  hasCompletedOnboarding: boolean;
  meditationLevel: string;
  stressLevel: string;
  setOnboardingComplete: (meditation: string, stress: string) => void;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  hasCompletedOnboarding: false,
  meditationLevel: '',
  stressLevel: '',
  setOnboardingComplete: (meditation: string, stress: string) => 
    set({ 
      hasCompletedOnboarding: true,
      meditationLevel: meditation,
      stressLevel: stress,
    }),
  resetOnboarding: () => 
    set({ 
      hasCompletedOnboarding: false,
      meditationLevel: '',
      stressLevel: '',
    }),
}));
