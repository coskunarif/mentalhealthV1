"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMoodInsights = void 0;
const https_1 = require("firebase-functions/v2/https");
const v2_1 = require("firebase-functions/v2");
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
        // Simple implementation for now to get things working
        v2_1.logger.info('Generating mood insights', {
            userId,
            timeframe
        });
        return {
            success: true,
            insights: {
                period: timeframe,
                entriesCount: 0,
                averageMood: 0,
                moodAverages: {},
                topMood: "neutral",
                highestMood: { type: "neutral", value: 0 },
                lowestMood: { type: "neutral", value: 0 },
                moodsByDay: {}
            },
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
        throw new https_1.HttpsError('internal', 'An error occurred while generating insights');
    }
});
//# sourceMappingURL=insights.js.map