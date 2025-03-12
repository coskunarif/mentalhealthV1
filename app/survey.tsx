import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, useTheme, ProgressBar, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScreenLayout } from './components/ScreenLayout';
import { router } from 'expo-router';

const questions = [
    {
        text: "How would you rate your overall mood today?",
        options: [
            { text: "Very Poor", icon: 'emoticon-cry-outline' },
            { text: "Poor", icon: 'emoticon-sad-outline' },
            { text: "Neutral", icon: 'emoticon-neutral-outline' },
            { text: "Good", icon: 'emoticon-happy-outline' },
            { text: "Very Good", icon: 'emoticon-excited-outline' }
        ]
    },
    {
        text: "Did you experience any anxiety today?",
        options: [
            { text: "Not at all", icon: 'emoticon-cool-outline' },
            { text: "Slightly", icon: 'emoticon-happy-outline' },
            { text: "Moderately", icon: 'emoticon-neutral-outline' },
            { text: "Very much", icon: 'emoticon-confused-outline' },
            { text: "Extremely", icon: 'emoticon-dead-outline' }
        ]
    },
    {
        text: "How well did you sleep last night?",
        options: [
            { text: "Very Poorly", icon: 'emoticon-dead-outline' },
            { text: "Poorly", icon: 'emoticon-sad-outline' },
            { text: "Okay", icon: 'emoticon-neutral-outline' },
            { text: "Well", icon: 'emoticon-happy-outline' },
            { text: "Very Well", icon: 'emoticon-excited-outline' }
        ]
    },
    {
        text: "Have you engaged in any physical activity today?",
        options: [
            { text: "No", icon: 'emoticon-cry-outline' },
            { text: "A little", icon: 'emoticon-neutral-outline' },
            { text: "Moderate amount", icon: 'emoticon-happy-outline' },
            { text: "A lot", icon: 'emoticon-excited-outline' },
            { text: "Intense workout", icon: 'emoticon-cool-outline' }
        ]
    },
    {
        text: "Did you connect with friends or family today?",
        options: [
            { text: "No", icon: 'emoticon-sad-outline' },
            { text: "Briefly", icon: 'emoticon-neutral-outline' },
            { text: "Yes, somewhat", icon: 'emoticon-happy-outline' },
            { text: "Yes, a good amount", icon: 'emoticon-excited-outline' },
            { text: "Extensively", icon: 'emoticon-kiss-outline' }
        ]
    },
    {
        text: "Did you take your medications today?",
        options: [
            { text: "Yes", icon: 'emoticon-happy-outline' },
            { text: "No", icon: 'emoticon-sad-outline' }
        ]
    },
    {
        text: "Did you experience any negative thoughts today?",
        options: [
            { text: "Yes", icon: 'emoticon-sad-outline' },
            { text: "No", icon: 'emoticon-happy-outline' }
        ]
    },
    {
        text: "Were you able to focus on your tasks today?",
        options: [
            { text: "Yes", icon: 'emoticon-happy-outline' },
            { text: "No", icon: 'emoticon-confused-outline' }
        ]
    },
    {
        text: "Did you feel overwhelmed at any point today?",
        options: [
            { text: "Yes", icon: 'emoticon-dead-outline' },
            { text: "No", icon: 'emoticon-cool-outline' }
        ]
    },
    {
        text: "Did you practice any relaxation techniques today?",
        options: [
            { text: "Yes", icon: 'emoticon-happy-outline' },
            { text: "No", icon: 'emoticon-neutral-outline' }
        ]
    }
];

