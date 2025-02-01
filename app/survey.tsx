import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Text, Button, Surface, TouchableRipple, ProgressBar, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { globalStyles } from './config/styles';
import { colors, withOpacity } from './config/colors';

const questions = [
  {
    id: 0,
    text: 'How do you typically feel or react when you sense danger or a threat?',
    options: [
      'I feel a strong urge to or escape the situation',
      'I become paralyzed with fear',
      'I remain calm and analytical',
      'I feel overwhelmed and someone make decisions for me',
    ],
  },
  {
    id: 1,
    text: 'Which definition describes you better',
    options: [
      'Option 1',
      'Option 2',
      'Option 3',
      'Option 4',
    ],
  },
  // Add more questions as needed
];

export default function SurveyScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});

  const handleSelect = (questionId: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      router.replace('/tabs/home');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  return (
    <Surface style={[styles.container, globalStyles.container]}>
      <SafeAreaView style={globalStyles.safeArea}>
        {/* Progress Section */}
        <View style={globalStyles.progressSection}>
          <View style={styles.progressInfo}>
            <Text 
              variant="titleMedium" 
              style={[globalStyles.text, { color: colors.primary700 }]}
            >
              Question {currentQuestion + 1} of {questions.length}
            </Text>
          </View>
          <ProgressBar
            progress={(currentQuestion + 1) / questions.length}
            color={colors.primary}
            style={globalStyles.progressBar}
          />
        </View>

        {/* Content Section */}
        <View style={globalStyles.contentSection}>
          {/* Question */}
          <Text
            variant="headlineMedium"
            style={[globalStyles.heading5, styles.questionText]}
          >
            {questions[currentQuestion].text}
          </Text>

          {/* Options */}
          <View style={styles.optionsContainer}>
            {questions[currentQuestion].options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion] === index;
              return (
                <TouchableRipple
                  key={index}
                  onPress={() => handleSelect(currentQuestion, index)}
                  style={[
                    globalStyles.optionButton,
                    isSelected && globalStyles.optionButtonSelected
                  ]}
                >
                  <Text
                    variant="bodyLarge"
                    style={[
                      globalStyles.bodyLarge,
                      { color: isSelected ? colors.primary800 : colors.onSurfaceVariant }
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableRipple>
              );
            })}
          </View>
        </View>

        {/* Navigation Section */}
        <View style={globalStyles.navigationSection}>
          <Button
            mode="outlined"
            onPress={handlePrevious}
            disabled={currentQuestion === 0}
            style={[globalStyles.button, { borderColor: colors.primary }]}
            labelStyle={[globalStyles.buttonLabel, { color: colors.primary700 }]}
          >
            Previous
          </Button>
          <Button
            mode="contained"
            onPress={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
            style={[globalStyles.button, { backgroundColor: colors.primary }]}
            labelStyle={[globalStyles.buttonLabel, { color: colors.onPrimary }]}
          >
            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </View>
      </SafeAreaView>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressInfo: {
    marginBottom: 12,
  },
  questionText: {
    marginBottom: 32,
  },
  optionsContainer: {
    gap: 16,
  },
});
