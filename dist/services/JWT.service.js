"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var http_errors_1 = __importDefault(require("http-errors"));
var moment_1 = __importDefault(require("moment"));
exports.default = (function (_a) {
    var redisClientManager = _a.redisClientManager, userService = _a.userService;
    return (function () {
        function JWTManager() {
        }
        JWTManager.signToken = function (userID) {
            var privateKey = fs_1.default.readFileSync(path_1.default.join('keys', 'private.pem'), 'utf-8');
            var payload = {};
            var options = {
                audience: userID,
                expiresIn: '1d',
                algorithm: 'RS256',
            };
            return new Promise(function (resolve, reject) {
                jsonwebtoken_1.default.sign(payload, privateKey, options, function (err, accessToken) {
                    if (err) {
                        reject(http_errors_1.default.InternalServerError());
                    }
                    resolve({ accessToken: accessToken, expiresIn: (0, moment_1.default)().add(1, 'days').unix() });
                });
            });
        };
        JWTManager.verifyAccessToken = function (req, res, next) {
            var _this = this;
            var authHeader = req.headers.authorization;
            if (!authHeader)
                return next(http_errors_1.default.Unauthorized());
            var token = authHeader.split(' ')[1];
            var publicKey = fs_1.default.readFileSync(path_1.default.join('keys', 'public.pem'), 'utf-8');
            jsonwebtoken_1.default.verify(token, publicKey, function (err, payload) { return __awaiter(_this, void 0, void 0, function () {
                var message, isUserExist;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (err) {
                                message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.name;
                                return [2, next(http_errors_1.default.Unauthorized(message))];
                            }
                            return [4, userService.findByID({ id: payload.aud })];
                        case 1:
                            isUserExist = _a.sent();
                            if (!isUserExist)
                                next(http_errors_1.default.Unauthorized());
                            req.payload = payload;
                            req.payload.authUser = isUserExist;
                            next();
                            return [2];
                    }
                });
            }); });
        };
        JWTManager.signRefreshToken = function (userID) {
            var _this = this;
            var privateKey = fs_1.default.readFileSync(path_1.default.join('keys', 'private_refresh.pem'), 'utf-8');
            var payload = {};
            var options = {
                audience: userID,
                expiresIn: '1y',
                algorithm: 'RS256',
            };
            return new Promise(function (resolve, reject) {
                jsonwebtoken_1.default.sign(payload, privateKey, options, function (err, refreshToken) { return __awaiter(_this, void 0, void 0, function () {
                    var result, err_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (err) {
                                    reject(http_errors_1.default.InternalServerError());
                                }
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4, redisClientManager.setKey(userID, refreshToken)];
                            case 2:
                                result = _a.sent();
                                resolve(result);
                                return [3, 4];
                            case 3:
                                err_1 = _a.sent();
                                reject(http_errors_1.default.InternalServerError(err_1.message));
                                return [3, 4];
                            case 4: return [2];
                        }
                    });
                }); });
            });
        };
        JWTManager.refreshTokenVerification = function (_a) {
            var refreshToken = _a.refreshToken;
            return __awaiter(this, void 0, void 0, function () {
                var publicKey;
                var _this = this;
                return __generator(this, function (_b) {
                    publicKey = fs_1.default.readFileSync(path_1.default.join('keys', 'public_refresh.pem'), 'utf-8');
                    return [2, new Promise(function (resolve, reject) {
                            jsonwebtoken_1.default.verify(refreshToken, publicKey, function (err, payload) { return __awaiter(_this, void 0, void 0, function () {
                                var userID, result, isUserExist, err_2;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (err) {
                                                return [2, reject(http_errors_1.default.Unauthorized())];
                                            }
                                            _a.label = 1;
                                        case 1:
                                            _a.trys.push([1, 4, , 5]);
                                            userID = payload.aud;
                                            return [4, redisClientManager.getKey(userID)];
                                        case 2:
                                            result = _a.sent();
                                            if (result !== refreshToken)
                                                reject(http_errors_1.default.Unauthorized());
                                            return [4, userService.findByID({ id: payload.aud })];
                                        case 3:
                                            isUserExist = _a.sent();
                                            if (!isUserExist)
                                                reject(http_errors_1.default.Unauthorized());
                                            resolve(userID);
                                            return [3, 5];
                                        case 4:
                                            err_2 = _a.sent();
                                            reject(http_errors_1.default.InternalServerError());
                                            return [3, 5];
                                        case 5: return [2];
                                    }
                                });
                            }); });
                        })];
                });
            });
        };
        JWTManager.emailVerificationToken = function (_a) {
            var email = _a.email;
            var privateKey = fs_1.default.readFileSync(path_1.default.join('keys', 'email_verification_private_key.pem'), 'utf-8');
            var payload = {};
            var options = {
                audience: email,
                expiresIn: '1d',
                algorithm: 'RS256',
            };
            return new Promise(function (resolve, reject) {
                jsonwebtoken_1.default.sign(payload, privateKey, options, function (err, emailToken) {
                    if (err) {
                        console.log(err);
                        reject(http_errors_1.default.InternalServerError());
                    }
                    resolve({ emailToken: emailToken });
                });
            });
        };
        JWTManager.verifyEmailVerificationToken = function (_a) {
            var emailVerificationToken = _a.emailVerificationToken;
            return __awaiter(this, void 0, void 0, function () {
                var publicKey;
                var _this = this;
                return __generator(this, function (_b) {
                    publicKey = fs_1.default.readFileSync(path_1.default.join('keys', 'email_verification_public_key.pem'), 'utf-8');
                    return [2, new Promise(function (resolve, reject) {
                            jsonwebtoken_1.default.verify(emailVerificationToken, publicKey, function (err, payload) { return __awaiter(_this, void 0, void 0, function () {
                                var email, isUserExist, err_3;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (err) {
                                                return [2, reject(http_errors_1.default.Unauthorized())];
                                            }
                                            _a.label = 1;
                                        case 1:
                                            _a.trys.push([1, 3, , 4]);
                                            email = payload.aud;
                                            return [4, userService.findByEmail({ email: email })];
                                        case 2:
                                            isUserExist = _a.sent();
                                            if (!isUserExist)
                                                reject(http_errors_1.default.Unauthorized());
                                            resolve(isUserExist);
                                            return [3, 4];
                                        case 3:
                                            err_3 = _a.sent();
                                            reject(http_errors_1.default.InternalServerError());
                                            return [3, 4];
                                        case 4: return [2];
                                    }
                                });
                            }); });
                        })];
                });
            });
        };
        JWTManager.passwordRecoveryToken = function (_a) {
            var email = _a.email;
            var privateKey = fs_1.default.readFileSync(path_1.default.join('keys', 'password_recovery_private_key.pem'), 'utf-8');
            var payload = {};
            var options = {
                audience: email,
                expiresIn: '1d',
                algorithm: 'RS256',
            };
            return new Promise(function (resolve, reject) {
                jsonwebtoken_1.default.sign(payload, privateKey, options, function (err, emailToken) {
                    if (err) {
                        console.log(err);
                        reject(http_errors_1.default.InternalServerError());
                    }
                    resolve({ emailToken: emailToken });
                });
            });
        };
        JWTManager.verifyPasswordRecoveryToken = function (_a) {
            var passwordRecoveryToken = _a.passwordRecoveryToken;
            return __awaiter(this, void 0, void 0, function () {
                var publicKey;
                var _this = this;
                return __generator(this, function (_b) {
                    publicKey = fs_1.default.readFileSync(path_1.default.join('keys', 'password_recovery_public_key.pem'), 'utf-8');
                    return [2, new Promise(function (resolve, reject) {
                            jsonwebtoken_1.default.verify(passwordRecoveryToken, publicKey, function (err, payload) { return __awaiter(_this, void 0, void 0, function () {
                                var email, isUserExist, err_4;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (err) {
                                                return [2, reject(http_errors_1.default.Unauthorized())];
                                            }
                                            _a.label = 1;
                                        case 1:
                                            _a.trys.push([1, 3, , 4]);
                                            email = payload.aud;
                                            return [4, userService.findByEmail({ email: email })];
                                        case 2:
                                            isUserExist = _a.sent();
                                            if (!isUserExist)
                                                reject(http_errors_1.default.Unauthorized());
                                            resolve(isUserExist);
                                            return [3, 4];
                                        case 3:
                                            err_4 = _a.sent();
                                            reject(http_errors_1.default.InternalServerError());
                                            return [3, 4];
                                        case 4: return [2];
                                    }
                                });
                            }); });
                        })];
                });
            });
        };
        return JWTManager;
    }());
});
