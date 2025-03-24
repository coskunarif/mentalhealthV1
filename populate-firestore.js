const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // You'll need to download this

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;
const Timestamp = admin.firestore.Timestamp;

// Helper function to create a timestamp for a specific date
const createTimestamp = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return Timestamp.fromDate(date);
};

// Helper to get random item from array
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

// Helper to get random number in range
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Sample users
const sampleUsers = [
  { email: 'john@example.com', displayName: 'John Smith', password: 'password123' },
  { email: 'emma@example.com', displayName: 'Emma Wilson', password: 'password123' },
  { email: 'michael@example.com', displayName: 'Michael Brown', password: 'password123' },
  { email: 'sophia@example.com', displayName: 'Sophia Lee', password: 'password123' },
  { email: 'david@example.com', displayName: 'David Johnson', password: 'password123' }
];

// Sample exercises
const sampleExercises = [
  {
    title: 'Mindful Breathing',
    duration: 5,
    category: 'breathing',
    description: 'Focus on your breath for 5 minutes to calm your mind and body.'
  },
  {
    title: 'Body Scan',
    duration: 10,
    category: 'mindfulness',
    description: 'Systematically scan your body to release tension and increase awareness.'
  },
  {
    title: 'Loving-Kindness',
    duration: 15,
    category: 'compassion',
    description: 'Develop feelings of goodwill and kindness toward yourself and others.'
  },
  {
    title: 'Stress Relief',
    duration: 8,
    category: 'breathing',
    description: 'Relieve stress with deep breathing and guided visualization.'
  },
  {
    title: 'Sleep Preparation',
    duration: 20,
    category: 'relaxation',
    description: 'Relax your body and mind to prepare for restful sleep.'
  }
];

// Sample meditations
const sampleMeditations = [
  {
    title: 'Morning Energizer',
    description: 'Start your day with energy and positivity',
    duration: 10,
    audioUrl: 'meditations/sample.mp3'
  },
  {
    title: 'Anxiety Relief',
    description: 'Calm anxious thoughts and find peace',
    duration: 15,
    audioUrl: 'meditations/sample.mp3'
  },
  {
    title: 'Deep Focus',
    description: 'Enhance concentration and mental clarity',
    duration: 8,
    audioUrl: 'meditations/sample.mp3'
  },
  {
    title: 'Bedtime Relaxation',
    description: 'Prepare your mind and body for restful sleep',
    duration: 20,
    audioUrl: 'meditations/sample.mp3'
  },
  {
    title: 'Quick Reset',
    description: 'Refresh your mind in just 5 minutes',
    duration: 5,
    audioUrl: 'meditations/sample.mp3'
  }
];

// Sample moods
const moodTypes = [
  { label: 'Peace', key: 'peace', value: getRandomNumber(70, 100) },
  { label: 'Joy', key: 'joy', value: getRandomNumber(70, 100) },
  { label: 'Love', key: 'love', value: getRandomNumber(70, 100) },
  { label: 'Reason', key: 'reason', value: getRandomNumber(70, 100) },
  { label: 'Acceptance', key: 'acceptance', value: getRandomNumber(70, 100) },
  { label: 'Shame', key: 'shame', value: getRandomNumber(20, 50) },
  { label: 'Guilt', key: 'guilt', value: getRandomNumber(20, 50) },
  { label: 'Apathy', key: 'apathy', value: getRandomNumber(30, 60) },
  { label: 'Grief', key: 'grief', value: getRandomNumber(20, 50) },
  { label: 'Fear', key: 'fear', value: getRandomNumber(20, 50) },
  { label: 'Desire', key: 'desire', value: getRandomNumber(50, 80) },
  { label: 'Anger', key: 'anger', value: getRandomNumber(20, 40) },
  { label: 'Pride', key: 'pride', value: getRandomNumber(60, 90) },
  { label: 'Willfulness', key: 'willfulness', value: getRandomNumber(50, 80) }
];

