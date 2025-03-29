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
exports.sendDailyExerciseReminder = void 0;
const scheduler_1 = require("firebase-functions/v2/scheduler");
const v2_1 = require("firebase-functions/v2");
const admin = __importStar(require("firebase-admin"));
const messaging_1 = require("firebase-admin/messaging"); // Import MulticastMessage
// Ensure Firebase Admin SDK is initialized (typically done in index.ts)
// If not already initialized in your main index.ts, you might need:
// admin.initializeApp();
const db = admin.firestore();
const messaging = (0, messaging_1.getMessaging)();
exports.sendDailyExerciseReminder = (0, scheduler_1.onSchedule)({
    schedule: 'every day 09:00',
    timeZone: 'Europe/Berlin',
    retryCount: 3,
    memory: '256MiB',
    region: 'europe-west1' // Ensure this matches your function deployment region
}, async (event) => {
    v2_1.logger.info('Executing sendDailyExerciseReminder function', { structuredData: true }); // Updated log message
    try {
        // 1. Query users who have reminders enabled
        const usersSnapshot = await db.collection('users')
            .where('settings.notifications.reminders', '==', true)
            .get();
        if (usersSnapshot.empty) {
            v2_1.logger.info('No users found with reminders enabled.');
            return;
        }
        const tokens = [];
        usersSnapshot.forEach(doc => {
            const userData = doc.data();
            // Assuming FCM tokens are stored in an array field 'fcmTokens'
            if (userData.fcmTokens && Array.isArray(userData.fcmTokens) && userData.fcmTokens.length > 0) {
                tokens.push(...userData.fcmTokens);
            }
            else {
                v2_1.logger.warn(`User ${doc.id} has reminders enabled but no FCM tokens found.`);
            }
        });
        if (tokens.length === 0) {
            v2_1.logger.info('No valid FCM tokens found for users with reminders enabled.');
            return;
        }
        // 2. Construct the notification message
        const message = {
            notification: {
                title: 'Daily Exercise Reminder',
                body: 'Ready for your daily breathing exercise? Take a moment to focus and recharge.', // Updated body
            },
            // Add other options like data payload if needed
            // data: { /* your custom data */ },
            tokens: tokens, // Use multicast for efficiency
        };
        // 3. Send the notification
        v2_1.logger.info(`Sending reminders to ${tokens.length} tokens.`);
        const response = await messaging.sendEachForMulticast(message); // Use sendEachForMulticast for detailed results
        // 4. Log results and handle potential token cleanup
        v2_1.logger.info(`Successfully sent ${response.successCount} messages.`);
        if (response.failureCount > 0) {
            v2_1.logger.warn(`Failed to send ${response.failureCount} messages.`);
            const failedTokens = [];
            response.responses.forEach((resp, idx) => {
                if (!resp.success) {
                    failedTokens.push(tokens[idx]);
                    v2_1.logger.error(`Token failed: ${tokens[idx]}, Error: ${resp.error}`);
                    // Consider implementing logic here to remove invalid/unregistered tokens
                    // from the user's document in Firestore based on error codes.
                    // e.g., if error code indicates 'unregistere d' or 'invalid-argument'
                }
            });
            // TODO: Implement token cleanup logic if necessary
            v2_1.logger.warn('Failed tokens:', failedTokens);
        }
    }
    catch (error) {
        v2_1.logger.error('Error sending daily exercise reminders:', error); // Updated log message
        // Consider re-throwing or handling specific errors if needed
    }
});
//# sourceMappingURL=notificationManager.js.map