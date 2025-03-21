import { useState } from 'react';
import { SurveyService } from '../services/survey.service';
import { useAuth } from './useAuth';

export const useSurvey = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Define type for error
  const { user } = useAuth();

  const submitSurvey = async (responses: any[]) => { // Define type for responses
    if (!user?.uid) {
      setError('You must be logged in to submit a survey');
      return false;
    }
    
    try {
      setLoading(true);
      await SurveyService.saveSurveyResponse({
        userId: user.uid,
        timestamp: new Date(),
        responses
      });
      setError(null);
      return true;
    } catch (err) {
      console.error('Error submitting survey:', err);
      setError('Failed to submit survey');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { submitSurvey, loading, error };
};

export default useSurvey;