const moodFactors = [
  'Work stress', 'Family time', 'Good sleep', 'Exercise', 'Social activity',
  'Poor sleep', 'Healthy meal', 'Meditation', 'Time in nature', 'Relaxation',
  'Conflict', 'Achievement', 'Good weather', 'Creative activity'
];

// Create users and their profiles
async function createUsers() {
  console.log('Creating users...');
  const now = Timestamp.now();
  const batch = db.batch();
  
  for (const user of sampleUsers) {
    try {
      // Normally we would create auth users, but for sample data we'll just create documents
      // with predefined UIDs to avoid auth setup requirements
      const userId = `sample-${user.email.split('@')[0]}`;
      const userRef = db.collection('users').doc(userId);
      
      // Create user profile
      batch.set(userRef, {
        uid: userId,
        email: user.email,
        displayName: user.displayName,
        photoURL: '',
        createdAt: now,
        updatedAt: now,
        settings: {
          notifications: {
            reminders: true,
            progress: true,
            tips: true,
            community: Math.random() > 0.5
          },
          language: 'en',
          theme: 'light'
        },
        stats: {
          meditationMinutes: 0,
          exercisesCompleted: 0,
          streak: getRandomNumber(0, 7),
          surveysCompleted: 0,
          lastActiveDate: createTimestamp(getRandomNumber(0, 3))
        },
        subscription: {
          plan: getRandomItem(['No active plan', 'Monthly Plan', 'Annual Plan']),
          price: getRandomItem(['', '$9.99/month', '$99.99/year'])
        }
      });
      
      // Create meditation progress document
      const meditationRef = db.collection('users').doc(userId)
        .collection('progress').doc('meditation');
      batch.set(meditationRef, {
        userId: userId,
        totalTime: 0,
        sessions: 0,
        createdAt: now,
        updatedAt: now
      });
      
      // Create overview progress document
      const overviewRef = db.collection('users').doc(userId)
        .collection('progress').doc('overview');
      batch.set(overviewRef, {
        overall: 0,
        categories: {},
        lastUpdated: now
      });
      
      console.log(`Created user: ${user.displayName} (${userId})`);
    } catch (error) {
      console.error(`Error creating user ${user.email}:`, error);
    }
  }
  
  await batch.commit();
  console.log('Users created successfully');
}

// Create exercises
async function createExercises() {
  console.log('Creating exercises...');
  
  for (let i = 0; i < sampleExercises.length; i++) {
    const exercise = sampleExercises[i];
    try {
      await db.collection('exercises').doc(`exercise-${i+1}`).set({
        id: `exercise-${i+1}`,
        title: exercise.title,
        duration: exercise.duration,
        category: exercise.category,
        description: exercise.description,
        order: i,
        isCompleted: false
      });
      console.log(`Created exercise: ${exercise.title}`);
    } catch (error) {
      console.error(`Error creating exercise ${exercise.title}:`, error);
    }
  }
  
  console.log('Exercises created successfully');
}

// Create meditations
async function createMeditations() {
  console.log('Creating meditations...');
  
  for (let i = 0; i < sampleMeditations.length; i++) {
    const meditation = sampleMeditations[i];
    try {
      await db.collection('meditations').doc(`meditation-${i+1}`).set({
        id: `meditation-${i+1}`,
        title: meditation.title,
        description: meditation.description,
        duration: meditation.duration,
        audioUrl: meditation.audioUrl
      });
      console.log(`Created meditation: ${meditation.title}`);
    } catch (error) {
      console.error(`Error creating meditation ${meditation.title}:`, error);
    }
  }
  
  console.log('Meditations created successfully');
}

