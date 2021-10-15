"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    frontend_url: process.env.FRONTEND_URL || 'http://localhost:8080',
    environment: process.env.APP_ENV || 'development',
    hostname: process.env.APP_HOSTNAME || '0.0.0.0',
    port: process.env.APP_PORT || 4000,
    appName: process.env.APP_NAME || 'AADS Backend',
    logLevel: 'debug',
    db: process.env.DB_NAME || 'mongodb://localhost/aads',
    redisUri: process.env.REDIS_URI || 'redis://localhost:6379',
    redisPass: process.env.REDIS_PASS || '',
    redisDB: process.env.REDIS_DB || 'aads',
    redisPort: process.env.REDIS_PORT || '6379',
    redisHost: process.env.REDIS_HOST || 'redis',
    email_host: process.env.MAIL_HOST || 'smtp.ethereal.email',
    email_port: process.env.MAIL_PORT || 587,
    email_secure: process.env.MAIL_SECURE || true,
    email_user: process.env.MAIL_USERNAME,
    email_pass: process.env.MAIL_PASSWORD,
};
