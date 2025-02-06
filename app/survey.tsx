import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Link } from 'expo-router';
import styles from './config/styles';
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

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const progress = (currentQuestion + 1) / questions.length;

  return (
    <View style={styles.styles.layout.container}>
      <View style={styles.styles.layout.content}>
        <Text style={[styles.styles.text.heading1, { marginBottom: 24 }]}>
          Daily Survey
        </Text>

        <QuestionCard
          question={questions[currentQuestion].text}
          options={questions[currentQuestion].options}
          onSelect={(index: number) => handleAnswer(questions[currentQuestion].options[index])}
          currentIndex={currentQuestion}
          totalQuestions={questions.length}
          progress={progress}
        />

        <View style={[styles.styles.layout.footer, { gap: 16 }]}>
          {currentQuestion === questions.length - 1 && (
            <Link href="/tabs" asChild>
              <Button mode="contained" style={styles.styles.button.primary}>
                Submit
              </Button>
            </Link>
          )}
        </View>
      </View>
    </View>
  );
}
