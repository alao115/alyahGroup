"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var config_1 = __importDefault(require("../config"));
var connect = mongoose_1.default.connect;
exports.default = (function () { return new Promise(function (resolve, reject) {
    connect(config_1.default.db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then(function (connection) { return resolve(connection); })
        .catch(function (err) { return reject(err); });
}); });
