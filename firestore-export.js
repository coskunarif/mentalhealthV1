"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var admin = require("firebase-admin");
var csv_writer_1 = require("csv-writer");
var path = require("path");
// Initialize Firebase Admin with service account
var serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();
// Function to flatten nested objects for CSV
function flattenObject(obj, prefix) {
    if (prefix === void 0) { prefix = ''; }
    var flattened = {};
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var value = obj[key];
            // Handle different types of values
            if (value === null || value === undefined) {
                flattened["".concat(prefix).concat(key)] = null;
            }
            else if (typeof value === 'object' && !(value instanceof Date) && !Array.isArray(value)) {
                // Recursively flatten nested objects
                Object.assign(flattened, flattenObject(value, "".concat(prefix).concat(key, ".")));
            }
            else if (value instanceof Date) {
                // Convert Date objects to ISO strings
                flattened["".concat(prefix).concat(key)] = value.toISOString();
            }
            else if (Array.isArray(value)) {
                // Convert arrays to JSON strings
                flattened["".concat(prefix).concat(key)] = JSON.stringify(value);
            }
            else {
                // Handle primitive values
                flattened["".concat(prefix).concat(key)] = value;
            }
        }
    }
    return flattened;
}
// Function to get all document data from a collection
function getCollectionData(collectionName) {
    return __awaiter(this, void 0, void 0, function () {
        var snapshot, documents;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.collection(collectionName).get()];
                case 1:
                    snapshot = _a.sent();
                    documents = [];
                    snapshot.forEach(function (doc) {
                        // Add document ID and collection name to each record
                        var data = __assign({ _id: doc.id, _collection: collectionName }, doc.data());
                        // Flatten the document data
                        documents.push(flattenObject(data));
                    });
                    return [2 /*return*/, documents];
            }
        });
    });
}
// Main export function
function exportFirestoreToCSV() {
    return __awaiter(this, void 0, void 0, function () {
        var collections, collectionData, _i, collections_1, collectionRef, collectionName, documents, allDocuments_1, headers_1, csvWriter, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, 8, 10]);
                    console.log('Starting Firestore export...');
                    return [4 /*yield*/, db.listCollections()];
                case 1:
                    collections = _a.sent();
                    collectionData = [];
                    _i = 0, collections_1 = collections;
                    _a.label = 2;
                case 2:
                    if (!(_i < collections_1.length)) return [3 /*break*/, 5];
                    collectionRef = collections_1[_i];
                    collectionName = collectionRef.id;
                    console.log("Processing collection: ".concat(collectionName));
                    return [4 /*yield*/, getCollectionData(collectionName)];
                case 3:
                    documents = _a.sent();
                    if (documents.length > 0) {
                        collectionData.push({
                            name: collectionName,
                            documents: documents
                        });
                    }
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    allDocuments_1 = [];
                    collectionData.forEach(function (collection) {
                        allDocuments_1.push.apply(allDocuments_1, collection.documents);
                    });
                    if (allDocuments_1.length === 0) {
                        console.log('No data found in Firestore.');
                        return [2 /*return*/];
                    }
                    headers_1 = new Set();
                    allDocuments_1.forEach(function (doc) {
                        Object.keys(doc).forEach(function (key) { return headers_1.add(key); });
                    });
                    csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
                        path: path.resolve('./firestore-export.csv'),
                        header: Array.from(headers_1).map(function (id) { return ({ id: id, title: id }); })
                    });
                    // Write data to CSV
                    return [4 /*yield*/, csvWriter.writeRecords(allDocuments_1)];
                case 6:
                    // Write data to CSV
                    _a.sent();
                    console.log("Successfully exported ".concat(allDocuments_1.length, " documents to firestore-export.csv"));
                    return [3 /*break*/, 10];
                case 7:
                    error_1 = _a.sent();
                    console.error('Error exporting Firestore data:', error_1);
                    return [3 /*break*/, 10];
                case 8: 
                // Terminate the Firebase app
                return [4 /*yield*/, admin.app().delete()];
                case 9:
                    // Terminate the Firebase app
                    _a.sent();
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    });
}
// Run the export
exportFirestoreToCSV();
