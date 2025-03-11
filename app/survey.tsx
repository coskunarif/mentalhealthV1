import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Surface, useTheme, ProgressBar } from 'react-native-paper';
import QuestionCard from './components/QuestionCard';
import { ScreenLayout } from './components/ScreenLayout';

const questions = [
    {
        text: "How would you rate your overall mood today?",
        options: ["Very Poor", "Poor", "Neutral", "Good", "Very Good"]
    },
    {
        text: "Did you experience any anxiety today?",
        options: ["Not at all", "Slightly", "Moderately", "Very much", "Extremely"]
    },
    {
        text: "How well did you sleep last night?",
        options: ["Very Poorly", "Poorly", "Okay", "Well", "Very Well"]
    },
    {
        text: "Have you engaged in any physical activity today?",
        options: ["No", "A little", "Moderate amount", "A lot", "Intense workout"]
    },
    {
        text: "Did you connect with friends or family today?",
        options: ["No", "Briefly", "Yes, somewhat", "Yes, a good amount", "Extensively"]
    }
];

const SurveyScreen = () => {
    const theme = useTheme();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);

    const handleAnswer = (option: string) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = option;
        setAnswers(newAnswers);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handleFinishSurvey = () => {
        // Here you would handle submitting the survey data
        console.log(answers); // For now, just log the answers
    };

    const progress = (currentQuestion + 1) / questions.length;

    return (
        <ScreenLayout
          title="Daily Survey"
          subtitle="Complete your daily assessment"
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
              onSelect={(index) => {
                handleAnswer(questions[currentQuestion].options[index]);
              }}
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
};

export default SurveyScreen;
