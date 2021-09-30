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
    app.use('/accounts', router);
    router.use(JWTManager.verifyAccessToken);
    router.post('/', ValidationManager.validationHelper(ValidationManager.schemas().createAccount), controllers_1.AccountController.create);
    router.post('/search', controllers_1.AccountController.search);
    router.get('/', controllers_1.AccountController.getAll);
    router.get('/:accountID', controllers_1.AccountController.getOne);
    router.patch('/:accountID', controllers_1.AccountController.update);
    router.delete('/:accountID', controllers_1.AccountController.delete);
});
