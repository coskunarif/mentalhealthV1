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
exports.onUserCreate = void 0;
const functions = __importStar(require("firebase-functions/v1"));
const admin = __importStar(require("firebase-admin"));
// Use v1 auth trigger with European region
exports.onUserCreate = functions
    .region('europe-west1')
    .auth.user()
    // Add type for user parameter
    .onCreate(async (user) => {
    try {
        const timestamp = admin.firestore.FieldValue.serverTimestamp();
        // Simple user profile creation
        await admin.firestore().collection('users').doc(user.uid).set({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || '',
            photoURL: user.photoURL || '',
            createdAt: timestamp,
            updatedAt: timestamp,
            settings: {
                notifications: {
                    reminders: true,
                    progress: true,
                    tips: true,
                    community: false
                },
                language: 'en',
                theme: 'light'
            },
            stats: {
                meditationMinutes: 0,
                exercisesCompleted: 0,
                streak: 0,
                surveysCompleted: 0,
                lastActiveDate: null
            }
        });
        // Use functions logger instead of console
        functions.logger.log(`User profile created for ${user.uid}`);
        return null;
    }
    catch (error) {
        // Use functions logger instead of console
        functions.logger.error('Error creating user profile:', error);
        throw error;
    }
});
//# sourceMappingURL=onUserCreate.js.map