// Create mood entries
async function createMoodEntries() {
  console.log('Creating mood entries...');
  let batch = db.batch();
  let batchCount = 0;
  let totalCreated = 0;
  
  // For each user
  for (const user of sampleUsers) {
    const userId = `sample-${user.email.split('@')[0]}`;
    
    // Create mood entries for the past 30 days
    for (let day = 0; day < 30; day++) {
      // Some days might have no entries
      if (Math.random() > 0.7 && day > 5) continue;
      
      // Each day might have 1-3 mood entries
      const entriesCount = Math.floor(Math.random() * 3) + 1;
      
      for (let entry = 0; entry < entriesCount; entry++) {
        const mood = getRandomItem(moodTypes);
        const timestamp = createTimestamp(day);
        
        // Add random hour to timestamp to space out entries
        const date = timestamp.toDate();
        date.setHours(getRandomNumber(8, 21), getRandomNumber(0, 59));
        const adjustedTimestamp = Timestamp.fromDate(date);
        
        // Random factors (0-3)
        const factorCount = Math.floor(Math.random() * 4);
        let factors = [];
        for (let i = 0; i < factorCount; i++) {
          factors.push(getRandomItem(moodFactors));
        }
        // Remove duplicates
        factors = [...new Set(factors)];
        
        const moodRef = db.collection('moods').doc();
        batch.set(moodRef, {
          userId: userId,
          timestamp: adjustedTimestamp,
          mood: mood.label,
          value: mood.value,
          duration: getRandomNumber(0, 100),
          factors: factors,
          notes: Math.random() > 0.7 ? 'Some notes about how I\'m feeling today.' : ''
        });
        
        batchCount++;
        totalCreated++;
        
        // Commit batch every 500 operations
        if (batchCount >= 500) {
          await batch.commit();
          batch = db.batch();
          batchCount = 0;
          console.log(`Committed batch, created ${totalCreated} mood entries so far.`);
        }
      }
    }
  }
  
  // Commit any remaining operations
  if (batchCount > 0) {
    await batch.commit();
  }
  
  console.log(`Created ${totalCreated} mood entries successfully`);
}

// Create user activities
async function createUserActivities() {
  console.log('Creating user activities...');
  let batch = db.batch();
  let batchCount = 0;
  let totalCreated = 0;
  
  // For each user
  for (const user of sampleUsers) {
    const userId = `sample-${user.email.split('@')[0]}`;
    
    // Create activities for the past 14 days
    for (let day = 0; day < 14; day++) {
      // Some days might have no activities
      if (Math.random() > 0.7 && day > 3) continue;
      
      // Each day might have different types of activities
      
      // Meditation activities (70% chance)
      if (Math.random() < 0.7) {
        const meditation = getRandomItem(sampleMeditations);
        const timestamp = createTimestamp(day);
        
        // Add random hour to timestamp
        const date = timestamp.toDate();
        date.setHours(getRandomNumber(8, 21), getRandomNumber(0, 59));
        const adjustedTimestamp = Timestamp.fromDate(date);
        
        const activityRef = db.collection('users').doc(userId)
          .collection('activities').doc();
        
        batch.set(activityRef, {
          userId: userId,
          type: 'meditation',
          timestamp: adjustedTimestamp,
          date: adjustedTimestamp.toDate().toISOString().split('T')[0],
          details: {
            title: meditation.title,
            subtitle: `${meditation.duration} min meditation`,
            duration: meditation.duration
          }
        });
        
        batchCount++;
        totalCreated++;
      }
      
      // Exercise activities (60% chance)
      if (Math.random() < 0.6) {
        const exercise = getRandomItem(sampleExercises);
        const timestamp = createTimestamp(day);
        
        // Add random hour to timestamp (different from meditation)
        const date = timestamp.toDate();
        date.setHours(getRandomNumber(8, 21), getRandomNumber(0, 59));
        const adjustedTimestamp = Timestamp.fromDate(date);
        
        const activityRef = db.collection('users').doc(userId)
          .collection('activities').doc();
        
        batch.set(activityRef, {
          userId: userId,
          type: 'exercise',
          timestamp: adjustedTimestamp,
          date: adjustedTimestamp.toDate().toISOString().split('T')[0],
          details: {
            title: exercise.title,
            subtitle: `${exercise.duration} min ${exercise.category} exercise`,
            duration: exercise.duration
          }
        });
        
        batchCount++;
        totalCreated++;
      }
      
      // Commit batch every 500 operations
      if (batchCount >= 500) {
        await batch.commit();
        batch = db.batch();
        batchCount = 0;
        console.log(`Committed batch, created ${totalCreated} activities so far.`);
      }
    }
  }
  
  // Commit any remaining operations
  if (batchCount > 0) {
    await batch.commit();
  }
  
  console.log(`Created ${totalCreated} user activities successfully`);
}

