import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { MeditationService } from '../services/meditation.service'; // Import the service

interface Meditation {
  id: string;
  title: string;
  duration: number;
}

export const useMeditation = () => {
  const [meditations, setMeditations] = useState<Meditation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Use string type for error message
  const { user } = useAuth();

  useEffect(() => {
    const fetchMeditations = async () => {
      // No need to check user?.uid here if meditations are public
      // If meditations are user-specific, add the check: if (!user?.uid) { setLoading(false); return; }
      setLoading(true);
      setError(null);
      try {
        const fetchedMeditations = await MeditationService.getMeditations();
        setMeditations(fetchedMeditations);
      } catch (err: any) {
        console.error('[useMeditation] Error fetching meditations:', err);
        setError(err.message || 'Failed to load meditations');
      } finally {
        setLoading(false);
      }
    };

    fetchMeditations();
  }, [user?.uid]); // Keep dependency if meditations depend on the user

  return { meditations, loading, error };
};

export default useMeditation;
