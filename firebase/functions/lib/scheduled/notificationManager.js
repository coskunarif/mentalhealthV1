"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDailyMeditationReminder = void 0;
const scheduler_1 = require("firebase-functions/v2/scheduler");
const v2_1 = require("firebase-functions/v2");
exports.sendDailyMeditationReminder = (0, scheduler_1.onSchedule)({
    schedule: 'every day 09:00',
    timeZone: 'Europe/Berlin',
    retryCount: 3,
    memory: '256MiB',
    region: 'europe-west1'
}, async (event) => {
    try {
        // Simple placeholder implementation
        v2_1.logger.info('Notification function executed');
        return null;
    }
    catch (error) {
        v2_1.logger.error('Error sending meditation reminders:', error);
        return null;
    }
});
//# sourceMappingURL=notificationManager.js.map