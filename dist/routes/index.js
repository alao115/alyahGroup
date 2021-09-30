"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_route_1 = __importDefault(require("./auth.route"));
var user_route_1 = __importDefault(require("./user.route"));
var account_route_1 = __importDefault(require("./account.route"));
var firebase_storage_route_1 = __importDefault(require("./firebase.storage.route"));
var activity_route_1 = __importDefault(require("./activity.route"));
var mail_route_1 = __importDefault(require("./mail.route"));
var services_1 = require("../services");
exports.default = (function () {
    var router = (0, express_1.default)();
    (0, auth_route_1.default)({ app: router, ValidationManager: services_1.ValidationManager });
    (0, user_route_1.default)({ app: router, ValidationManager: services_1.ValidationManager, JWTManager: services_1.JWTManager });
    (0, account_route_1.default)({ app: router, ValidationManager: services_1.ValidationManager, JWTManager: services_1.JWTManager });
    (0, firebase_storage_route_1.default)({ app: router, ValidationManager: services_1.ValidationManager, JWTManager: services_1.JWTManager });
    (0, activity_route_1.default)({ app: router, ValidationManager: services_1.ValidationManager, JWTManager: services_1.JWTManager });
    (0, mail_route_1.default)({ app: router, ValidationManager: services_1.ValidationManager, JWTManager: services_1.JWTManager });
    return router;
});
