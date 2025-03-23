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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserStats = exports.generateMoodInsights = exports.sendDailyMeditationReminder = exports.dailyStats = exports.onUserCreate = void 0;
const admin = __importStar(require("firebase-admin"));
const v2_1 = require("firebase-functions/v2");
// Initialize Firebase Admin first (important for hybrid approach)
admin.initializeApp();
// Set global options for v2 functions
(0, v2_1.setGlobalOptions)({
    region: 'europe-west1',
    maxInstances: 10,
    minInstances: 0,
    timeoutSeconds: 60,
    memory: '256MiB',
    concurrency: 80
});
// Import v1 auth function
const onUserCreate_1 = require("./auth/onUserCreate");
Object.defineProperty(exports, "onUserCreate", { enumerable: true, get: function () { return onUserCreate_1.onUserCreate; } });
// Import v2 functions
const dailyStats_1 = require("./scheduled/dailyStats");
Object.defineProperty(exports, "dailyStats", { enumerable: true, get: function () { return dailyStats_1.dailyStats; } });
const insights_1 = require("./api/insights");
Object.defineProperty(exports, "generateMoodInsights", { enumerable: true, get: function () { return insights_1.generateMoodInsights; } });
const userStats_1 = require("./api/userStats");
Object.defineProperty(exports, "getUserStats", { enumerable: true, get: function () { return userStats_1.getUserStats; } });
const notificationManager_1 = require("./scheduled/notificationManager");
Object.defineProperty(exports, "sendDailyMeditationReminder", { enumerable: true, get: function () { return notificationManager_1.sendDailyMeditationReminder; } });
//# sourceMappingURL=index.js.map