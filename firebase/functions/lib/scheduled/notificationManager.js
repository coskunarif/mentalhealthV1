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
exports.sendDailyMeditationReminder = void 0;
const scheduler_1 = require("firebase-functions/v2/scheduler");
const v2_1 = require("firebase-functions/v2");
const admin = __importStar(require("firebase-admin"));
const messaging_1 = require("firebase-admin/messaging");
exports.sendDailyMeditationReminder = (0, scheduler_1.onSchedule)({
    schedule: 'every day 09:00',
    timeZone: 'Europe/Berlin',
    retryCount: 3,
    memory: '256MiB',
    region: 'europe-west1' // Specifying European region
}, async (event) => {
    try {
        const usersRef = admin.firestore().collection('users');
        const snapshot = await usersRef.where('settings.notifications.reminders', '==', true).get();
        const tokens = [];
        snapshot.forEach(doc => {
            const userData = doc.data();
            if (userData.fcmToken) {
                tokens.push(userData.fcmToken);
            }
        });
        if (tokens.length === 0) {
            v2_1.logger.info('No valid FCM tokens found');
            return;
        }
        const batchSize = 500;
        for (let i = 0; i < tokens.length; i += batchSize) {
            const batchTokens = tokens.slice(i, i + batchSize);
            if (batchTokens.length > 0) {
                await (0, messaging_1.getMessaging)().sendMulticast({
                    tokens: batchTokens,
                    notification: {
                        title: 'Time for your daily meditation',
                        body: 'Take a moment to center yourself with today\'s meditation practice.'
                    },
                    data: {
                        type: 'MEDITATION_REMINDER',
                        route: '/tabs/exercises'
                    },
                    android: {
                        priority: 'high'
                    },
                    apns: {
                        payload: {
                            aps: {
                                contentAvailable: true
                            }
                        }
                    }
                });
            }
        }
        v2_1.logger.info(`Sent ${tokens.length} meditation reminders`);
    }
    catch (error) {
        v2_1.logger.error('Error sending meditation reminders:', error);
    }
});
//# sourceMappingURL=notificationManager.js.map