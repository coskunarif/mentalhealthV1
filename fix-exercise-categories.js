// Script to fix exerciseCategories collection
// 1. Recreate balanceMemories document
// 2. Remove consciousnessRange field from all documents

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function fixExerciseCategories() {
  try {
    console.log('Starting to fix exerciseCategories collection...');
    
    // 1. Recreate balanceMemories document
    console.log('Recreating balanceMemories document...');
    await db.collection('exerciseCategories').doc('balanceMemories').set({
      name: 'Balance Memories',
      description: 'Helps users process and balance past experiences.',
      id: 'balanceMemories',
      order: 1
    });
    console.log('Successfully recreated balanceMemories document');
    
    // 2. Remove consciousnessRange field from all documents
    console.log('Removing consciousnessRange field from all documents...');
    const snapshot = await db.collection('exerciseCategories').get();
    
    // Create a batch to perform multiple writes
    const batch = db.batch();
    
    // For each document, update it to remove the consciousnessRange field
    snapshot.docs.forEach(doc => {
      batch.update(doc.ref, {
        consciousnessRange: admin.firestore.FieldValue.delete()
      });
    });
    
    // Commit the batch
    await batch.commit();
    
    console.log(`Successfully removed consciousnessRange field from ${snapshot.size} documents`);
    console.log('All operations completed successfully!');
  } catch (error) {
    console.error('Error fixing exerciseCategories collection:', error);
  } finally {
    // Exit the process
    process.exit(0);
  }
}

// Run the function
fixExerciseCategories();
