"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserStats = void 0;
const https_1 = require("firebase-functions/v2/https");
const admin = __importStar(require("firebase-admin"));
exports.getUserStats = (0, https_1.onCall)({
    timeoutSeconds: 30,
    memory: '256MiB',
    region: 'europe-west1'
    // Add type for request based on usage
}, async (request) => {
    console.log('[DEBUG] getUserStats Cloud Function called'); // Added
    // Log the project ID the function is connected to (Added)
    console.log(`[DEBUG] Function connected to project: ${admin.app().options.projectId}`);
    if (!request.auth) {
        console.log('[DEBUG] No auth in request'); // Added
        throw new https_1.HttpsError('unauthenticated', 'You must be logged in to access this feature');
    }
    const userId = request.auth.uid;
    console.log(`[DEBUG] Function called for userId: ${userId}`); // Added
    try {
        // Try to get user document first (Added block start)
        const userDocRef = admin.firestore().collection('users').doc(userId);
        const userDoc = await userDocRef.get();
        console.log(`[DEBUG] User document exists: ${userDoc.exists}`); // Added
        if (!userDoc.exists) {
            console.log(`[DEBUG] User document not found for ${userId}`); // Added
            // Note: Returning default stats was removed as per new instructions, now throwing error
            throw new https_1.HttpsError('not-found', 'User profile not found');
        }
        const userData = userDoc.data() || {}; // Keep userData retrieval here
        // (Added block end)
        // Try getting collections/documents the function accesses (Added block start)
        console.log('[DEBUG] Testing document access paths...'); // Added
        let meditationData = { totalTime: 0, sessions: 0 }; // Default value
        try {
            const meditationRef = userDocRef.collection('progress').doc('meditation');
            const meditationDoc = await meditationRef.get();
            console.log(`[DEBUG] Meditation doc exists: ${meditationDoc.exists}`); // Added
            if (meditationDoc.exists) {
                const data = meditationDoc.data();
                meditationData = {
                    totalTime: data?.totalTime || 0,
                    sessions: data?.sessions || 0
                };
            }
            // Removed creation logic, just check existence and fetch
        }
        catch (e) {
            console.log('[DEBUG] Error checking/fetching meditation doc:', e); // Added
            // Continue with default meditationData
        }
        try {
            const overviewRef = userDocRef.collection('progress').doc('overview');
            const overviewDoc = await overviewRef.get();
            console.log(`[DEBUG] Overview doc exists: ${overviewDoc.exists}`); // Added
            // We don't seem to use overviewData directly later, but check is kept
        }
        catch (e) {
            console.log('[DEBUG] Error checking overview doc:', e); // Added
        }
        // (Added block end)
        // Continue with the regular function logic...
        // Get recent moods (last 7 days)
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const moodsSnapshot = await admin.firestore()
            .collection('moods') // Assuming moods are top-level, adjust if needed
            .where('userId', '==', userId)
            .where('timestamp', '>=', admin.firestore.Timestamp.fromDate(oneWeekAgo))
            .orderBy('timestamp', 'desc')
            .limit(10)
            .get();
        const recentMoods = [];
        moodsSnapshot.forEach((doc) => {
            const data = doc.data();
            recentMoods.push({
                id: doc.id,
                mood: data.mood,
                value: data.value,
                timestamp: data.timestamp,
                userId: data.userId,
                ...data
            });
        });
        // Get recent activities with fallback
        let recentActivities = [];
        try {
            const activitiesSnapshot = await userDocRef // Use userDocRef
                .collection('activities')
                .orderBy('timestamp', 'desc')
                .limit(5)
                .get();
            if (!activitiesSnapshot.empty) {
                recentActivities = activitiesSnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        type: data.type,
                        timestamp: data.timestamp,
                        details: data.details,
                        userId: data.userId,
                        ...data
                    };
                });
            }
        }
        catch (err) {
            console.warn(`[DEBUG] Error fetching activities: ${err.message}`); // Added DEBUG prefix
            // Continue with empty array
        }
        // Combine all stats
        const stats = {
            profile: {
                displayName: userData.displayName || '',
                photoURL: userData.photoURL || '',
                createdAt: userData.createdAt || admin.firestore.Timestamp.now(),
                streak: userData.stats?.streak || 0
            },
            meditation: {
                totalTime: meditationData.totalTime || 0,
                sessions: meditationData.sessions || 0
            },
            activities: {
                exercisesCompleted: userData.stats?.exercisesCompleted || 0,
                surveysCompleted: userData.stats?.surveysCompleted || 0,
                recentActivities
            },
            mood: {
                recentMoods
            }
        };
        return { success: true, stats };
    }
    catch (error) {
        console.log('[DEBUG] Error in getUserStats:', error); // Modified log
        // Re-throw the original error or a generic internal error
        if (error instanceof https_1.HttpsError) {
            throw error;
        }
        // Throwing the original error might expose too much detail,
        // consider throwing a generic HttpsError instead for production.
        throw new https_1.HttpsError('internal', 'An unexpected error occurred.', error); // Throw HttpsError
    }
});
// Removed createDefaultStats helper function as it's no longer used
//# sourceMappingURL=userStats.js.map