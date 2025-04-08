import { useState, useEffect } from 'react';
import { SurveyService } from '../services/survey.service';
import { SurveyTemplate, SurveyQuestion } from '../models/survey.model';

export const useSurveyTemplate = (templateId: string = 'daily') => {
  const [template, setTemplate] = useState<SurveyTemplate | null>(null);
  const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await SurveyService.getSurveyTemplate(templateId);
        setTemplate(data);
        
        // Sort questions by order field
        if (data?.questions) {
          const sortedQuestions = [...data.questions].sort((a, b) => a.order - b.order);
          setQuestions(sortedQuestions);
        } else {
          setQuestions([]);
        }
      } catch (err: any) {
        console.error('Error fetching survey template:', err);
        setError(err.message || 'Failed to load survey');
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [templateId]);

  // Get fallback hardcoded questions if needed
  const getFallbackQuestions = () => {
    // This replicates your current hardcoded questions as a fallback
    return [
      {
        id: 'mood',
        text: "How would you rate your overall mood today?",
        type: 'singleChoice' as const,
        order: 1,
        required: true,
        options: [
          { text: "Very Poor", icon: 'emoticon-cry-outline', value: 1 },
          { text: "Poor", icon: 'emoticon-sad-outline', value: 2 },
          { text: "Neutral", icon: 'emoticon-neutral-outline', value: 3 },
          { text: "Good", icon: 'emoticon-happy-outline', value: 4 },
          { text: "Very Good", icon: 'emoticon-excited-outline', value: 5 }
        ]
      },
      // Add more fallback questions here
    ];
  };

  return {
    template,
    questions: questions.length > 0 ? questions : getFallbackQuestions(),
    loading,
    error,
    hasData: questions.length > 0
  };
};

export default useSurveyTemplate;
