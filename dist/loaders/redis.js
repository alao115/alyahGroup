"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redis_1 = require("redis");
var consola_1 = require("consola");
var config_1 = __importDefault(require("../config"));
exports.default = (function () { return new Promise(function (resolve, reject) {
    var client = (0, redis_1.createClient)(config_1.default.redisUri, { db: config_1.default.redisDB, password: config_1.default.redisPass });
    client.on('connect', function () {
        (0, consola_1.success)('Redis client is connected to the redis server');
    });
    client.on('ready', function () {
        (0, consola_1.success)('Redis client is ready to be used');
        resolve(client);
    });
    client.on('error', function (err) {
        reject(err);
    });
    process.on('SIGINT', function () {
        client.quit();
    });
}); });
