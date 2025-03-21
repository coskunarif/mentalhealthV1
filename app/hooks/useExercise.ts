import { useState, useEffect } from 'react';
import { ExerciseService } from '../services/exercise.service';
import { useAuth } from './useAuth';
import { Exercise } from '../models/exercise.model'; // Import Exercise model

export const useExercise = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]); // Define type for exercises
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Define type for error
  const { user } = useAuth();

  useEffect(() => {
    const fetchExercises = async () => {
      if (!user?.uid) return;
      
      try {
        setLoading(true);
        const data = await ExerciseService.getExercises(user.uid);
        setExercises(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching exercises:', err);
        setError('Failed to load exercises');
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [user?.uid]);

  return { exercises, loading, error };
};

export default useExercise;
