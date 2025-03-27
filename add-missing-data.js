// add-missing-data.js
const admin = require('firebase-admin');
// fs is not used in this script, so it's removed.

// Initialize Firebase Admin with your service account
// IMPORTANT: Replace './path-to-your-service-account.json' with the actual path
const serviceAccount = require('./serviceAccountKey.json'); // Updated path
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
  // Use a different app name if multiple admin apps are initialized
  // name: 'addMissingDataApp'
}, 'addMissingDataApp'); // Give this initialization a unique name

const db = admin.app('addMissingDataApp').firestore(); // Correct way to get Firestore instance for named app

async function addMissingData() {
  console.log('Checking for missing data and adding samples...');
  let exitCode = 0; // 0 for success, 1 for error

  try {
    // 1. Check for required exercises
    await addExercisesIfNeeded();

    // 2. Check for required meditations
    await addMeditationsIfNeeded();

    // 3. Add user progress data for radar charts
    await addUserProgressIfNeeded();

    console.log('\n✅ Completed data check and potential sample data addition.');

  } catch (error) {
    console.error('Error adding missing data:', error);
    exitCode = 1; // Mark as error
  } finally {
    // Ensure the app terminates cleanly
    // admin.app('addMissingDataApp').delete(); // Clean up the specific app instance
    process.exit(exitCode);
  }
}

async function addExercisesIfNeeded() {
  console.log('\nChecking exercises collection...');
  const exercisesRef = db.collection('exercises');
  const exercisesSnapshot = await exercisesRef.limit(1).get(); // Check if collection is empty efficiently

  if (exercisesSnapshot.empty) {
    console.log('No exercises found, adding sample exercises...');

    const sampleExercises = [
      {
        id: 'exercise-1',
        title: 'Mindful Breathing',
        duration: 5, // minutes
        category: 'breathing',
        description: 'Focus on your breath for 5 minutes to calm your mind and body.',
        order: 0
      },
      {
        id: 'exercise-2',
        title: 'Body Scan',
        duration: 10, // minutes
        category: 'mindfulness',
        description: 'Systematically scan your body to release tension and increase awareness.',
        order: 1
      },
      {
        id: 'exercise-3',
        title: 'Loving-Kindness',
        duration: 15, // minutes
        category: 'compassion',
        description: 'Develop feelings of goodwill and kindness toward yourself and others.',
        order: 2
      },
      {
        id: 'exercise-4',
        title: 'Stress Relief Breathing', // More specific title
        duration: 8, // minutes
        category: 'breathing',
        description: 'Relieve stress with deep breathing and guided visualization.',
        order: 3
      },
      {
        id: 'exercise-5',
        title: 'Sleep Preparation Relaxation', // More specific title
        duration: 20, // minutes
        category: 'relaxation',
        description: 'Relax your body and mind to prepare for restful sleep.',
        order: 4
      }
    ];

    // Add exercises with specific IDs using a batch write
    const batch = db.batch();

    for (const exercise of sampleExercises) {
      const { id, ...data } = exercise; // Separate ID from data
      const docRef = exercisesRef.doc(id); // Use the specific ID
      batch.set(docRef, data);
    }

    await batch.commit();
    console.log(`Added ${sampleExercises.length} sample exercises.`);
  } else {
    // Optionally, query the actual size if needed for info, but limit(1) is faster for just checking emptiness
    const countSnapshot = await exercisesRef.count().get();
    console.log(`Found ${countSnapshot.data().count} existing exercises. No sample data added.`);
  }
}

async function addMeditationsIfNeeded() {
  console.log('\nChecking meditations collection...');
  const meditationsRef = db.collection('meditations');
  const meditationsSnapshot = await meditationsRef.limit(1).get(); // Check if empty

  if (meditationsSnapshot.empty) {
    console.log('No meditations found, adding sample meditations...');

    const sampleMeditations = [
      {
        id: 'meditation-1',
        title: 'Morning Energizer',
        duration: 10, // minutes
        description: 'Start your day with energy and positivity.',
        audioUrl: 'meditations/sample.mp3' // Placeholder URL
      },
      {
        id: 'meditation-2',
        title: 'Anxiety Relief',
        duration: 15, // minutes
        description: 'Calm anxious thoughts and find peace.',
        audioUrl: 'meditations/sample.mp3' // Placeholder URL
      },
      {
        id: 'meditation-3',
        title: 'Deep Focus',
        duration: 8, // minutes
        description: 'Enhance concentration and mental clarity.',
        audioUrl: 'meditations/sample.mp3' // Placeholder URL
      },
      {
        id: 'meditation-4',
        title: 'Bedtime Relaxation',
        duration: 20, // minutes
        description: 'Prepare your mind and body for restful sleep.',
        audioUrl: 'meditations/sample.mp3' // Placeholder URL
      },
      {
        id: 'meditation-5',
        title: 'Quick Reset',
        duration: 5, // minutes
        description: 'Refresh your mind in just 5 minutes.',
        audioUrl: 'meditations/sample.mp3' // Placeholder URL
      }
    ];

    // Add meditations with specific IDs using a batch write
    const batch = db.batch();

    for (const meditation of sampleMeditations) {
      const { id, ...data } = meditation; // Separate ID from data
      const docRef = meditationsRef.doc(id); // Use the specific ID
      batch.set(docRef, data);
    }

    await batch.commit();
    console.log(`Added ${sampleMeditations.length} sample meditations.`);
  } else {
    const countSnapshot = await meditationsRef.count().get();
    console.log(`Found ${countSnapshot.data().count} existing meditations. No sample data added.`);
  }
}

