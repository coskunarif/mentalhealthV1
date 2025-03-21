import { useState, useEffect } from 'react';
import { MoodService } from '../services/mood.service';
import { useAuth } from './useAuth';
import { MoodEntry } from '../models/mood.model'; // Import MoodEntry model

export const useMood = () => {
  const [moods, setMoods] = useState<MoodEntry[]>([]); // Define type for moods
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Define type for error
  const { user } = useAuth();

  useEffect(() => {
    const fetchMoods = async () => {
      if (!user?.uid) return;
      
      try {
        setLoading(true);
        const data = await MoodService.getMoodEntries(user.uid, 30);
        setMoods(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching moods:', err);
        setError('Failed to load mood data');
      } finally {
        setLoading(false);
      }
    };

    fetchMoods();
  }, [user?.uid]);

  return { moods, loading, error };
};

export default useMood;
