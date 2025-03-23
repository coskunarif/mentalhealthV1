"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dailyStats = void 0;
const scheduler_1 = require("firebase-functions/v2/scheduler");
const v2_1 = require("firebase-functions/v2");
exports.dailyStats = (0, scheduler_1.onSchedule)({
    schedule: 'every 24 hours',
    timeZone: 'Europe/Berlin', // Using European timezone
    retryCount: 3,
    memory: '256MiB',
    region: 'europe-west1' // Specifying European region
}, async (event) => {
    try {
        // Simple placeholder implementation for now
        v2_1.logger.info('Daily stats function executed');
        return null;
    }
    catch (error) {
        v2_1.logger.error('Error processing daily stats:', error);
        return null;
    }
});
//# sourceMappingURL=dailyStats.js.map