// Create survey responses
async function createSurveyResponses() {
  console.log('Creating survey responses...');
  let batch = db.batch();
  let batchCount = 0;
  let totalCreated = 0;
  
  // Questions from your app's survey screen
  const questions = [
    "How would you rate your overall mood today?",
    "Did you experience any anxiety today?",
    "How well did you sleep last night?",
    "Have you engaged in any physical activity today?",
    "Did you connect with friends or family today?",
    "Did you take your medications today?",
    "Did you experience any negative thoughts today?",
    "Were you able to focus on your tasks today?",
    "Did you feel overwhelmed at any point today?",
    "Did you practice any relaxation techniques today?"
  ];
  
  // For each user
  for (const user of sampleUsers) {
    const userId = `sample-${user.email.split('@')[0]}`;
    
    // Create survey responses for some of the past 14 days
    for (let day = 0; day < 14; day++) {
      // 50% chance of having a survey on a given day
      if (Math.random() > 0.5) continue;
      
      const timestamp = createTimestamp(day);
      
      // Add random hour to timestamp
      const date = timestamp.toDate();
      date.setHours(getRandomNumber(8, 21), getRandomNumber(0, 59));
      const adjustedTimestamp = Timestamp.fromDate(date);
      
      // Generate random answers
      const responses = questions.map(question => {
        // First 5 questions have 5 options
        if (questions.indexOf(question) < 5) {
          return getRandomNumber(0, 4).toString();
        }
        // Last 5 questions are yes/no
        return Math.random() > 0.5 ? "Yes" : "No";
      });
      
      const surveyRef = db.collection('surveys').doc();
      batch.set(surveyRef, {
        userId: userId,
        timestamp: adjustedTimestamp,
        responses: responses,
        questions: questions,
        createdAt: adjustedTimestamp
      });
      
      // Also add an activity for the survey
      const activityRef = db.collection('users').doc(userId)
        .collection('activities').doc();
      batch.set(activityRef, {
        userId: userId,
        type: 'survey',
        timestamp: adjustedTimestamp,
        date: adjustedTimestamp.toDate().toISOString().split('T')[0],
        details: {
          title: 'Completed Wellness Survey',
          subtitle: 'Daily Check-in'
        }
      });
      
      batchCount += 2;
      totalCreated++;
      
      // Commit batch every 500 operations
      if (batchCount >= 500) {
        await batch.commit();
        batch = db.batch();
        batchCount = 0;
        console.log(`Committed batch, created ${totalCreated} surveys so far.`);
      }
    }
  }
  
  // Commit any remaining operations
  if (batchCount > 0) {
    await batch.commit();
  }
  
  console.log(`Created ${totalCreated} survey responses successfully`);
}

