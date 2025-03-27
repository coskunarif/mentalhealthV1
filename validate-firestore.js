// validate-firestore.js
const admin = require('firebase-admin');
const fs = require('fs');

// Initialize Firebase Admin with your service account
// IMPORTANT: Replace './path-to-your-service-account.json' with the actual path
const serviceAccount = require('./serviceAccountKey.json'); // Updated path
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function validateFirestore() {
  console.log('Starting Firestore validation...');
  const validation = {
    errors: [],
    warnings: [],
    info: []
  };

  try {
    // Validate each collection
    await validateUsers(validation);
    await validateExercises(validation);
    await validateMeditations(validation);
    await validateMoods(validation);
    await validateSurveys(validation);
    await validateStats(validation);

    // Check for referential integrity
    await validateReferentialIntegrity(validation);

    // Output validation results
    console.log('\n=== VALIDATION RESULTS ===');

    if (validation.errors.length > 0) {
      console.log('\n❌ ERRORS:');
      validation.errors.forEach(err => console.log(`- ${err}`));
    }

    if (validation.warnings.length > 0) {
      console.log('\n⚠️ WARNINGS:');
      validation.warnings.forEach(warn => console.log(`- ${warn}`));
    }

    if (validation.info.length > 0) {
      console.log('\n📝 INFO:');
      validation.info.forEach(info => console.log(`- ${info}`));
    }

    if (validation.errors.length === 0 && validation.warnings.length === 0) {
      console.log('\n✅ All validations passed successfully!');
    }

    // Save validation results to file
    fs.writeFileSync(
      'firestore-validation-results.json',
      JSON.stringify({
        timestamp: new Date().toISOString(),
        results: validation
      }, null, 2)
    );

    console.log('\nValidation results saved to firestore-validation-results.json');
  } catch (error) {
    console.error('Validation error:', error);
  } finally {
    // Use process.exit(0) for successful exit, process.exit(1) for error
    process.exit(validation.errors.length > 0 ? 1 : 0);
  }
}

// Implementation of validation functions
async function validateUsers(validation) {
  console.log('Validating users collection...');
  const usersSnapshot = await db.collection('users').get();

  validation.info.push(`Found ${usersSnapshot.size} user documents`);

  // Check if we have at least some sample users
  if (usersSnapshot.size === 0) {
    validation.errors.push('No users found in the database');
    return;
  }

  // Check each user document
  usersSnapshot.forEach(doc => {
    const userData = doc.data();
    const userId = doc.id;

    // Required fields
    const requiredFields = ['email', 'displayName', 'settings', 'stats'];
    const missingFields = requiredFields.filter(field => !(field in userData)); // Check existence

    if (missingFields.length > 0) {
      validation.errors.push(`User ${userId} is missing required fields: ${missingFields.join(', ')}`);
    }

    // Check nested structures
    if (userData.settings) {
      if (!userData.settings.notifications) {
        validation.warnings.push(`User ${userId} is missing settings.notifications`);
      } else {
        // Further check notification sub-fields if needed
        const requiredNotificationFields = ['reminders', 'progress', 'tips', 'community'];
        const missingNotificationFields = requiredNotificationFields.filter(field => typeof userData.settings.notifications[field] !== 'boolean');
        if (missingNotificationFields.length > 0) {
            validation.warnings.push(`User ${userId} settings.notifications is missing or has invalid type for fields: ${missingNotificationFields.join(', ')}`);
        }
      }

      if (typeof userData.settings.language !== 'string') {
        validation.warnings.push(`User ${userId} is missing or has invalid type for settings.language`);
      }
      if (!['light', 'dark', 'system'].includes(userData.settings.theme)) {
        validation.warnings.push(`User ${userId} has invalid settings.theme: ${userData.settings.theme}`);
      }
    } else {
        validation.errors.push(`User ${userId} is missing the entire settings object`);
    }

    if (userData.stats) {
      const statFields = ['meditationMinutes', 'exercisesCompleted', 'streak', 'surveysCompleted'];
      const missingStats = statFields.filter(field => typeof userData.stats[field] !== 'number'); // Check type

      if (missingStats.length > 0) {
        validation.warnings.push(`User ${userId} is missing or has invalid type for stat fields: ${missingStats.join(', ')}`);
      }
      // Check timestamp type if lastActiveDate exists
      if (userData.stats.lastActiveDate && !(userData.stats.lastActiveDate instanceof admin.firestore.Timestamp)) {
          validation.warnings.push(`User ${userId} has invalid type for stats.lastActiveDate`);
      }
    } else {
        validation.errors.push(`User ${userId} is missing the entire stats object`);
    }

    // Check timestamp types
    if (!(userData.createdAt instanceof admin.firestore.Timestamp)) {
        validation.errors.push(`User ${userId} has invalid or missing createdAt timestamp`);
    }
     if (!(userData.updatedAt instanceof admin.firestore.Timestamp)) {
        validation.errors.push(`User ${userId} has invalid or missing updatedAt timestamp`);
    }
  });
}

