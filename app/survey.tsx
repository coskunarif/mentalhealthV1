import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Text, Button, Surface, TouchableRipple, ProgressBar, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { globalStyles } from './config/styles';

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
    <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <SafeAreaView style={styles.safeArea}>
        {/* Progress Section */}
        <View style={styles.progressSection}>
          <View style={styles.progressInfo}>
            <Text 
              variant="labelLarge" 
              style={[
                globalStyles.text,
                { color: theme.colors.primary }
              ]}
            >
              Question {currentQuestion + 1} of {questions.length}
            </Text>
          </View>
          <ProgressBar
            progress={(currentQuestion + 1) / questions.length}
            color={theme.colors.primary}
            style={styles.progressBar}
          />
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          {/* Question */}
          <Text
            variant="headlineSmall"
            style={[
              styles.questionText,
              globalStyles.textBold,
              { color: theme.colors.primary }
            ]}
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
                    styles.optionButton,
                    {
                      backgroundColor: isSelected ? theme.colors.primaryContainer : theme.colors.surface,
                      borderColor: isSelected ? theme.colors.primary : theme.colors.outline,
                    }
                  ]}
                >
                  <Text
                    variant="bodyLarge"
                    style={[
                      globalStyles.text,
                      { color: isSelected ? theme.colors.primary : theme.colors.onSurface }
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
        <View style={styles.navigationSection}>
          <Button
            mode="outlined"
            onPress={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button
            mode="contained"
            onPress={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
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
  safeArea: {
    flex: 1,
  },
  progressSection: {
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(93, 164, 122, 0.05)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(93, 164, 122, 0.1)',
  },
  progressInfo: {
    marginBottom: 8,
    alignItems: 'center',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(93, 164, 122, 0.2)',
  },
  contentSection: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  questionText: {
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  optionsContainer: {
    gap: 16,
  },
  optionButton: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    elevation: 1,
  },
  navigationSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
    paddingBottom: 32,
  },
});
