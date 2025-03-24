const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();

const users = [
  { uid: 'sample-john', email: 'john@example.com', password: 'password123', displayName: 'John Smith' },
  { uid: 'sample-emma', email: 'emma@example.com', password: 'password123', displayName: 'Emma Wilson' },
  { uid: 'sample-michael', email: 'michael@example.com', password: 'password123', displayName: 'Michael Brown' },
  { uid: 'sample-sophia', email: 'sophia@example.com', password: 'password123', displayName: 'Sophia Lee' },
  { uid: 'sample-david', email: 'david@example.com', password: 'password123', displayName: 'David Johnson' }
];

async function createAuthUsers() {
  for (const user of users) {
    try {
      const userRecord = await auth.createUser({
        uid: user.uid,  // Specifying exact UID to match Firestore doc ID
        email: user.email,
        password: user.password,
        displayName: user.displayName,
        disabled: false
      });
      console.log(`Created auth user: ${userRecord.uid} (${user.email})`);
    } catch (error) {
      console.error(`Error creating user ${user.email}:`, error);
    }
  }
}

createAuthUsers()
  .then(() => {
    console.log('All auth users created successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('Error creating auth users:', error);
    process.exit(1);
  });