async function validateExercises(validation) {
  console.log('Validating exercises collection...');
  const exercisesSnapshot = await db.collection('exercises').get();

  validation.info.push(`Found ${exercisesSnapshot.size} exercise documents`);

  // Check if we have at least some exercises
  if (exercisesSnapshot.size === 0) {
    validation.errors.push('No exercises found in the database');
    return;
  }

  // Check each exercise document
  exercisesSnapshot.forEach(doc => {
    const exerciseData = doc.data();
    const exerciseId = doc.id;

    // Required fields and types
    const requiredFields = {
        title: 'string',
        duration: 'number',
        category: 'string',
        description: 'string',
        order: 'number'
    };
    const missingOrInvalidFields = Object.entries(requiredFields)
        .filter(([field, type]) => typeof exerciseData[field] !== type);

    if (missingOrInvalidFields.length > 0) {
      validation.errors.push(`Exercise ${exerciseId} is missing or has invalid type for fields: ${missingOrInvalidFields.map(([field]) => field).join(', ')}`);
    }

    // Check category values
    const validCategories = ['breathing', 'mindfulness', 'compassion', 'relaxation'];
    if (exerciseData.category && !validCategories.includes(exerciseData.category)) {
      validation.warnings.push(`Exercise ${exerciseId} has an unexpected category: ${exerciseData.category}`);
    }
  });
}

async function validateMeditations(validation) {
  console.log('Validating meditations collection...');
  const meditationsSnapshot = await db.collection('meditations').get();

  validation.info.push(`Found ${meditationsSnapshot.size} meditation documents`);

  // Check if we have at least some meditations
  if (meditationsSnapshot.size === 0) {
    validation.errors.push('No meditations found in the database');
    return;
  }

  // Check each meditation document
  meditationsSnapshot.forEach(doc => {
    const meditationData = doc.data();
    const meditationId = doc.id;

    // Required fields and types
    const requiredFields = {
        title: 'string',
        duration: 'number',
        description: 'string',
        audioUrl: 'string'
    };
     const missingOrInvalidFields = Object.entries(requiredFields)
        .filter(([field, type]) => typeof meditationData[field] !== type);

    if (missingOrInvalidFields.length > 0) {
      validation.errors.push(`Meditation ${meditationId} is missing or has invalid type for fields: ${missingOrInvalidFields.map(([field]) => field).join(', ')}`);
    }

    // Check if audio URL format (optional check, adjust as needed)
    if (meditationData.audioUrl && !meditationData.audioUrl.startsWith('meditations/')) {
      validation.warnings.push(`Meditation ${meditationId} has an unusual audio URL format: ${meditationData.audioUrl}`);
    }
  });
}

