import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  addDoc,
  updateDoc,
  deleteDoc,
  QueryConstraint,
  DocumentData,
  DocumentSnapshot,
  QuerySnapshot,
  Timestamp,
  enableMultiTabIndexedDbPersistence,
  disableNetwork,
  enableNetwork
} from 'firebase/firestore';
import { db } from './firebase';

// Generic function to convert Firestore data to typed model
export function convertDoc<T>(doc: DocumentSnapshot<DocumentData>): T {
  if (!doc.exists()) {
    throw new Error(`Document doesn't exist`);
  }
  const data = doc.data();
  return {
    ...data,
    id: doc.id
  } as T;
}

// Generic function to convert QuerySnapshot to typed models
export function convertCollection<T>(snapshot: QuerySnapshot<DocumentData>): T[] {
  return snapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  } as T));
}

// Helper for getting a document by id
export async function getDocument<T>(
  collectionPath: string,
  documentId: string
): Promise<T | null> {
  try {
    const docRef = doc(db, collectionPath, documentId);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) {
      return null;
    }
    return {
      id: snapshot.id,
      ...snapshot.data()
    } as T;
  } catch (error) {
    console.error(`Error getting document ${documentId}:`, error);
    throw error;
  }
}

// Helper for querying documents
export async function queryDocuments<T>(
  collectionPath: string,
  constraints: QueryConstraint[]
): Promise<T[]> {
  try {
    const collectionRef = collection(db, collectionPath);
    const q = query(collectionRef, ...constraints);
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as T));
  } catch (error) {
    console.error(`Error querying documents:`, error);
    throw error;
  }
}

// Configure offline persistence
export const configureOfflineSupport = async () => {
  try {
    await enableMultiTabIndexedDbPersistence(db);
    console.log('Offline persistence enabled');
  } catch (error) {
    console.error('Error enabling offline support:', error);
  }
};

// Methods to handle connectivity
export const goOffline = () => disableNetwork(db);
export const goOnline = () => enableNetwork(db);

// Export timestamp for ease of use
export { Timestamp };