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
exports.generateMoodInsights = void 0;
const https_1 = require("C:\\CodiumDev\\mentalhealthV1\\app\\lib\\utils\\empty-firebase-functions.js");
const admin = __importStar(require("firebase-admin"));
const v2_1 = require("C:\\CodiumDev\\mentalhealthV1\\app\\lib\\utils\\empty-firebase-functions.js");
// Add rate limiting and data validation
exports.generateMoodInsights = (0, https_1.onCall)({
    // Function configuration
    timeoutSeconds: 60,
    memory: '256MiB',
    maxInstances: 10,
    minInstances: 0,
    region: 'europe-west1'
}, async (request) => {
    // Authentication check
    if (!request.auth) {
        throw new https_1.HttpsError('unauthenticated', 'You must be logged in to access this feature');
    }
    const data = request.data;
    // Input validation
    if (!data || !data.timeframe || !['week', 'month', 'year'].includes(data.timeframe)) {
        throw new https_1.HttpsError('invalid-argument', 'Timeframe must be one of: week, month, year', { providedTimeframe: data?.timeframe });
    }
    const userId = request.auth.uid;
    const timeframe = data.timeframe;
    try {
        // Add rate limiting check
        const rateLimit = await checkRateLimit(userId, 'generateMoodInsights', 10); // 10 requests per day
        if (!rateLimit.allowed) {
            throw new https_1.HttpsError('resource-exhausted', `Rate limit exceeded. Try again in ${rateLimit.timeToReset} minutes.`);
        }
        // Rest of function logic remains the same
        const now = new Date();
        let startDate = new Date();
        switch (timeframe) {
            case 'week':
                startDate.setDate(now.getDate() - 7);
                break;
            case 'month':
                startDate.setMonth(now.getMonth() - 1);
                break;
            case 'year':
                startDate.setFullYear(now.getFullYear() - 1);
                break;
        }
        const moodsRef = admin.firestore()
            .collection('moods')
            .where('userId', '==', userId)
            .where('timestamp', '>=', admin.firestore.Timestamp.fromDate(startDate))
            .orderBy('timestamp', 'asc');
        const snapshot = await moodsRef.get();
        const moods = [];
        snapshot.forEach((doc) => {
            moods.push(doc.data());
        });
        if (moods.length === 0) {
            return {
                success: true,
                insights: null,
                message: 'Not enough data to generate insights.'
            };
        }
        const moodsByType = {};
        let totalMoodValue = 0;
        let highestMood = { type: '', value: 0 };
        let lowestMood = { type: '', value: 100 };
        moods.forEach((mood) => {
            if (!moodsByType[mood.mood]) {
                moodsByType[mood.mood] = [];
            }
            moodsByType[mood.mood].push(mood.value);
            totalMoodValue += mood.value;
            if (mood.value > highestMood.value) {
                highestMood = { type: mood.mood, value: mood.value };
            }
            if (mood.value < lowestMood.value) {
                lowestMood = { type: mood.mood, value: mood.value };
            }
        });
        const moodAverages = {};
        let overallMoodAverage = totalMoodValue / moods.length;
        Object.keys(moodsByType).forEach((mood) => {
            const values = moodsByType[mood];
            moodAverages[mood] = values.reduce((a, b) => a + b, 0) / values.length;
        });
        const insights = {
            period: timeframe,
            entriesCount: moods.length,
            averageMood: overallMoodAverage,
            moodAverages,
            topMood: Object.keys(moodAverages).reduce((a, b) => moodAverages[a] > moodAverages[b] ? a : b),
            highestMood,
            lowestMood,
            moodsByDay: {}
        };
        const moodsByDay = {};
        moods.forEach((mood) => {
            const day = mood.timestamp.toDate().toISOString().split('T')[0];
            if (!moodsByDay[day])
                moodsByDay[day] = [];
            moodsByDay[day].push(mood.value);
        });
        insights.moodsByDay = Object.fromEntries(Object.entries(moodsByDay).map(([day, values]) => [day, values.reduce((a, b) => a + b, 0) / values.length]));
        v2_1.logger.info('Mood insights generated', {
            userId,
            timeframe,
            entriesCount: moods.length
        });
        return {
            success: true,
            insights,
            message: 'Insights generated successfully'
        };
    }
    catch (error) {
        v2_1.logger.error('Error generating mood insights', error, {
            userId,
            timeframe
        });
        if (error instanceof https_1.HttpsError) {
            throw error; // Re-throw if it's already a proper HttpsError
        }
        if (error instanceof Error && 'code' in error && error.code === 'resource-exhausted') {
            throw new https_1.HttpsError('resource-exhausted', 'Too many requests, please try again later');
        }
        throw new https_1.HttpsError('internal', 'An error occurred while generating insights');
    }
});
// Helper function to implement rate limiting
async function checkRateLimit(userId, operation, maxCalls) {
    const rateLimitRef = admin.firestore()
        .collection('rateLimits')
        .doc(userId)
        .collection('operations')
        .doc(operation);
    // Use transaction to safely update rate limit data
    return admin.firestore().runTransaction(async (transaction) => {
        const doc = await transaction.get(rateLimitRef);
        const now = Date.now();
        const oneDayAgo = now - (24 * 60 * 60 * 1000);
        if (!doc.exists) {
            transaction.set(rateLimitRef, {
                count: 1,
                lastReset: now,
                calls: [now]
            });
            return { allowed: true, timeToReset: 0 };
        }
        const data = doc.data();
        if (!data) {
            transaction.set(rateLimitRef, {
                count: 1,
                lastReset: now,
                calls: [now]
            });
            return { allowed: true, timeToReset: 0 };
        }
        const calls = data.calls || [];
        const filteredCalls = calls.filter((time) => time > oneDayAgo);
        if (filteredCalls.length >= maxCalls) {
            const oldestCall = Math.min(...filteredCalls);
            const resetTime = Math.ceil((oldestCall + 24 * 60 * 60 * 1000 - now) / (60 * 1000));
            return { allowed: false, timeToReset: resetTime };
        }
        filteredCalls.push(now);
        transaction.update(rateLimitRef, {
            count: filteredCalls.length,
            calls: filteredCalls,
            lastAccess: now
        });
        return { allowed: true, timeToReset: 0 };
    });
}
//# sourceMappingURL=insights.js.map