async function validateMoods(validation) {
  console.log('Validating moods collection...');
  const moodsSnapshot = await db.collection('moods').get();

  validation.info.push(`Found ${moodsSnapshot.size} mood entry documents`);

  // Check if we have at least some mood entries
  if (moodsSnapshot.size === 0) {
    // Changed to warning as sample data might not be present initially
    validation.warnings.push('No mood entries found in the database. Consider adding sample data.');
    return;
  }

  // Group moods by user to ensure each user has entries
  const moodsByUser = {};

  moodsSnapshot.forEach(doc => {
    const moodData = doc.data();
    const moodId = doc.id;

    // Required fields and types
    const requiredFields = {
        userId: 'string',
        timestamp: admin.firestore.Timestamp,
        mood: 'string',
        value: 'number'
    };
    const missingOrInvalidFields = Object.entries(requiredFields)
        .filter(([field, type]) => {
            if (type === admin.firestore.Timestamp) {
                return !(moodData[field] instanceof admin.firestore.Timestamp);
            }
            return typeof moodData[field] !== type;
        });


    if (missingOrInvalidFields.length > 0) {
      validation.errors.push(`Mood entry ${moodId} is missing or has invalid type for fields: ${missingOrInvalidFields.map(([field]) => field).join(', ')}`);
    }

    // Record user IDs
    if (moodData.userId) {
      moodsByUser[moodData.userId] = (moodsByUser[moodData.userId] || 0) + 1;
    }

    // Check value range
    if (typeof moodData.value === 'number' && (moodData.value < 0 || moodData.value > 100)) {
      validation.warnings.push(`Mood entry ${moodId} has an out-of-range value: ${moodData.value}`);
    }

    // Optional fields type check
    if (moodData.duration !== undefined && typeof moodData.duration !== 'number') {
        validation.warnings.push(`Mood entry ${moodId} has invalid type for optional field 'duration'`);
    }
    if (moodData.factors !== undefined && !Array.isArray(moodData.factors)) {
        validation.warnings.push(`Mood entry ${moodId} has invalid type for optional field 'factors'`);
    }
    if (moodData.notes !== undefined && typeof moodData.notes !== 'string') {
        validation.warnings.push(`Mood entry ${moodId} has invalid type for optional field 'notes'`);
    }
     if (moodData.createdAt !== undefined && !(moodData.createdAt instanceof admin.firestore.Timestamp)) {
        validation.warnings.push(`Mood entry ${moodId} has invalid type for optional field 'createdAt'`);
    }
  });

  // Check for sample data distribution
  validation.info.push(`Mood entries by user: ${JSON.stringify(moodsByUser)}`);
}

async function validateSurveys(validation) {
  console.log('Validating surveys collection...');
  const surveysSnapshot = await db.collection('surveys').get();

  validation.info.push(`Found ${surveysSnapshot.size} survey response documents`);

  // Check if we have at least some survey responses
  if (surveysSnapshot.size === 0) {
    // Changed to warning
    validation.warnings.push('No survey responses found in the database. Consider adding sample data.');
    return;
  }

  surveysSnapshot.forEach(doc => {
    const surveyData = doc.data();
    const surveyId = doc.id;

    // Required fields and types
     const requiredFields = {
        userId: 'string',
        timestamp: admin.firestore.Timestamp,
        responses: 'array' // Use 'array' for Array.isArray check
    };
    const missingOrInvalidFields = Object.entries(requiredFields)
        .filter(([field, type]) => {
            if (type === admin.firestore.Timestamp) {
                return !(surveyData[field] instanceof admin.firestore.Timestamp);
            }
            if (type === 'array') {
                return !Array.isArray(surveyData[field]);
            }
            return typeof surveyData[field] !== type;
        });

    if (missingOrInvalidFields.length > 0) {
      validation.errors.push(`Survey response ${surveyId} is missing or has invalid type/format for fields: ${missingOrInvalidFields.map(([field]) => field).join(', ')}`);
    }

    // Optional fields type check
    if (surveyData.questions !== undefined && !Array.isArray(surveyData.questions)) {
        validation.warnings.push(`Survey response ${surveyId} has invalid type for optional field 'questions'`);
    }
     if (surveyData.createdAt !== undefined && !(surveyData.createdAt instanceof admin.firestore.Timestamp)) {
        validation.warnings.push(`Survey response ${surveyId} has invalid type for optional field 'createdAt'`);
    }
  });
}

