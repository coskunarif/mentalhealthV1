"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserStats = exports.generateMoodInsights = exports.sendDailyMeditationReminder = exports.dailyStats = exports.onUserCreate = void 0;
const admin = require("firebase-admin");
const onUserCreate_1 = require("./auth/onUserCreate");
Object.defineProperty(exports, "onUserCreate", { enumerable: true, get: function () { return onUserCreate_1.onUserCreate; } });
const dailyStats_1 = require("./scheduled/dailyStats");
Object.defineProperty(exports, "dailyStats", { enumerable: true, get: function () { return dailyStats_1.dailyStats; } });
const insights_1 = require("./api/insights");
Object.defineProperty(exports, "generateMoodInsights", { enumerable: true, get: function () { return insights_1.generateMoodInsights; } });
const userStats_1 = require("./api/userStats");
Object.defineProperty(exports, "getUserStats", { enumerable: true, get: function () { return userStats_1.getUserStats; } });
const notificationManager_1 = require("./scheduled/notificationManager");
Object.defineProperty(exports, "sendDailyMeditationReminder", { enumerable: true, get: function () { return notificationManager_1.sendDailyMeditationReminder; } });
// Initialize Firebase Admin
admin.initializeApp();
//# sourceMappingURL=index.js.map