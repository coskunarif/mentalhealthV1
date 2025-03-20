"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserStats = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
exports.getUserStats = functions
    .runWith({
    timeoutSeconds: 30,
    memory: '256MB'
})
    .https.onCall(async (data, context) => {
    var _a, _b, _c;
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'You must be logged in to access this feature');
    }
    const userId = context.auth.uid;
    try {
        // Get user document
        const userDoc = await admin.firestore().collection('users').doc(userId).get();
        if (!userDoc.exists) {
            throw new functions.https.HttpsError('not-found', 'User profile not found');
        }
        const userData = userDoc.data() || {};
        // Get meditation progress
        const meditationDoc = await admin.firestore()
            .collection('users')
            .doc(userId)
            .collection('progress')
            .doc('meditation')
            .get();
        const meditationData = meditationDoc.exists ? meditationDoc.data() || {} : { totalTime: 0, sessions: 0 };
        // Get recent moods (last 7 days)
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const moodsSnapshot = await admin.firestore()
            .collection('moods')
            .where('userId', '==', userId)
            .where('timestamp', '>=', admin.firestore.Timestamp.fromDate(oneWeekAgo))
            .orderBy('timestamp', 'desc')
            .limit(10)
            .get();
        const recentMoods = [];
        moodsSnapshot.forEach(doc => {
            const data = doc.data();
            recentMoods.push(Object.assign({ id: doc.id, mood: data.mood, value: data.value, timestamp: data.timestamp, userId: data.userId }, data));
        });
        // Get recent activities
        const activitiesSnapshot = await admin.firestore()
            .collection('users')
            .doc(userId)
            .collection('activities')
            .orderBy('timestamp', 'desc')
            .limit(5)
            .get();
        const recentActivities = [];
        activitiesSnapshot.forEach(doc => {
            const data = doc.data();
            recentActivities.push(Object.assign({ id: doc.id, type: data.type, timestamp: data.timestamp, details: data.details, userId: data.userId }, data));
        });
        // Combine all stats
        const stats = {
            profile: {
                displayName: userData.displayName || '',
                photoURL: userData.photoURL || '',
                createdAt: userData.createdAt || admin.firestore.Timestamp.now(),
                streak: ((_a = userData.stats) === null || _a === void 0 ? void 0 : _a.streak) || 0
            },
            meditation: {
                totalTime: meditationData.totalTime || 0,
                sessions: meditationData.sessions || 0
            },
            activities: {
                exercisesCompleted: ((_b = userData.stats) === null || _b === void 0 ? void 0 : _b.exercisesCompleted) || 0,
                surveysCompleted: ((_c = userData.stats) === null || _c === void 0 ? void 0 : _c.surveysCompleted) || 0,
                recentActivities
            },
            mood: {
                recentMoods
            }
        };
        return { success: true, stats };
    }
    catch (error) {
        functions.logger.error('Error retrieving user stats:', error);
        if (error instanceof functions.https.HttpsError) {
            throw error;
        }
        throw new functions.https.HttpsError('internal', 'An error occurred while retrieving user statistics');
    }
});
//# sourceMappingURL=userStats.js.map