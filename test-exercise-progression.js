// Test script for exercise progression
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function testExerciseProgression() {
  try {
    console.log('Starting exercise progression test...');
    
    // 1. Choose a test user
    const testUserId = 'sample-david';
    console.log(`Using test user: ${testUserId}`);
    
    // 2. Get user's assigned template
    const userDoc = await db.collection('users').doc(testUserId).get();
    if (!userDoc.exists) {
      console.error('Test user not found');
      return;
    }
    
    const userData = userDoc.data();
    const assignedTemplateId = userData.assignedTemplateId;
    console.log(`User's assigned template: ${assignedTemplateId}`);
    
    if (!assignedTemplateId) {
      console.error('No template assigned to user');
      return;
    }
    
    // 3. Get template exercises
    const templateDoc = await db.collection('exerciseTemplates').doc(assignedTemplateId).get();
    if (!templateDoc.exists) {
      console.error('Template not found');
      return;
    }
    
    let exerciseIds = [];
    const exerciseIdsData = templateDoc.data().exerciseIds;
    
    if (typeof exerciseIdsData === 'string') {
      // Handle string format like "[exercise-1, exercise-2, exercise-3]"
      exerciseIds = exerciseIdsData
        .replace('[', '')
        .replace(']', '')
        .split(',')
        .map(id => id.trim());
    } else if (Array.isArray(exerciseIdsData)) {
      exerciseIds = exerciseIdsData;
    }
    
    console.log(`Template contains ${exerciseIds.length} exercises: ${exerciseIds.join(', ')}`);
    
    // 4. Get user's completed exercises
    const progressSnapshot = await db.collection('users').doc(testUserId).collection('progress')
      .where('type', '==', 'exercise')
      .where('completed', '==', true)
      .get();
    
    const completedExerciseIds = progressSnapshot.docs.map(doc => doc.id);
    console.log(`User has completed ${completedExerciseIds.length} exercises: ${completedExerciseIds.join(', ')}`);
    
    // 5. Determine next exercise
    const nextExerciseId = exerciseIds.find(id => !completedExerciseIds.includes(id));
    console.log(`Next exercise to complete: ${nextExerciseId || 'All exercises completed'}`);
    
    // 6. Complete the next exercise if available
    if (nextExerciseId) {
      console.log(`Marking exercise ${nextExerciseId} as completed...`);
      
      // Create/update progress document
      await db.collection('users').doc(testUserId).collection('progress').doc(nextExerciseId).set({
        userId: testUserId,
        exerciseId: nextExerciseId,
        type: 'exercise',
        completed: true,
        timestamp: admin.firestore.Timestamp.now()
      }, { merge: true });
      
      // Update user stats
      await db.collection('users').doc(testUserId).update({
        'stats.exercisesCompleted': admin.firestore.FieldValue.increment(1),
        'stats.lastActiveDate': admin.firestore.Timestamp.now(),
        updatedAt: admin.firestore.Timestamp.now()
      });
      
      console.log('Exercise marked as completed');
      
      // 7. Update template completion progress
      const updatedCompletedIds = [...completedExerciseIds, nextExerciseId];
      const templateExercisesCompleted = exerciseIds.filter(id => updatedCompletedIds.includes(id)).length;
      
      // Check for existing template completion document
      const templateCompletionsSnapshot = await db.collection('userTemplateCompletions')
        .where('userId', '==', testUserId)
        .where('templateId', '==', assignedTemplateId)
        .limit(1)
        .get();
      
      if (!templateCompletionsSnapshot.empty) {
        // Update existing document
        const docId = templateCompletionsSnapshot.docs[0].id;
        await db.collection('userTemplateCompletions').doc(docId).update({
          exercisesCompleted: templateExercisesCompleted,
          totalExercises: exerciseIds.length,
          completedAt: templateExercisesCompleted === exerciseIds.length ? 
            admin.firestore.Timestamp.now() : templateCompletionsSnapshot.docs[0].data().completedAt || null
        });
        console.log(`Updated template completion document: ${docId}`);
      } else {
        // Create new document
        const newDoc = await db.collection('userTemplateCompletions').add({
          userId: testUserId,
          templateId: assignedTemplateId,
          exercisesCompleted: templateExercisesCompleted,
          totalExercises: exerciseIds.length,
          completedAt: templateExercisesCompleted === exerciseIds.length ? 
            admin.firestore.Timestamp.now() : null
        });
        console.log(`Created new template completion document: ${newDoc.id}`);
      }
      
      console.log(`Template progress updated: ${templateExercisesCompleted}/${exerciseIds.length} exercises completed`);
    }
    
    console.log('Test completed successfully');
  } catch (error) {
    console.error('Error during test:', error);
  }
}

testExerciseProgression();
