"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onUserCreate = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const z = require("zod"); // Add zod for validation
// Define schema for user data
const userSchema = z.object({
    uid: z.string(),
    email: z.string().email().nullable(),
    displayName: z.string().default(''),
    photoURL: z.string().default(''),
    settings: z.object({
        notifications: z.object({
            reminders: z.boolean().default(true),
            progress: z.boolean().default(true),
            tips: z.boolean().default(true),
            community: z.boolean().default(false)
        }).default({}),
        language: z.string().default('en'),
        theme: z.string().default('light')
    }).default({}),
    stats: z.object({
        meditationMinutes: z.number().default(0),
        exercisesCompleted: z.number().default(0),
        streak: z.number().default(0),
        surveysCompleted: z.number().default(0),
        lastActiveDate: z.any().nullable()
    }).default({})
});
exports.onUserCreate = functions.auth.user().onCreate(async (user) => {
    try {
        const timestamp = admin.firestore.FieldValue.serverTimestamp();
        // Create validated user object
        const userData = userSchema.parse({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || '',
            photoURL: user.photoURL || '',
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
        // Create user profile in Firestore
        await admin.firestore().collection('users').doc(user.uid).set(Object.assign(Object.assign({}, userData), { createdAt: timestamp, updatedAt: timestamp }));
        // Create default progress documents
        const batch = admin.firestore().batch();
        const meditationRef = admin.firestore().collection('users').doc(user.uid).collection('progress').doc('meditation');
        batch.set(meditationRef, {
            userId: user.uid,
            totalTime: 0,
            sessions: 0,
            createdAt: timestamp,
            updatedAt: timestamp
        });
        const overviewRef = admin.firestore().collection('users').doc(user.uid).collection('progress').doc('overview');
        batch.set(overviewRef, {
            overall: 0,
            categories: {},
            lastUpdated: timestamp
        });
        await batch.commit();
        functions.logger.info(`User profile created for ${user.uid}`);
        return null;
    }
    catch (error) {
        functions.logger.error('Error creating user profile:', error);
        return null;
    }
});
//# sourceMappingURL=onUserCreate.js.map