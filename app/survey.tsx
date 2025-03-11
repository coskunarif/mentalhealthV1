import React, { useState, useEffect } from 'react';
import { ScrollView, LayoutAnimation } from 'react-native';
import { Text, Button, ProgressBar, Surface, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import QuestionCard from './components/QuestionCard';
import { layoutStyles, typographyStyles, buttonStyles } from './config';
import { ScreenLayout } from './components/ScreenLayout';

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

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, []);

  const handleAnswer = (answer: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = answer;
      return newAnswers;
    });
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleFinishSurvey = () => {
    router.push('/tabs'); // Navigate to main tabs (or a dedicated "survey complete" screen)
  };

  return (
    <ScreenLayout
      title="Daily Survey"
      subtitle="Complete your daily mood and wellness assessment."
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
        <Text variant="titleLarge" style={{ marginBottom: 8 }}>
          {questions[currentQuestion].text}
        </Text>
        <QuestionCard
          options={questions[currentQuestion].options}
          selectedOption={answers[currentQuestion]}
          onSelect={(index) =>
            handleAnswer(questions[currentQuestion].options[index])
          }
        />
        <ProgressBar
          progress={progress}
          color={theme.colors.primary}
          style={{ marginTop: 16, height: 8, borderRadius: 4 }}
        />
      </Surface>
      <Button mode="contained" onPress={handleFinishSurvey} style={{ marginBottom: 16 }}>
        Finish Survey
      </Button>
    </ScreenLayout>
  );
}
