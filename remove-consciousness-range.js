// Script to remove consciousnessRange field from all exerciseCategories documents
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Path to your Firebase service account key

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function removeConsciousnessRangeField() {
  try {
    // Get all documents from exerciseCategories collection
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
  } catch (error) {
    console.error('Error removing consciousnessRange field:', error);
  } finally {
    // Exit the process
    process.exit(0);
  }
}

// Run the function
removeConsciousnessRangeField();
