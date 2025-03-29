import { collection, getDocs, query, orderBy, doc, getDoc } from 'firebase/firestore'; // Added doc, getDoc
import { db } from '../lib/firebase-utils'; // Correct import for Firestore instance
const meditationsCollection = collection(db, 'meditations');

interface Meditation {
  id: string;
  title: string;
  duration: number;
  description: string; // Added description
  audioUrl: string;    // Added audioUrl
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

  /**
   * Fetches a single meditation by its ID.
   */
  static async getMeditationById(meditationId: string): Promise<Meditation | null> {
    try {
      const docRef = doc(db, 'meditations', meditationId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(`[MeditationService] Fetched meditation: ${meditationId}`);
        return { id: docSnap.id, ...docSnap.data() } as Meditation;
      } else {
        console.warn(`[MeditationService] No meditation found with ID: ${meditationId}`);
        return null;
      }
    } catch (error) {
      console.error(`[MeditationService] Error fetching meditation ${meditationId}:`, error);
      throw new Error(`Failed to fetch meditation ${meditationId} from Firestore.`);
    }
  }

  // Add other methods as needed (e.g., addMeditation, etc.)
}

// Export an instance or the class itself based on usage preference
// export default new MeditationService(); // If you prefer singleton instance
