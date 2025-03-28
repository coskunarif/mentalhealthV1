const admin = require('firebase-admin');
// Use the provided path to the service account key
const serviceAccount = require('./serviceAccountKey.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function checkPaths() {
  // Use the confirmed user ID
  const userId = 'sample-emma'; 
  
  console.log(`Testing paths for user: ${userId}`);
  
  // Check user document
  const userDoc = await db.collection('users').doc(userId).get();
  console.log(`User document exists: ${userDoc.exists}`);
  
  // Check meditation progress
  const meditationDoc = await db.collection('users').doc(userId)
    .collection('progress').doc('meditation').get();
  console.log(`Meditation progress exists: ${meditationDoc.exists}`);
  
  // Check progress overview
  const overviewDoc = await db.collection('users').doc(userId)
    .collection('progress').doc('overview').get();
  console.log(`Progress overview exists: ${overviewDoc.exists}`);
  
  // Check activities subcollection
  const activitiesSnapshot = await db.collection('users').doc(userId)
    .collection('activities').limit(1).get();
  console.log(`Activities collection exists with documents: ${!activitiesSnapshot.empty}`);
  
  // List all collections for this user
  const collections = await db.collection('users').doc(userId).listCollections();
  console.log('Collections for this user:');
  collections.forEach(col => console.log(` - ${col.id}`));
}

checkPaths()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error testing paths:', err);
    process.exit(1);
  });
