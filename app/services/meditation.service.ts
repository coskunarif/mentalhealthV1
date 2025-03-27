import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase-utils'; // Correct import for Firestore instance
const meditationsCollection = collection(db, 'meditations');

interface Meditation {
  id: string;
  title: string;
  duration: number;
  // Add other relevant fields based on your Firestore structure
}

export class MeditationService {
  /**
   * Fetches all meditations from Firestore, ordered by title.
   */
  static async getMeditations(): Promise<Meditation[]> {
    try {
      const q = query(meditationsCollection, orderBy('title')); // Example ordering
      const querySnapshot = await getDocs(q);
      const meditations: Meditation[] = [];
      querySnapshot.forEach((doc) => {
        // Ensure you spread the doc data and add the id
        meditations.push({ id: doc.id, ...doc.data() } as Meditation);
      });
      console.log('[MeditationService] Fetched meditations:', meditations.length);
      return meditations;
    } catch (error) {
      console.error('[MeditationService] Error fetching meditations:', error);
      throw new Error('Failed to fetch meditations from Firestore.');
    }
  }

  // Add other methods as needed (e.g., getMeditationById, addMeditation, etc.)
}

// Export an instance or the class itself based on usage preference
// export default new MeditationService(); // If you prefer singleton instance
