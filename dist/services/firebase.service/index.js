"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = __importDefault(require("./client"));
var user_1 = __importDefault(require("./user"));
var account_1 = __importDefault(require("./account"));
exports.default = (function (_a) {
    var firebaseAdmin = _a.firebaseAdmin;
    return (function () {
        function FirebaseService() {
        }
        FirebaseService.client = function () {
            return (0, client_1.default)({ firebaseAdmin: firebaseAdmin, FirebaseService: FirebaseService });
        };
        FirebaseService.user = function () {
            return (0, user_1.default)({ firebaseAdmin: firebaseAdmin, FirebaseService: FirebaseService });
        };
        FirebaseService.account = function () {
            return (0, account_1.default)({ firebaseAdmin: firebaseAdmin, FirebaseService: FirebaseService });
        };
        FirebaseService.ObjectHelper = function (obj) {
            var keys = Object.keys(obj);
            var data = [];
            keys.forEach(function (key) {
                data.push(obj[key]);
            });
            return data;
        };
        return FirebaseService;
    }());
});
