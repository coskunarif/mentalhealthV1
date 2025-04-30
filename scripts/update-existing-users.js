const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json'); // Adjust path as needed

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const usersRef = db.collection('users');

async function updateExistingUsers() {
  console.log('Starting update of existing user documents...');

  try {
    // Get all user documents
    const snapshot = await usersRef.get();
    const users = snapshot.docs;

    if (users.length === 0) {
      console.log('No users found in the database.');
      return;
    }

    console.log(`Found ${users.length} user documents.`);

    let updatedCount = 0;
    const batch = db.batch();
    const batchSize = 500; // Firestore limit for batched writes

    for (let i = 0; i < users.length; i++) {
      const userDoc = users[i];
      const userData = userDoc.data();

      // Check if the field exists
      if (userData.initialSurveyCompleted === undefined) {
        const userRef = usersRef.doc(userDoc.id);
        batch.update(userRef, {
          initialSurveyCompleted: false,
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        updatedCount++;
      }

      // Commit batch when it reaches max size or is the last document
      if ((i + 1) % batchSize === 0 || (i + 1) === users.length) {
        await batch.commit();
        console.log(`Committed batch up to document ${i + 1}.`);
        // Start a new batch if there are more documents
        if ((i + 1) < users.length) {
          batch = db.batch();
        }
      }
    }

    console.log(`Finished updating existing user documents. ${updatedCount} documents were updated.`);

  } catch (error) {
    console.error('Error updating existing user documents:', error);
  }
}

updateExistingUsers()
  .then(() => console.log('Script finished.'))
  .catch((error) => console.error('Script failed:', error));