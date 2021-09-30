"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../controllers");
var router = (0, express_1.default)();
exports.default = (function (_a) {
    var app = _a.app, ValidationManager = _a.ValidationManager, JWTManager = _a.JWTManager;
    app.use('/activities', router);
    router.use(JWTManager.verifyAccessToken);
    router.get('/', controllers_1.ActivityController.getAll);
    router.get('/:ActivityID', controllers_1.ActivityController.getOne);
    router.delete('/:ActivityID', controllers_1.ActivityController.delete);
});
