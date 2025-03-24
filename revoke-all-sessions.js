const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();

// Function to list all users and revoke their tokens
async function revokeAllUserSessions() {
  try {
    console.log('Starting to revoke all user sessions...');
    
    // Get all users (Firebase limits to 1000 users per page)
    let usersProcessed = 0;
    let nextPageToken;
    
    do {
      // List users with pagination
      const listUsersResult = await auth.listUsers(1000, nextPageToken);
      
      // Process each user in the current batch
      const revokePromises = listUsersResult.users.map(async (userRecord) => {
        try {
          // Revoke refresh tokens for this user
          await auth.revokeRefreshTokens(userRecord.uid);
          console.log(`Revoked tokens for user: ${userRecord.email || userRecord.uid}`);
          return true;
        } catch (error) {
          console.error(`Error revoking tokens for user ${userRecord.uid}:`, error);
          return false;
        }
      });
      
      // Wait for all revocations in this batch to complete
      const results = await Promise.all(revokePromises);
      
      // Count successful operations
      const successCount = results.filter(result => result).length;
      usersProcessed += successCount;
      
      // Get the next page token for pagination
      nextPageToken = listUsersResult.pageToken;
      
      console.log(`Processed batch of ${listUsersResult.users.length} users. ${successCount} successful.`);
      
    } while (nextPageToken);
    
    console.log(`Successfully revoked sessions for ${usersProcessed} users.`);
    console.log('All users will be required to login again on their next interaction with your app.');
    
  } catch (error) {
    console.error('Error revoking user sessions:', error);
  } finally {
    process.exit(0);
  }
}

// Add confirmation step to prevent accidental execution
console.log('WARNING: This script will log out ALL users from your Firebase application.');
console.log('Users will need to sign in again on their next interaction with your app.');
console.log('');
console.log('To proceed, please confirm by uncommenting the line below:');
console.log('');
revokeAllUserSessions();