async function validateStats(validation) {
  console.log('Validating stats collection...');
  const statsSnapshot = await db.collection('stats').get();

  validation.info.push(`Found ${statsSnapshot.size} stats documents`);

  // Check if we have at least some stats (optional)
  if (statsSnapshot.size === 0) {
    validation.warnings.push('No global stats documents found in the database. This might be expected if stats are aggregated periodically.');
    return;
  }

  statsSnapshot.forEach(doc => {
    const statsData = doc.data();
    const statsId = doc.id; // Often the date, e.g., 'YYYY-MM-DD'

    // Expected fields and types for daily stats
    const expectedFields = {
        date: 'string', // Assuming date is stored as string 'YYYY-MM-DD'
        activeUsers: 'number',
        newUsers: 'number',
        meditationMinutes: 'number',
        exercisesCompleted: 'number',
        surveysCompleted: 'number',
        timestamp: admin.firestore.Timestamp // Record creation/update time
    };
    const missingOrInvalidFields = Object.entries(expectedFields)
        .filter(([field, type]) => {
             if (type === admin.firestore.Timestamp) {
                return !(statsData[field] instanceof admin.firestore.Timestamp);
            }
            return typeof statsData[field] !== type;
        });

    if (missingOrInvalidFields.length > 0) {
      validation.warnings.push(`Stats document ${statsId} is missing or has invalid type for fields: ${missingOrInvalidFields.map(([field]) => field).join(', ')}`);
    }

    // Validate date format if it's the ID or a field
    if (statsData.date && !/^\d{4}-\d{2}-\d{2}$/.test(statsData.date)) {
        validation.warnings.push(`Stats document ${statsId} has invalid date format: ${statsData.date}`);
    }
  });
}

async function validateReferentialIntegrity(validation) {
  console.log('Validating referential integrity...');

  // Get user IDs for reference checking
  const userIds = new Set();
  const usersSnapshot = await db.collection('users').get();
  usersSnapshot.forEach(doc => userIds.add(doc.id));

  if (userIds.size === 0) {
      validation.warnings.push('No users found, cannot check referential integrity.');
      return;
  }

  // Check mood entries reference valid users
  const moodsWithInvalidUser = [];
  const moodsSnapshot = await db.collection('moods').limit(500).get(); // Limit query size for performance

  moodsSnapshot.forEach(doc => {
    const moodData = doc.data();
    if (moodData.userId && !userIds.has(moodData.userId)) {
      moodsWithInvalidUser.push(doc.id);
    }
  });

  if (moodsWithInvalidUser.length > 0) {
    validation.warnings.push(`Found ${moodsWithInvalidUser.length} mood entries (checked up to 500) with invalid user IDs. Example: ${moodsWithInvalidUser.slice(0, 5).join(', ')}`);
  } else if (!moodsSnapshot.empty) {
      validation.info.push('Checked mood entries (up to 500) reference valid users.');
  }

  // Check survey responses reference valid users
  const surveysWithInvalidUser = [];
  const surveysSnapshot = await db.collection('surveys').limit(500).get(); // Limit query size

  surveysSnapshot.forEach(doc => {
    const surveyData = doc.data();
    if (surveyData.userId && !userIds.has(surveyData.userId)) {
      surveysWithInvalidUser.push(doc.id);
    }
  });

  if (surveysWithInvalidUser.length > 0) {
    validation.warnings.push(`Found ${surveysWithInvalidUser.length} survey responses (checked up to 500) with invalid user IDs. Example: ${surveysWithInvalidUser.slice(0, 5).join(', ')}`);
  } else if (!surveysSnapshot.empty) {
      validation.info.push('Checked survey responses (up to 500) reference valid users.');
  }

  // Add more checks here if needed (e.g., user activities referencing users)
}

validateFirestore();
