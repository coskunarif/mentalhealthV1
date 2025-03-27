// validate-user-activities.js
const admin = require('firebase-admin');

// Initialize Firebase Admin with your service account
// IMPORTANT: Replace './path-to-your-service-account.json' with the actual path
const serviceAccount = require('./serviceAccountKey.json'); // Updated path
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
  // Use a different app name if multiple admin apps are initialized
  // name: 'userActivitiesApp'
}, 'userActivitiesApp'); // Give this initialization a unique name

const db = admin.app('userActivitiesApp').firestore(); // Correct way to get Firestore instance for named app

async function validateUserActivities() {
  console.log('Validating user activities...');
  let exitCode = 0; // 0 for success, 1 for error/warnings

  try {
    // Get all users
    const usersSnapshot = await db.collection('users').get();

    if (usersSnapshot.empty) {
        console.log('ℹ️ No users found to validate activities for.');
        process.exit(exitCode); // Exit successfully if no users
    }

    let usersWithNoActivities = 0;
    const activityTypesByUser = {};
    let usersWithMissingActivityTypes = 0;
    let usersWithInvalidActivityData = 0;

    console.log(`\nChecking 'activities' subcollection for ${usersSnapshot.size} users...`);

    for (const userDoc of usersSnapshot.docs) {
      const userId = userDoc.id;

      // Get activities for this user from the subcollection
      const activitiesRef = db.collection('users').doc(userId).collection('activities');
      const activitiesSnapshot = await activitiesRef.limit(500).get(); // Limit query size for performance

      if (activitiesSnapshot.empty) {
        console.log(`ℹ️ User ${userId} has no activity records in the subcollection.`);
        // This might be normal for new users, consider if it's a warning or info
        usersWithNoActivities++;
      } else {
        // Count activity types and validate structure
        const types = {};
        let hasInvalidData = false;

        activitiesSnapshot.forEach(doc => {
          const activity = doc.data();
          const activityId = doc.id;

          // Basic validation for required fields and types
          const expectedType = typeof activity?.type === 'string';
          const expectedTimestamp = activity?.timestamp instanceof admin.firestore.Timestamp;

          if (!expectedType || !expectedTimestamp) {
              console.log(`⚠️ User ${userId}, Activity ${activityId}: Missing or invalid 'type' or 'timestamp'. Type: ${activity?.type}, Timestamp: ${activity?.timestamp}`);
              hasInvalidData = true;
              return; // Skip further processing for this invalid activity
          }

          // Validate activity type enum
          const validTypes = ['meditation', 'exercise', 'mood', 'survey'];
          if (!validTypes.includes(activity.type)) {
              console.log(`⚠️ User ${userId}, Activity ${activityId}: Invalid activity type '${activity.type}'.`);
              hasInvalidData = true;
              // Still count it for reporting purposes if needed, or skip
          }

          // Validate optional fields if present
          if (activity.date !== undefined && typeof activity.date !== 'string') {
               console.log(`⚠️ User ${userId}, Activity ${activityId}: Invalid 'date' field type.`);
               hasInvalidData = true;
          }
           if (activity.details !== undefined && typeof activity.details !== 'object') {
               console.log(`⚠️ User ${userId}, Activity ${activityId}: Invalid 'details' field type.`);
               hasInvalidData = true;
           } else if (activity.details) {
               // Optionally validate specific fields within details
               if (activity.details.title !== undefined && typeof activity.details.title !== 'string') {
                   console.log(`⚠️ User ${userId}, Activity ${activityId}: Invalid 'details.title' field type.`);
                   hasInvalidData = true;
               }
               if (activity.details.duration !== undefined && typeof activity.details.duration !== 'number') {
                   console.log(`⚠️ User ${userId}, Activity ${activityId}: Invalid 'details.duration' field type.`);
                   hasInvalidData = true;
               }
           }


          // Count valid activity types
          types[activity.type] = (types[activity.type] || 0) + 1;
        });

        if (hasInvalidData) {
            usersWithInvalidActivityData++;
        }

        activityTypesByUser[userId] = types;
        console.log(`User ${userId} has ${activitiesSnapshot.size} activities (checked up to 500): ${JSON.stringify(types)}`);
      }
    }

    console.log(`\nActivity summary:`);
    console.log(`- Users checked: ${usersSnapshot.size}`);
    console.log(`- Users with no activities found: ${usersWithNoActivities}`);
    console.log(`- Users with at least one invalid activity record: ${usersWithInvalidActivityData}`);


    // Check if all expected activity types are present across users who have activities
    const expectedTypes = ['meditation', 'exercise', 'mood', 'survey'];
    let allUsersHaveAllTypes = true;

    for (const [userId, types] of Object.entries(activityTypesByUser)) {
      const missingTypes = expectedTypes.filter(type => !types[type]); // Check if count is > 0
      if (missingTypes.length > 0) {
        console.log(`- User ${userId} is missing recorded activity types: ${missingTypes.join(', ')}`);
        allUsersHaveAllTypes = false;
        usersWithMissingActivityTypes++;
      }
    }

     console.log(`- Users (with activities) missing some expected activity types: ${usersWithMissingActivityTypes}`);

    if (usersWithInvalidActivityData > 0) {
        console.log(`\n⚠️ Found invalid activity data for ${usersWithInvalidActivityData} users.`);
        exitCode = 1;
    }

    if (!allUsersHaveAllTypes && Object.keys(activityTypesByUser).length > 0) { // Only warn if there are users with activities
      console.log(`\n⚠️ Some users with activities are missing records for all expected types.`);
      // Decide if this is a warning or error state
      exitCode = 1; // Consider it a warning/potential issue
    } else if (Object.keys(activityTypesByUser).length > 0) {
      console.log(`\n✅ All users with recorded activities have entries for all expected activity types.`);
    } else if (usersWithNoActivities === usersSnapshot.size) {
        console.log(`\nℹ️ No users have any recorded activities.`);
    }


  } catch (error) {
    console.error('Error validating user activities:', error);
    exitCode = 1; // Mark as error
  } finally {
    // Ensure the app terminates cleanly
    // admin.app('userActivitiesApp').delete(); // Clean up the specific app instance
    process.exit(exitCode);
  }
}

validateUserActivities();
