"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../controllers");
var router = (0, express_1.default)();
exports.default = (function (_a) {
    var app = _a.app, ValidationManager = _a.ValidationManager;
    app.use('/auth', router);
    router.post('/signup', ValidationManager.validationHelper(ValidationManager.schemas().signup), controllers_1.AuthController.signUp);
    router.post('/signin', ValidationManager.validationHelper(ValidationManager.schemas().signin), controllers_1.AuthController.signIn);
    router.post('/refresh-token', ValidationManager.validationHelper(ValidationManager.schemas().refreshToken), controllers_1.AuthController.refreshToken);
    router.post('/send-verification-email', ValidationManager.validationHelper(ValidationManager.schemas().mailVerification), controllers_1.AuthController.sendVerificationMail());
    router.post('/email-token-verification', ValidationManager.validationHelper(ValidationManager.schemas().emailVerification), controllers_1.AuthController.emailVerification);
    router.post('/send-password-recovery-email', ValidationManager.validationHelper(ValidationManager.schemas().mailVerification), controllers_1.AuthController.sendVerificationMail({ isPassword: true }));
    router.post('/password-recovery-token-verification', ValidationManager.validationHelper(ValidationManager.schemas().passwordRecoveryToken), controllers_1.AuthController.passwordRecoveryTokenVerification);
    router.patch('/password-reset/:userID', controllers_1.UserController.update);
});
