const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// This function can be deployed as an HTTP callable function
exports.removeConsciousnessRange = functions.https.onRequest(async (req, res) => {
  try {
    const db = admin.firestore();
    const batch = db.batch();
    
    // Get all documents from exerciseCategories collection
    const snapshot = await db.collection('exerciseCategories').get();
    
    // For each document, update it to remove the consciousnessRange field
    snapshot.docs.forEach(doc => {
      batch.update(doc.ref, {
        consciousnessRange: admin.firestore.FieldValue.delete()
      });
    });
    
    // Commit the batch
    await batch.commit();
    
    res.status(200).send(`Successfully removed consciousnessRange field from ${snapshot.size} documents`);
  } catch (error) {
    console.error('Error removing consciousnessRange field:', error);
    res.status(500).send(`Error: ${error.message}`);
  }
});
