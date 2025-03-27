// validate-mood-pyramid.js
const admin = require('firebase-admin');

// Initialize Firebase Admin with your service account
// IMPORTANT: Replace './path-to-your-service-account.json' with the actual path
const serviceAccount = require('./serviceAccountKey.json'); // Updated path
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
  // Use a different app name if multiple admin apps are initialized
  // name: 'moodPyramidApp'
}, 'moodPyramidApp'); // Give this initialization a unique name

const db = admin.app('moodPyramidApp').firestore(); // Correct way to get Firestore instance for named app

async function validateMoodPyramidData() {
  console.log('Validating mood pyramid data...');
  let exitCode = 0; // 0 for success, 1 for error/warnings

  try {
    // Get all mood entries
    const moodsSnapshot = await db.collection('moods').get();

    if (moodsSnapshot.empty) {
        console.log('⚠️ No mood entries found in the database. Cannot validate pyramid data.');
        exitCode = 1; // Consider this a warning state
        process.exit(exitCode); // Exit early if no data
    }

    // Group moods by type and collect values
    const moodTypesCount = {};
    const moodValuesByType = {};

    moodsSnapshot.forEach(doc => {
      const moodData = doc.data();
      const moodId = doc.id;

      // Basic validation of the mood entry itself
      if (!moodData || typeof moodData.mood !== 'string' || typeof moodData.value !== 'number') {
          console.log(`⚠️ Skipping mood entry ${moodId} due to missing/invalid mood or value field.`);
          return; // Skip this entry
      }
       if (!(moodData.timestamp instanceof admin.firestore.Timestamp)) {
           console.log(`⚠️ Mood entry ${moodId} has invalid timestamp.`);
           // Decide if this should be an error or just a warning for pyramid validation
       }
       if (typeof moodData.userId !== 'string') {
            console.log(`⚠️ Mood entry ${moodId} has missing or invalid userId.`);
       }


      // Group by mood type
      const moodType = moodData.mood;
      moodTypesCount[moodType] = (moodTypesCount[moodType] || 0) + 1;

      // Track values for each mood type
      if (!moodValuesByType[moodType]) {
        moodValuesByType[moodType] = [];
      }
      moodValuesByType[moodType].push(moodData.value);

    });

    console.log(`\nFound ${Object.keys(moodTypesCount).length} unique mood types across ${moodsSnapshot.size} entries:`);
    Object.entries(moodTypesCount).sort((a, b) => b[1] - a[1]).forEach(([mood, count]) => {
      console.log(`- ${mood}: ${count} entries`);
    });

    // Check for required mood types for the pyramid
    // Note: Ensure this list exactly matches the expected types for the pyramid component
    const requiredMoods = ['Peace', 'Joy', 'Love', 'Reason', 'Acceptance', 'Shame', 'Guilt', 'Apathy', 'Grief', 'Fear', 'Desire', 'Anger', 'Pride', 'Willfulness'];
    const presentMoods = Object.keys(moodTypesCount);
    const missingMoods = requiredMoods.filter(mood => !presentMoods.includes(mood));

    if (missingMoods.length > 0) {
      console.log(`\n⚠️ Missing required mood types for pyramid: ${missingMoods.join(', ')}`);
      exitCode = 1; // Mark as warning/error
    } else {
      console.log(`\n✅ All required mood types for pyramid are present in the dataset`);
    }

    // Check value distributions
    console.log(`\nChecking mood value distributions (expected range 0-100)...`);
    let valuesOutOfRange = false;
    for (const [mood, values] of Object.entries(moodValuesByType)) {
      if (values.length > 0) {
        const min = Math.min(...values);
        const max = Math.max(...values);
        const avg = values.reduce((sum, val) => sum + val, 0) / values.length;

        console.log(`- ${mood}: min=${min}, max=${max}, avg=${avg.toFixed(2)}, count=${values.length}`);

        // Flag any issues with values being outside the expected 0-100 range
        if (min < 0 || max > 100) {
          console.log(`  ⚠️ Values out of expected range (0-100) found for mood: ${mood}`);
          valuesOutOfRange = true;
        }
      } else {
          console.log(`- ${mood}: No valid values recorded.`); // Should not happen if moodTypesCount > 0
      }
    }

    if (valuesOutOfRange) {
        exitCode = 1; // Mark as warning/error
    } else {
        console.log(`\n✅ All recorded mood values are within the expected range (0-100).`);
    }

  } catch (error) {
    console.error('Error validating mood pyramid data:', error);
    exitCode = 1; // Mark as error
  } finally {
    // Ensure the app terminates cleanly
    // admin.app('moodPyramidApp').delete(); // Clean up the specific app instance
    process.exit(exitCode);
  }
}

validateMoodPyramidData();
