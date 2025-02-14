// File: app/survey.tsx
import React, { useState, useEffect } from 'react';
import { ScrollView, LayoutAnimation } from 'react-native';
import {
  Text,
  Button,
  ProgressBar,
  Surface,
  useTheme,
  Appbar,
} from 'react-native-paper';
import { useRouter } from 'expo-router';
import QuestionCard from './components/QuestionCard';

const questions = [
  {
    text: 'How are you feeling today?',
    options: ['Great', 'Good', 'Okay', 'Not so good', 'Bad'],
  },
  {
    text: 'What is your main source of stress?',
    options: ['Work', 'Relationships', 'Health', 'Finances', 'Other'],
  },
  {
    text: 'How often do you feel anxious?',
    options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
  },
  {
    text: 'How would you rate your overall mood today?',
    options: ['Great', 'Good', 'Okay', 'Not so good', 'Bad'],
  },
  {
    text: 'How well did you sleep last night?',
    options: ['Great', 'Good', 'Okay', 'Not so good', 'Bad'],
  },
  {
    text: 'How would you rate your stress level today?',
    options: ['Low', 'Moderate', 'High', 'Very High', 'Extremely High'],
  },
  {
    text: 'Have you engaged in any physical activity today?',
    options: ['Yes', 'No'],
  },
  {
    text: 'Have you practiced any mindfulness or meditation today?',
    options: ['Yes', 'No'],
  },
];

export default function SurveyScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const theme = useTheme();
  const totalQuestions = questions.length;
  const progress = (currentQuestion + 1) / totalQuestions;
  const router = useRouter();

  // Animate in on initial render
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, []);

  // Handle when a user selects an option
  const handleAnswer = (answer: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestion] = answer;
      return newAnswers;
    });

    // Automatically proceed to the next question (if not at the last question)
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  // Finish the survey at any point
  const handleFinishSurvey = () => {
    // TODO: handle partial or complete survey submission logic here
    router.push('/tabs'); // or navigate to a "Survey Complete" screen
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Daily Survey" />
      </Appbar.Header>

      <ScrollView
        style={{ flex: 1, backgroundColor: theme.colors.background }}
        contentContainerStyle={{ padding: 16 }}
      >
        <Surface
          style={{
            padding: 16,
            borderRadius: 8,
            elevation: 2,
            marginBottom: 16,
          }}
        >
          {/* Display the current question text */}
          <Text variant="titleLarge" style={{ marginBottom: 8 }}>
            {questions[currentQuestion].text}
          </Text>

          {/* Render only the options in QuestionCard */}
          <QuestionCard
            options={questions[currentQuestion].options}
            selectedOption={answers[currentQuestion]}
            onSelect={(index) =>
              handleAnswer(questions[currentQuestion].options[index])
            }
          />

          {/* Show progress bar */}
          <ProgressBar
            progress={progress}
            color={theme.colors.primary}
            style={{ marginTop: 16, height: 8, borderRadius: 4 }}
          />
        </Surface>

        {/* 
          "Finish Survey" button is always visible, 
          allowing users to submit partial or complete answers.
        */}
        <Button
          mode="contained"
          onPress={handleFinishSurvey}
          style={{ marginBottom: 16 }}
        >
          Finish Survey
        </Button>
      </ScrollView>
    </>
  );
}
