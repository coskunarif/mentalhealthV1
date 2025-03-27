import * as admin from 'firebase-admin';
import * as fs from 'fs';
import { createObjectCsvWriter } from 'csv-writer';
import * as path from 'path';

// Initialize Firebase Admin with service account
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

interface FlattenedData {
  [key: string]: string | number | boolean | null;
}

interface Collection {
  name: string;
  documents: FlattenedData[];
}

// Function to flatten nested objects for CSV
function flattenObject(obj: any, prefix = ''): FlattenedData {
  const flattened: FlattenedData = {};
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      
      // Handle different types of values
      if (value === null || value === undefined) {
        flattened[`${prefix}${key}`] = null;
      } else if (typeof value === 'object' && !(value instanceof Date) && !Array.isArray(value)) {
        // Recursively flatten nested objects
        Object.assign(flattened, flattenObject(value, `${prefix}${key}.`));
      } else if (value instanceof Date) {
        // Convert Date objects to ISO strings
        flattened[`${prefix}${key}`] = value.toISOString();
      } else if (Array.isArray(value)) {
        // Convert arrays to JSON strings
        flattened[`${prefix}${key}`] = JSON.stringify(value);
      } else {
        // Handle primitive values
        flattened[`${prefix}${key}`] = value;
      }
    }
  }
  
  return flattened;
}

// Function to get all document data from a collection
async function getCollectionData(collectionName: string): Promise<FlattenedData[]> {
  const snapshot = await db.collection(collectionName).get();
  const documents: FlattenedData[] = [];
  
  snapshot.forEach(doc => {
    // Add document ID and collection name to each record
    const data = {
      _id: doc.id,
      _collection: collectionName,
      ...doc.data()
    };
    
    // Flatten the document data
    documents.push(flattenObject(data));
  });
  
  return documents;
}

// Main export function
async function exportFirestoreToCSV(): Promise<void> {
  try {
    console.log('Starting Firestore export...');
    
    // Get all collections
    const collections = await db.listCollections();
    const collectionData: Collection[] = [];
    
    // Process each collection
    for (const collectionRef of collections) {
      const collectionName = collectionRef.id;
      console.log(`Processing collection: ${collectionName}`);
      
      const documents = await getCollectionData(collectionName);
      
      if (documents.length > 0) {
        collectionData.push({
          name: collectionName,
          documents
        });
      }
    }
    
    // Combine all documents from all collections
    const allDocuments: FlattenedData[] = [];
    collectionData.forEach(collection => {
      allDocuments.push(...collection.documents);
    });
    
    if (allDocuments.length === 0) {
      console.log('No data found in Firestore.');
      return;
    }
    
    // Get all possible headers from all documents
    const headers = new Set<string>();
    allDocuments.forEach(doc => {
      Object.keys(doc).forEach(key => headers.add(key));
    });
    
    // Create CSV writer
    const csvWriter = createObjectCsvWriter({
      path: path.resolve('./firestore-export.csv'),
      header: Array.from(headers).map(id => ({ id, title: id }))
    });
    
    // Write data to CSV
    await csvWriter.writeRecords(allDocuments);
    
    console.log(`Successfully exported ${allDocuments.length} documents to firestore-export.csv`);
  } catch (error) {
    console.error('Error exporting Firestore data:', error);
  } finally {
    // Terminate the Firebase app
    await admin.app().delete();
  }
}

// Run the export
exportFirestoreToCSV();