import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
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
    <View style={[globalStyles.screen, { backgroundColor: colors.surfaceVariant }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />
      <SafeAreaView style={[globalStyles.safeArea, { backgroundColor: colors.surface }]}>
        {/* Progress Section */}
        <View style={globalStyles.progressSection}>
          <Text style={globalStyles.progressText}>
            Question {currentQuestion + 1} of {questions.length}
          </Text>
          <ProgressBar
            progress={(currentQuestion + 1) / questions.length}
            color={colors.primary}
            style={globalStyles.progressBar}
          />
        </View>

        {/* Content Section */}
        <View style={[globalStyles.contentSection, { paddingTop: 24 }]}>
          {/* Question */}
          <View style={globalStyles.questionSection}>
            <Text
              variant="titleLarge"
              style={[globalStyles.heading6, { color: colors.primary800 }]}
            >
              {questions[currentQuestion].text}
            </Text>
          </View>

          {/* Options */}
          <View style={{ gap: 8 }}>
            {questions[currentQuestion].options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion] === index;
              return (
                <TouchableRipple
                  key={index}
                  onPress={() => handleSelect(currentQuestion, index)}
                  style={[
                    globalStyles.optionButton,
                    isSelected && globalStyles.optionButtonSelected,
                  ]}
                >
                  <Text
                    variant="bodyLarge"
                    style={[
                      globalStyles.bodyLarge,
                      { 
                        color: isSelected ? colors.primary800 : colors.onSurfaceVariant,
                        textAlign: 'left',
                        width: '100%'
                      }
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
            style={[
              globalStyles.navButton,
              globalStyles.buttonSecondary,
              { marginRight: 8 }
            ]}
            labelStyle={[globalStyles.buttonLabel, { color: colors.primary }]}
          >
            Previous
          </Button>
          <Button
            mode="contained"
            onPress={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
            style={[
              globalStyles.navButton,
              globalStyles.buttonPrimary,
              { marginLeft: 8 }
            ]}
            labelStyle={[globalStyles.buttonLabel, { color: colors.onPrimary }]}
          >
            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
