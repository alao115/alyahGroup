"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var firebase_admin_1 = __importDefault(require("firebase-admin"));
firebase_admin_1.default.initializeApp({
    databaseURL: 'https://ap16-sandbox-default-rtdb.firebaseio.com',
    storageBucket: 'gs://ap16-sandbox.appspot.com',
});
exports.default = { admin: firebase_admin_1.default };
