"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var controllers_1 = require("../controllers");
var uploadMiddleware = (0, multer_1.default)({});
var router = (0, express_1.default)();
exports.default = (function (_a) {
    var app = _a.app, ValidationManager = _a.ValidationManager, JWTManager = _a.JWTManager;
    app.use('/mail', router);
    router.post('/', uploadMiddleware.fields([{ name: 'from', maxCount: 1 }, { name: 'to', maxCount: 10000 }, { name: 'subject', maxCount: 1 }, { name: 'content', maxCount: 1 }, { name: 'attachments', maxCount: 1 }]), controllers_1.mailController.sendMail);
});
