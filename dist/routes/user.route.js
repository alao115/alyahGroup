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
    app.use('/users', router);
    router.use(JWTManager.verifyAccessToken);
    router.post('/', ValidationManager.validationHelper(ValidationManager.schemas().user), controllers_1.UserController.create);
    router.get('/', controllers_1.UserController.getAll);
    router.get('/me', controllers_1.UserController.getAuthUser);
    router.get('/:userID', controllers_1.UserController.getOne);
    router.patch('/:userID', controllers_1.UserController.update);
    router.delete('/:userID', controllers_1.UserController.delete);
});