// Update user stats based on created activities
async function updateUserStats() {
  console.log('Updating user statistics...');
  
  for (const user of sampleUsers) {
    const userId = `sample-${user.email.split('@')[0]}`;
    
    try {
      // Count meditation activities
      const meditationSnapshot = await db.collection('users').doc(userId)
        .collection('activities')
        .where('type', '==', 'meditation')
        .get();
      
      const meditationCount = meditationSnapshot.size;
      let totalMeditationMinutes = 0;
      
      meditationSnapshot.forEach(doc => {
        const data = doc.data();
        totalMeditationMinutes += data.details?.duration || 0;
      });
      
      // Count exercise activities
      const exerciseSnapshot = await db.collection('users').doc(userId)
        .collection('activities')
        .where('type', '==', 'exercise')
        .get();
      
      const exerciseCount = exerciseSnapshot.size;
      
      // Count survey activities
      const surveySnapshot = await db.collection('users').doc(userId)
        .collection('activities')
        .where('type', '==', 'survey')
        .get();
      
      const surveyCount = surveySnapshot.size;
      
      // Update user stats
      await db.collection('users').doc(userId).update({
        'stats.meditationMinutes': totalMeditationMinutes,
        'stats.exercisesCompleted': exerciseCount,
        'stats.surveysCompleted': surveyCount,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      // Update meditation progress
      await db.collection('users').doc(userId)
        .collection('progress').doc('meditation').update({
          totalTime: totalMeditationMinutes,
          sessions: meditationCount,
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        
      console.log(`Updated stats for user ${userId}: ${meditationCount} meditations, ${exerciseCount} exercises, ${surveyCount} surveys`);
    } catch (error) {
      console.error(`Error updating stats for user ${userId}:`, error);
    }
  }
  
  console.log('User statistics updated successfully');
}

// Create daily stats documents
async function createDailyStats() {
  console.log('Creating daily stats entries...');
  
  // Create stats for the last 30 days
  for (let day = 0; day < 30; day++) {
    const timestamp = createTimestamp(day);
    const dateString = timestamp.toDate().toISOString().split('T')[0];
    
    try {
      await db.collection('stats').doc(dateString).set({
        date: dateString,
        activeUsers: getRandomNumber(3, 5), // Based on our sample users
        newUsers: day < 5 ? getRandomNumber(0, 1) : 0, // New users in the first few days
        meditationMinutes: getRandomNumber(20, 100),
        exercisesCompleted: getRandomNumber(5, 15),
        surveysCompleted: getRandomNumber(2, 7),
        timestamp: timestamp
      });
      
      console.log(`Created daily stats for ${dateString}`);
    } catch (error) {
      console.error(`Error creating stats for ${dateString}:`, error);
    }
  }
  
  console.log('Daily stats created successfully');
}

// Clear all data (optional, use with caution)
async function clearDatabase() {
  console.log('CAUTION: This will delete all data from your database.');
  console.log('Are you sure? (To proceed, call this function manually)');
  return;
  
  // Uncomment below to actually run the clear operation
  /*
  const collections = ['users', 'moods', 'exercises', 'meditations', 'surveys', 'stats'];
  
  for (const collectionName of collections) {
    const snapshot = await db.collection(collectionName).get();
    const batch = db.batch();
    let batchCount = 0;
    
    for (const doc of snapshot.docs) {
      batch.delete(doc.ref);
      batchCount++;
      
      if (batchCount >= 500) {
        await batch.commit();
        console.log(`Deleted batch of ${batchCount} documents from ${collectionName}`);
        batchCount = 0;
      }
    }
    
    if (batchCount > 0) {
      await batch.commit();
      console.log(`Deleted remaining ${batchCount} documents from ${collectionName}`);
    }
    
    console.log(`Cleared collection: ${collectionName}`);
  }
  
  console.log('Database cleared successfully');
  */
}

// Run the entire population process
async function populateDatabase() {
  try {
    console.log('Starting database population...');
    
    // Create sample data
    await createUsers();
    await createExercises();
    await createMeditations();
    await createMoodEntries();
    await createUserActivities();
    await createSurveyResponses();
    await createDailyStats();
    await updateUserStats();
    
    console.log('Database population completed successfully!');
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    process.exit(0);
  }
}

// Start the population process
populateDatabase();