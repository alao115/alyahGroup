"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var http_errors_1 = __importDefault(require("http-errors"));
var config_1 = __importDefault(require("../config"));
exports.default = (function (_a) {
    var JWTManager = _a.JWTManager, userService = _a.userService, mailService = _a.mailService, accountService = _a.accountService;
    return (function () {
        function AuthManager() {
        }
        AuthManager.signUp = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var email, password, isUserExisted, user, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            email = data.email, password = data.password;
                            return [4, userService.findByEmail({ email: email })];
                        case 1:
                            isUserExisted = _a.sent();
                            if (isUserExisted)
                                throw http_errors_1.default.Conflict('Email already existed');
                            return [4, userService.create(__assign({}, data))];
                        case 2:
                            user = _a.sent();
                            return [2, user];
                        case 3:
                            err_1 = _a.sent();
                            throw err_1;
                        case 4: return [2];
                    }
                });
            });
        };
        AuthManager.signIn = function (_a) {
            var email = _a.email, password = _a.password;
            return __awaiter(this, void 0, void 0, function () {
                var user, isPasswordMatched, accessToken, refreshToken, err_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 5, , 6]);
                            return [4, userService.findByEmail({ email: email })];
                        case 1:
                            user = _b.sent();
                            if (!user)
                                throw http_errors_1.default.NotFound('User not found');
                            return [4, user.isPasswordMatched(password)];
                        case 2:
                            isPasswordMatched = _b.sent();
                            if (!isPasswordMatched)
                                throw http_errors_1.default.Unauthorized('Invalid credentials');
                            return [4, JWTManager.signToken(String(user._id))];
                        case 3:
                            accessToken = _b.sent();
                            return [4, JWTManager.signRefreshToken(String(user._id))];
                        case 4:
                            refreshToken = _b.sent();
                            return [2, ({ token: __assign(__assign({}, accessToken), { refreshToken: refreshToken }), userID: user._id })];
                        case 5:
                            err_2 = _b.sent();
                            throw err_2;
                        case 6: return [2];
                    }
                });
            });
        };
        AuthManager.refreshTokenService = function (_a) {
            var refreshToken = _a.refreshToken;
            return __awaiter(this, void 0, void 0, function () {
                var data, accessToken, refreshtoken, err_3;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 4, , 5]);
                            return [4, JWTManager.refreshTokenVerification({ refreshToken: refreshToken })];
                        case 1:
                            data = _b.sent();
                            return [4, JWTManager.signToken(data)];
                        case 2:
                            accessToken = _b.sent();
                            return [4, JWTManager.signRefreshToken(data)];
                        case 3:
                            refreshtoken = _b.sent();
                            return [2, (__assign(__assign({}, accessToken), { refreshToken: refreshtoken }))];
                        case 4:
                            err_3 = _b.sent();
                            throw err_3;
                        case 5: return [2];
                    }
                });
            });
        };
        AuthManager.resetPassword = function (_a) {
            var email = _a.email;
            return __awaiter(this, void 0, void 0, function () {
                var user, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4, userService.findByEmail({ email: email })];
                        case 1:
                            user = _b.sent();
                            if (!user)
                                throw http_errors_1.default.NotFound('User not found');
                            return [3, 3];
                        case 2:
                            error_1 = _b.sent();
                            throw error_1;
                        case 3: return [2];
                    }
                });
            });
        };
        AuthManager.emailTokenVerification = function (_a) {
            var emailToken = _a.emailToken;
            return __awaiter(this, void 0, void 0, function () {
                var user, response, error_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 3, , 4]);
                            return [4, JWTManager.verifyEmailVerificationToken({ emailVerificationToken: emailToken })];
                        case 1:
                            user = _b.sent();
                            return [4, userService.update({ id: user._id, data: { emailVerified: true } })];
                        case 2:
                            response = _b.sent();
                            return [2, __assign(__assign({}, user), response)];
                        case 3:
                            error_2 = _b.sent();
                            throw error_2;
                        case 4: return [2];
                    }
                });
            });
        };
        AuthManager.passwordRecoveryTokenVerification = function (_a) {
            var emailToken = _a.emailToken;
            return __awaiter(this, void 0, void 0, function () {
                var user, error_3;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4, JWTManager.verifyPasswordRecoveryToken({ emailVerificationToken: emailToken })];
                        case 1:
                            user = _b.sent();
                            return [2, user];
                        case 2:
                            error_3 = _b.sent();
                            throw error_3;
                        case 3: return [2];
                    }
                });
            });
        };
        AuthManager.sendVerificationMail = function (_a) {
            var email = _a.email, isPassword = _a.isPassword;
            return __awaiter(this, void 0, void 0, function () {
                var user, userAccount, emailToken, _b, verificationUrl, from, subject, content, response, error_4;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 8, , 9]);
                            return [4, userService.findByEmail({ email: email })];
                        case 1:
                            user = _c.sent();
                            if (!user)
                                throw http_errors_1.default.NotpasswordRecoveryTokenVerificationFound('No such user found in our records');
                            return [4, accountService.findOne({ userId: user.id })];
                        case 2:
                            userAccount = _c.sent();
                            if (!isPassword) return [3, 4];
                            return [4, JWTManager.passwordRecoveryToken({ email: email })];
                        case 3:
                            _b = _c.sent();
                            return [3, 6];
                        case 4: return [4, JWTManager.emailVerificationToken({ email: email })];
                        case 5:
                            _b = _c.sent();
                            _c.label = 6;
                        case 6:
                            emailToken = (_b).emailToken;
                            verificationUrl = config_1.default.frontend_url + "/" + (!isPassword ? 'email-verified' : 'new-password') + "/?token=" + emailToken + (!isPassword ? "&email=" + email : '');
                            from = 'noreply@africadesignschool';
                            subject = isPassword ? 'Réinitialisation mot de passe.' : 'Vérification d\'adresse email';
                            content = "\n        <div style=\" display: flex; flex-direction: column; overflow-wrap: break-word; padding-bottom: 28px; width: 100%;\">\n          <span _ngcontent-vhn-c70=\"\" class=\"preview-label\">Message</span><div _ngcontent-vhn-c70=\"\"><p>Bonjour " + userAccount.firstname + " " + userAccount.name + ",</p>\n          <p>Cliquez sur ce lien pour " + (isPassword ? 'réinitialiser votre mot de passe.' : 'valider votre adresse e-mail.') + "</p>\n          <p><a href=\"" + verificationUrl + "\">" + verificationUrl + "</a></p>\n          <p>Si vous n'avez pas demand\u00E9 \u00E0 valider cette adresse, vous pouvez ignorer cet e-mail.</p>\n          <p>Merci,</p>\n          <p>Votre \u00E9quipe " + config_1.default.appName + "</p></div>\n        </div>";
                            return [4, mailService.sendMail({
                                    from: from,
                                    to: user.email,
                                    content: content,
                                    subject: subject,
                                })];
                        case 7:
                            response = _c.sent();
                            console.log('Response: ', response);
                            return [2, __assign(__assign({}, user), userAccount)];
                        case 8:
                            error_4 = _c.sent();
                            throw error_4;
                        case 9: return [2];
                    }
                });
            });
        };
        AuthManager.passwordRecoveryTokenVerification = function (_a) {
            var passwordRecoveryToken = _a.passwordRecoveryToken;
            return __awaiter(this, void 0, void 0, function () {
                var response, error_5;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4, JWTManager.verifyPasswordRecoveryToken({ passwordRecoveryToken: passwordRecoveryToken })];
                        case 1:
                            response = _b.sent();
                            return [2, response];
                        case 2:
                            error_5 = _b.sent();
                            throw error_5;
                        case 3: return [2];
                    }
                });
            });
        };
        return AuthManager;
    }());
});
