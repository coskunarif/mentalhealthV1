import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme, ProgressBar, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScreenLayout } from './components/ScreenLayout';
import { router } from 'expo-router';
import EnhancedButton from './components/EnhancedButton';
import { useAuth } from './context/auth';
import { useSurvey } from './hooks/useSurvey';
import { useSurveyTemplate } from './hooks/useSurveyTemplate';

const SurveyScreen = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const { submitSurvey, loading: submitting, error: submitError } = useSurvey();
  const userId = user?.uid || '';
  
  // Load survey template
  const { questions, loading: templateLoading, error: templateError } = useSurveyTemplate('daily');

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  const handleAnswer = (questionId: string, option: string) => {
    const newAnswers = { ...answers };
    if (newAnswers[questionId] === option) {
      delete newAnswers[questionId];
    } else {
      newAnswers[questionId] = option;
    }
    setAnswers(newAnswers);
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = async () => {
    const isLastQuestion = currentQuestion === questions.length - 1;
    if (isLastQuestion) {
      if (!userId) {
        console.error('User ID is required');
        return;
      }
      
      // Format responses for saving
      const formattedResponses: Record<string, string> = {};
      Object.keys(answers).forEach(questionId => {
        formattedResponses[questionId] = answers[questionId];
      });
      
      // Extract question texts for reference
      const questionTexts = questions.map(q => q.text);

      // Use the hook's submitSurvey function
      // NOTE: The original useSurvey hook might need adjustment
      // It expects an array of strings, but we now have structured answers.
      // For now, passing the values as an array to maintain compatibility.
      // A better approach would be to update useSurvey to accept the answers object.
      const success = await submitSurvey(
        Object.values(formattedResponses), 
        questionTexts
      ); 
      
      if (success) {
        router.replace('/tabs/home');
      }
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // Loading state
  if (templateLoading) {
    return (
      <ScreenLayout title="Survey">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={{ marginTop: 16 }}>Loading survey questions...</Text>
        </View>
      </ScreenLayout>
    );
  }

  // Error state
  if (templateError) {
    return (
      <ScreenLayout title="Survey">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <MaterialCommunityIcons name="alert-circle-outline" size={48} color={theme.colors.error} />
          <Text style={{ color: theme.colors.error, textAlign: 'center', marginTop: 16 }}>
            {templateError}
          </Text>
          <EnhancedButton
            mode="contained"
            onPress={() => router.replace('/tabs/home')}
            style={{ marginTop: 20 }}
          >
            Return Home
          </EnhancedButton>
        </View>
      </ScreenLayout>
    );
  }

  // Handle case where questions might still be empty after loading (e.g., fallback failed)
  if (!questions || questions.length === 0) {
     return (
      <ScreenLayout title="Survey">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <MaterialCommunityIcons name="help-circle-outline" size={48} color={theme.colors.onSurfaceVariant} />
          <Text style={{ textAlign: 'center', marginTop: 16 }}>
            No survey questions available at the moment. Please try again later.
          </Text>
           <EnhancedButton
            mode="contained"
            onPress={() => router.replace('/tabs/home')}
            style={{ marginTop: 20 }}
          >
            Return Home
          </EnhancedButton>
        </View>
      </ScreenLayout>
    );
  }

  const isLastQuestion = currentQuestion === questions.length - 1;
  const isFirstQuestion = currentQuestion === 0;
  const currentQuestionData = questions[currentQuestion];
  const progress = (currentQuestion + 1) / questions.length;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.colors.background,
    },
    questionText: {
      marginBottom: 24,
      textAlign: 'center',
      fontWeight: '500',
      fontSize: 24,
      lineHeight: 32,
      color: theme.colors.onBackground, // Ensure text color contrasts with background
    },
    optionsContainer: {
      flex: 1,
      justifyContent: 'center',
      gap: 12,
      marginHorizontal: '5%',
    },
    progressBarContainer: { 
      marginTop: 32, 
      paddingVertical: 16, 
      gap: 16 
    },
    progressBar: { 
      height: 8, 
      borderRadius: 4 
    },
    navigationContainer: { 
      flexDirection: 'row', 
      gap: 12 
    },
    loadingContainer: { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center' 
    },
    errorContainer: { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: 20 
    },
    errorText: { 
      color: theme.colors.error, 
      textAlign: 'center', 
      marginTop: 16 
    },
    buttonMargin: { 
      marginTop: 20 
    },
    loadingText: { 
      marginTop: 16,
      color: theme.colors.onBackground // Ensure text color contrasts
    },
    noQuestionsText: {
      textAlign: 'center', 
      marginTop: 16,
      color: theme.colors.onSurfaceVariant // Use appropriate color
    }
  });

  return (
    <ScreenLayout 
      showBackButton={!isFirstQuestion} // Show back button only if not the first question
      onBackPress={handleBack} // Use handleBack for the back button
      contentTopPadding={24}
      title="Survey"
    >
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.questionText}>
          {currentQuestionData.text}
        </Text>

        <View style={styles.optionsContainer}>
          {currentQuestionData.options.map((option) => {
            const isSelected = answers[currentQuestionData.id] === option.text;
            return (
              <EnhancedButton
                key={option.text}
                variant="option"
                selected={isSelected}
                onPress={() => handleAnswer(currentQuestionData.id, option.text)}
                iconComponent={
                  <MaterialCommunityIcons
                    name={option.icon as any}
                    size={24}
                    color={isSelected ? theme.colors.onPrimary : theme.colors.onSurfaceVariant}
                  />
                }
              >
                {option.text}
              </EnhancedButton>
            );
          })}
        </View>

        <View style={styles.progressBarContainer}>
          <ProgressBar
            progress={progress}
            color={theme.colors.primary}
            style={styles.progressBar}
          />
          
          <View style={styles.navigationContainer}>
            {/* Back button is handled by ScreenLayout now */}
            <EnhancedButton
              mode="contained"
              onPress={handleNext}
              fullWidth // Make next/finish button take full width if back button isn't shown
              icon={isLastQuestion ? "check" : "arrow-right"}
              loading={submitting}
              disabled={submitting || !answers[currentQuestionData.id]} // Disable if no answer selected for required questions (assuming all are required for now)
            >
              {isLastQuestion ? 'Finish Survey' : 'Next'}
            </EnhancedButton>
          </View>
          {submitError && (
             <Text style={[styles.errorText, {marginTop: 8}]}>Error submitting survey: {submitError}</Text>
          )}
        </View>
      </View>
    </ScreenLayout>
  );
};

export default SurveyScreen;
