// Script to remove functionCategories field from all exercises documents
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function removeFunctionCategoriesField() {
  try {
    console.log('Starting to remove functionCategories field from exercises collection...');
    
    // Get all documents from exercises collection
    const snapshot = await db.collection('exercises').get();
    
    // Create a batch to perform multiple writes
    const batch = db.batch();
    
    // Count documents that have the field
    let count = 0;
    
    // For each document, update it to remove the functionCategories field if it exists
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      if ('functionCategories' in data) {
        batch.update(doc.ref, {
          functionCategories: admin.firestore.FieldValue.delete()
        });
        count++;
      }
    });
    
    if (count === 0) {
      console.log('No documents found with functionCategories field. Nothing to update.');
      process.exit(0);
      return;
    }
    
    // Commit the batch
    await batch.commit();
    
    console.log(`Successfully removed functionCategories field from ${count} documents`);
    console.log('All operations completed successfully!');
  } catch (error) {
    console.error('Error removing functionCategories field:', error);
  } finally {
    // Exit the process
    process.exit(0);
  }
}

// Run the function
removeFunctionCategoriesField();