async function addUserProgressIfNeeded() {
  console.log('\nChecking user progress data (users/{userId}/progress/overview)...');

  // Get all users
  const usersSnapshot = await db.collection('users').get();

  if (usersSnapshot.empty) {
    console.log('No users found. Cannot add progress data.');
    return;
  }

  let updatedUsersCount = 0;
  let createdProgressDocsCount = 0;

  // Get all exercise categories to ensure progress data includes all relevant categories
  const exercisesSnapshot = await db.collection('exercises').get();
  const categories = new Set();

  exercisesSnapshot.forEach(doc => {
    const data = doc.data();
    if (data.category && typeof data.category === 'string') {
      categories.add(data.category);
    }
  });

  const categoryArray = Array.from(categories);

  if (categoryArray.length === 0) {
    console.log('⚠️ No exercise categories found in the exercises collection. Cannot create meaningful progress data.');
    // Decide if this is an error or just a warning. Progress data might be less useful without categories.
    // return; // Optionally stop if categories are essential
  } else {
      console.log(`Using categories for progress data: ${categoryArray.join(', ')}`);
  }

  // Check each user for progress data
  const batch = db.batch(); // Use a batch for potentially many updates/creates

  for (const userDoc of usersSnapshot.docs) {
    const userId = userDoc.id;
    const progressRef = db.collection('users').doc(userId).collection('progress').doc('overview');
    const progressDoc = await progressRef.get();

    if (!progressDoc.exists) {
      console.log(`User ${userId}: No 'progress/overview' document found. Creating sample data...`);

      // Create sample progress data with random values for each category
      const progressData = {
        overall: Math.floor(Math.random() * 70) + 10, // Random overall score 10-80
        categories: {},
        lastUpdated: admin.firestore.FieldValue.serverTimestamp() // Use server timestamp
      };

      // Add random progress (10-90) for each known category
      categoryArray.forEach(category => {
        progressData.categories[category] = Math.floor(Math.random() * 80) + 10;
      });

      batch.set(progressRef, progressData); // Add set operation to batch
      createdProgressDocsCount++;

    } else {
      const data = progressDoc.data();
      let needsUpdate = false;
      const updatedCategories = { ...(data?.categories || {}) }; // Start with existing categories or empty object

      // Check if 'overall' field exists and is a number
      if (typeof data?.overall !== 'number') {
          console.log(`User ${userId}: Missing or invalid 'overall' field. Adding sample value.`);
          updatedCategories.overall = Math.floor(Math.random() * 70) + 10; // Add overall if missing
          needsUpdate = true;
      }

      // Check if all known categories exist in the user's progress data and are numbers
      categoryArray.forEach(category => {
        if (typeof updatedCategories[category] !== 'number') {
          console.log(`User ${userId}: Missing or invalid progress for category '${category}'. Adding sample value.`);
          updatedCategories[category] = Math.floor(Math.random() * 80) + 10; // Add random value for missing category
          needsUpdate = true;
        }
      });

      // Check if 'lastUpdated' field exists and is a timestamp
       if (!(data?.lastUpdated instanceof admin.firestore.Timestamp)) {
           console.log(`User ${userId}: Missing or invalid 'lastUpdated' timestamp. Adding server timestamp.`);
           needsUpdate = true; // Ensure we update the timestamp
       }


      if (needsUpdate) {
        console.log(`User ${userId}: Updating progress data...`);
        const updateData = {
            categories: updatedCategories,
            lastUpdated: admin.firestore.FieldValue.serverTimestamp() // Always update timestamp on modification
        };
        // Add overall field only if it was missing/invalid
        if (typeof data?.overall !== 'number') {
            updateData.overall = Math.floor(Math.random() * 70) + 10;
        }

        batch.update(progressRef, updateData); // Add update operation to batch
        updatedUsersCount++;
      }
    }
  }

  // Commit the batch write
  if (createdProgressDocsCount > 0 || updatedUsersCount > 0) {
      await batch.commit();
      console.log(`\nProgress data update summary:`);
      console.log(`- Created 'progress/overview' documents for ${createdProgressDocsCount} users.`);
      console.log(`- Updated existing 'progress/overview' documents for ${updatedUsersCount} users.`);
  } else {
      console.log(`\nNo user progress data needed creation or updates.`);
  }
}

addMissingData();
