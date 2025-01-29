import { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text, Surface, Button, useTheme, IconButton, ProgressBar, RadioButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useOnboardingStore } from '../../store/onboarding';

const options = [
  "Almost never",
  "Rarely",
  "Sometimes",
  "Usually",
  "Almost always"
];

const questions = [
  "How often do you feel stressed?",
  "How often do you practice mindfulness?",
  "How often do you exercise?",
  "How often do you feel anxious?",
  "How often do you meditate?"
];

export default function OnboardingScreen() {
  const router = useRouter();
  const theme = useTheme();
  const setOnboardingComplete = useOnboardingStore(
    (state) => state.setOnboardingComplete
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = selectedOption;
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption('');
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setSelectedOption(answers[currentStep - 1] || '');
    }
  };

  const handleComplete = () => {
    setOnboardingComplete('beginner', 'low');
    router.push('/');
  };

  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <IconButton
            icon="arrow-back"
            onPress={handleBack}
            disabled={currentStep === 0}
          />
          <Pressable onPress={() => router.push('/')}>
            <Text
              variant="labelLarge"
              style={{ color: theme.colors.primary }}
            >
              Skip
            </Text>
          </Pressable>
        </View>

        <View style={styles.mainContent}>
          <ProgressBar
            progress={(currentStep + 1) / questions.length}
            style={styles.progressBar}
          />

          <Text
            variant="headlineMedium"
            style={[
              styles.question,
              { color: theme.colors.onSurface }
            ]}
          >
            {questions[currentStep]}
          </Text>

          <RadioButton.Group
            onValueChange={value => setSelectedOption(value)}
            value={selectedOption}
          >
            <View style={styles.optionsContainer}>
              {options.map((option) => (
                <Pressable
                  key={option}
                  onPress={() => setSelectedOption(option)}
                  style={styles.optionWrapper}
                >
                  <Surface
                    style={[
                      styles.optionCard,
                      {
                        backgroundColor: theme.colors.surface,
                        borderColor: selectedOption === option
                          ? theme.colors.primary
                          : theme.colors.surfaceVariant,
                      }
                    ]}
                  >
                    <View style={styles.optionContent}>
                      <RadioButton value={option} />
                      <Text
                        variant="bodyLarge"
                        style={[
                          styles.optionText,
                          { color: theme.colors.onSurface }
                        ]}
                      >
                        {option}
                      </Text>
                    </View>
                  </Surface>
                </Pressable>
              ))}
            </View>
          </RadioButton.Group>
        </View>

        <Button
          mode="contained"
          onPress={handleNext}
          disabled={!selectedOption}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          {currentStep === questions.length - 1 ? 'Complete' : 'Next'}
        </Button>
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
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  mainContent: {
    flex: 1,
    gap: 24,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
  },
  question: {
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 12,
  },
  optionWrapper: {
    width: '100%',
  },
  optionCard: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  optionText: {
    marginLeft: 8,
  },
  button: {
    marginTop: 24,
    borderRadius: 28,
  },
  buttonContent: {
    height: 48,
  },
});
