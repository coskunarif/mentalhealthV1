// validate-radar-data.js
const admin = require('firebase-admin');
const fs = require('fs'); // Although fs is imported, it's not used in this script. Keep for consistency or remove if preferred.

// Initialize Firebase Admin with your service account
// IMPORTANT: Replace './path-to-your-service-account.json' with the actual path
const serviceAccount = require('./serviceAccountKey.json'); // Updated path
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Use a different app name if multiple admin apps are initialized in the same process
  // (Not strictly necessary if running scripts separately)
  // name: 'radarApp'
}, 'radarApp'); // Give this initialization a unique name

const db = admin.app('radarApp').firestore(); // Correct way to get Firestore instance for named app

async function validateRadarData() {
  console.log('Validating radar data...');
  let exitCode = 0; // 0 for success, 1 for error/warnings

  try {
    // Check if required data is present for radar charts
    // 1. Get all exercises to check categories
    const exercisesSnapshot = await db.collection('exercises').get();

    // Extract unique categories
    const categories = new Set();
    exercisesSnapshot.forEach(doc => {
      const data = doc.data();
      if (data.category && typeof data.category === 'string') { // Ensure category is a string
        categories.add(data.category);
      }
    });

    console.log(`Found ${categories.size} unique exercise categories: ${Array.from(categories).join(', ')}`);

    if (categories.size === 0) {
      console.error('⚠️ No exercise categories found - radar chart may not work properly');
      exitCode = 1; // Mark as warning/error
    }

    // 2. Check all users for progress data
    const usersSnapshot = await db.collection('users').get();

    console.log(`\nChecking user progress data for ${usersSnapshot.size} users...`);

    let usersWithNoProgressDoc = 0;
    let usersWithMissingCategoryData = 0;

    for (const userDoc of usersSnapshot.docs) {
      const userId = userDoc.id;

      // Look for progress/overview document in the subcollection
      const progressRef = db.collection('users').doc(userId).collection('progress').doc('overview');
      const progressDoc = await progressRef.get();

      if (!progressDoc.exists) {
        console.log(`⚠️ User ${userId} has no 'progress/overview' document`);
        usersWithNoProgressDoc++;
      } else {
        const progressData = progressDoc.data();

        if (!progressData || typeof progressData.categories !== 'object' || progressData.categories === null || Object.keys(progressData.categories).length === 0) {
          console.log(`⚠️ User ${userId} has missing or invalid 'categories' field in progress data`);
          usersWithMissingCategoryData++;
        } else {
          // Check if all known categories exist and have numeric values in the user's progress
          const missingOrInvalidCategories = Array.from(categories).filter(cat =>
            typeof progressData.categories[cat] !== 'number' // Check if the category exists and is a number
          );

          if (missingOrInvalidCategories.length > 0) {
            console.log(`⚠️ User ${userId} is missing or has non-numeric progress data for categories: ${missingOrInvalidCategories.join(', ')}`);
            usersWithMissingCategoryData++;
          }
        }
         // Check overall progress field
        if (typeof progressData?.overall !== 'number') {
             console.log(`⚠️ User ${userId} has missing or non-numeric 'overall' progress field`);
             // Decide if this counts towards usersWithMissingCategoryData or a separate counter
             if (!usersWithMissingCategoryData && !missingOrInvalidCategories?.length) { // Avoid double counting if categories were already missing
                usersWithMissingCategoryData++;
             }
        }
         // Check lastUpdated timestamp
        if (!(progressData?.lastUpdated instanceof admin.firestore.Timestamp)) {
             console.log(`⚠️ User ${userId} has missing or invalid 'lastUpdated' timestamp in progress data`);
             if (!usersWithMissingCategoryData && !missingOrInvalidCategories?.length) { // Avoid double counting
                usersWithMissingCategoryData++;
             }
        }
      }
    }

    console.log(`\nRadar chart data summary:`);
    console.log(`- Users checked: ${usersSnapshot.size}`);
    console.log(`- Users missing 'progress/overview' document: ${usersWithNoProgressDoc}`);
    console.log(`- Users with missing/invalid category/overall/timestamp data: ${usersWithMissingCategoryData}`);

    if (usersWithNoProgressDoc > 0 || usersWithMissingCategoryData > 0) {
      console.log(`\n⚠️ Consider running 'add-missing-data.js' to add sample progress data for users to properly display radar charts`);
      exitCode = 1; // Mark as warning/error
    } else if (usersSnapshot.size > 0) {
      console.log(`\n✅ All users appear to have complete radar chart data structure`);
    } else {
        console.log(`\nℹ️ No users found to validate radar data against.`);
    }

  } catch (error) {
    console.error('Error validating radar data:', error);
    exitCode = 1; // Mark as error
  } finally {
    // Ensure the app terminates cleanly
    // admin.app('radarApp').delete(); // Clean up the specific app instance
    process.exit(exitCode);
  }
}

validateRadarData();
