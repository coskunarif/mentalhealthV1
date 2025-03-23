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
const https_1 = require("C:\\CodiumDev\\mentalhealthV1\\app\\lib\\utils\\empty-firebase-functions.js");
const admin = __importStar(require("firebase-admin"));
const v2_1 = require("C:\\CodiumDev\\mentalhealthV1\\app\\lib\\utils\\empty-firebase-functions.js");
exports.getUserStats = (0, https_1.onCall)({
    timeoutSeconds: 30,
    memory: '256MiB',
    region: 'europe-west1'
}, async (request) => {
    if (!request.auth) {
        throw new https_1.HttpsError('unauthenticated', 'You must be logged in to access this feature');
    }
    const userId = request.auth.uid;
    try {
        // Get user document
        const userDoc = await admin.firestore().collection('users').doc(userId).get();
        if (!userDoc.exists) {
            throw new https_1.HttpsError('not-found', 'User profile not found');
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
            recentMoods.push({
                id: doc.id,
                mood: data.mood,
                value: data.value,
                timestamp: data.timestamp,
                userId: data.userId,
                ...data
            });
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
            recentActivities.push({
                id: doc.id,
                type: data.type,
                timestamp: data.timestamp,
                details: data.details,
                userId: data.userId,
                ...data
            });
        });
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
        v2_1.logger.error('Error retrieving user stats:', error);
        if (error instanceof https_1.HttpsError) {
            throw error;
        }
        throw new https_1.HttpsError('internal', 'An error occurred while retrieving user statistics');
    }
});
//# sourceMappingURL=userStats.js.map