const styles = (theme: any) => StyleSheet.create({
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
    },
    optionsContainer: {
        flex: 1,
        justifyContent: 'center',
        gap: 12,
    },
    optionButton: {
        marginVertical: 2,
        borderRadius: 12,
        height: 56,
        backgroundColor: theme.colors.surfaceVariant,
        borderColor: theme.withOpacity(theme.colors.outline, 0.2),
        borderWidth: 1,
        shadowColor: theme.colors.shadow,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 3,
    },
    unselectedOption: {
        backgroundColor: '#F5F5F5',
    },
    optionContent: {
        height: 56,
        paddingHorizontal: 20,
    },
    optionInnerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    optionText: {
        fontSize: 16,
        letterSpacing: 0.15,
        marginLeft: 20,
        color: theme.colors.onSurfaceVariant,
        flex: 1,
    },
    selectedOptionText: {
        color: theme.colors.onPrimary,
    },
    bottomContainer: {
        marginTop: 32,
        paddingVertical: 16,
        gap: 16,
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    navigationButton: {
        flex: 1,
        height: 40,
        borderRadius: 12,
        backgroundColor: theme.withOpacity(theme.colors.primary, 0.9),
    },
    backButton: {
        opacity: 0.85,
    },
    nextButton: {
        opacity: 1,
    },
    buttonLabel: {
        fontSize: 13,
        letterSpacing: 0.5,
        fontWeight: '500',
        color: theme.colors.onPrimary,
    },
    progressBar: {
        height: 8,
        borderRadius: 4,
    },
    finishButton: {
        borderRadius: 12,
        height: 44,
    },
    finishButtonLabel: {
        fontSize: 14,
        letterSpacing: 0.5,
        fontWeight: '500',
    },
    nextButtonLabel: {
        fontSize: 13,
        letterSpacing: 0.5,
        fontWeight: '500',
    },
});

const SurveyScreen = () => {
    const theme = useTheme();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<(string | undefined)[]>([]);
    const themedStyles = React.useMemo(() => styles(theme), [theme]);

    const handleAnswer = (option: string) => {
        const newAnswers = [...answers];
        if (newAnswers[currentQuestion] === option) {
            newAnswers[currentQuestion] = undefined;
        } else {
            newAnswers[currentQuestion] = option;
        }
        setAnswers(newAnswers);
    };

    const handleBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Survey completed, navigate to home
            router.replace('/');
        }
    };

    const progress = (currentQuestion + 1) / questions.length;
    const isFirstQuestion = currentQuestion === 0;
    const isLastQuestion = currentQuestion === questions.length - 1;

    return (
        <ScreenLayout 
            showBackButton
            contentTopPadding={24}
            title="Survey"
        >
            <View style={themedStyles.container}>
                <Text variant="headlineMedium" style={themedStyles.questionText}>
                    {questions[currentQuestion].text}
                </Text>

                <View style={themedStyles.optionsContainer}>
                    {questions[currentQuestion].options.map((option, index) => {
                        const isSelected = answers[currentQuestion] === option.text;
                        return (
                            <Button
                                key={option.text}
                                mode={isSelected ? "contained" : "outlined"}
                                onPress={() => handleAnswer(option.text)}
                                style={[
                                    themedStyles.optionButton,
                                    !isSelected && themedStyles.unselectedOption,
                                    isSelected && { 
                                        backgroundColor: theme.colors.primary,
                                        borderColor: 'transparent',
                                        shadowColor: theme.colors.primary,
                                        shadowOpacity: 0.2,
                                        elevation: 4,
                                    }
                                ]}
                                contentStyle={themedStyles.optionContent}
                            >
                                <View style={themedStyles.optionInnerContainer}>
                                    <MaterialCommunityIcons
                                        name={option.icon as keyof typeof MaterialCommunityIcons.glyphMap}
                                        size={24}
                                        color={isSelected ? theme.colors.onPrimary : theme.colors.onSurfaceVariant}
                                    />
                                    <Text
                                        style={[
                                            themedStyles.optionText,
                                            isSelected && themedStyles.selectedOptionText
                                        ]}
                                    >
                                        {option.text}
                                    </Text>
                                </View>
                            </Button>
                        );
                    })}
                </View>

                <View style={themedStyles.bottomContainer}>
                    <ProgressBar
                        progress={progress}
                        color={theme.colors.primary}
                        style={themedStyles.progressBar}
                    />
                    
                    <View style={themedStyles.buttonsContainer}>
                        {!isFirstQuestion && (
                            <Button
                                mode="contained"
                                onPress={handleBack}
                                style={[themedStyles.navigationButton, themedStyles.backButton]}
                                labelStyle={themedStyles.buttonLabel}
                                textColor={theme.colors.onPrimary}
                            >
                                Back
                            </Button>
                        )}
                        <Button
                            mode="contained"
                            onPress={handleNext}
                            style={[themedStyles.navigationButton, themedStyles.nextButton]}
                            labelStyle={themedStyles.buttonLabel}
                            textColor={theme.colors.onPrimary}
                        >
                            {isLastQuestion ? 'Finish Survey' : 'Next'}
                        </Button>
                    </View>
                </View>
            </View>
        </ScreenLayout>
    );
};

export default SurveyScreen;
