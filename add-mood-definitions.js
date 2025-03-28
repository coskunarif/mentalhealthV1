// add-mood-definitions.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Adjust path if needed

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // Add your databaseURL if needed, e.g.:
    // databaseURL: "https://your-project-id.firebaseio.com"
  });
  console.log('Firebase Admin SDK initialized successfully.');
} catch (error) {
  if (error.code === 'app/duplicate-app') {
    console.log('Firebase Admin SDK already initialized.');
    // Use the existing default app instance
    // admin.app(); // This line is not needed, admin SDK handles this
  } else {
    console.error('Firebase Admin SDK initialization error:', error);
    process.exit(1);
  }
}


const db = admin.firestore();
const moodDefinitionsCollection = db.collection('moodDefinitions');

// Data based on MoodDefinition model, theme.moodColors, and IconName type
const moodDefinitionsData = [
  { name: 'Shame',       key: 'shame',       icon: 'emoticon-sad'     },
  { name: 'Guilt',       key: 'guilt',       icon: 'emoticon-confused'},
  { name: 'Apathy',      key: 'apathy',      icon: 'emoticon-neutral' },
  { name: 'Grief',       key: 'grief',       icon: 'emoticon-cry'     },
  { name: 'Fear',        key: 'fear',        icon: 'emoticon-frown'   }, // 'emoticon-scared' not valid, using 'emoticon-frown'
  { name: 'Desire',      key: 'desire',      icon: 'emoticon-excited' },
  { name: 'Anger',       key: 'anger',       icon: 'emoticon-angry'   },
  { name: 'Pride',       key: 'pride',       icon: 'emoticon-cool'    },
  { name: 'Willfulness', key: 'willfulness', icon: 'emoticon-happy'   }, // 'emoticon-confident' not valid, using 'emoticon-happy'
  // Add other definitions if needed, ensuring key exists in theme.moodColors and icon in IconName
  { name: 'Peace',       key: 'peace',       icon: 'emoticon-happy'   }, // Added from theme
  { name: 'Joy',         key: 'joy',         icon: 'emoticon-excited' }, // Added from theme
  { name: 'Love',        key: 'love',        icon: 'emoticon-happy'   }, // Added from theme
  { name: 'Reason',      key: 'reason',      icon: 'emoticon-neutral' }, // Added from theme
  { name: 'Acceptance',  key: 'acceptance',  icon: 'emoticon-happy'   }, // Added from theme
];

async function addMoodDefinitions() {
  console.log(`Attempting to add ${moodDefinitionsData.length} mood definitions...`);
  const batch = db.batch();
  let count = 0;

  for (const definition of moodDefinitionsData) {
    // Use the 'name' field as the document ID for simplicity and uniqueness
    const docRef = moodDefinitionsCollection.doc(definition.name.toLowerCase().replace(/\s+/g, '-'));
    batch.set(docRef, definition);
    count++;
    console.log(`  Added ${definition.name} to batch.`);
  }

  try {
    await batch.commit();
    console.log(`Successfully added ${count} mood definitions to the 'moodDefinitions' collection.`);
  } catch (error) {
    console.error('Error committing batch:', error);
    // Attempt to provide more specific error details if available
    if (error.details) {
      console.error('Error details:', error.details);
    }
     if (error.code) {
       console.error(`Firestore Error Code: ${error.code}`);
     }
    process.exit(1); // Exit with error code
  }
}

addMoodDefinitions().catch(error => {
  console.error('Unhandled error during script execution:', error);
  process.exit(1);
});
