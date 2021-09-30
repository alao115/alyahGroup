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
Object.defineProperty(exports, "__esModule", { value: true });
var uuidv4_1 = require("uuidv4");
exports.default = (function (_a) {
    var firebaseAdmin = _a.firebaseAdmin;
    return (function () {
        function firebaseStorageService() {
        }
        firebaseStorageService.upload = function (_a) {
            var filePath = _a.filePath, file = _a.file;
            return __awaiter(this, void 0, void 0, function () {
                var bucket, fileToUpload, response, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 3, , 4]);
                            bucket = firebaseAdmin.storage().bucket();
                            fileToUpload = bucket.file(filePath);
                            return [4, fileToUpload.save(file.buffer, {
                                    destination: filePath,
                                    metadata: {
                                        metadata: {
                                            firebaseStorageDownloadTokens: (0, uuidv4_1.uuid)(),
                                        },
                                    },
                                })];
                        case 1:
                            _b.sent();
                            return [4, fileToUpload.getSignedUrl({
                                    action: 'read',
                                    expires: '03-09-6491',
                                })];
                        case 2:
                            response = _b.sent();
                            return [2, response[0]];
                        case 3:
                            error_1 = _b.sent();
                            throw error_1;
                        case 4: return [2];
                    }
                });
            });
        };
        firebaseStorageService.download = function (_a) {
            var filePath = _a.filePath;
            return __awaiter(this, void 0, void 0, function () {
                var bucket, fileToDownload, response, error_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            bucket = firebaseAdmin.storage().bucket();
                            fileToDownload = bucket.file(filePath);
                            return [4, fileToDownload.getSignedUrl({
                                    action: 'read',
                                    expires: '03-09-2491',
                                })];
                        case 1:
                            response = _b.sent();
                            return [2, response[0]];
                        case 2:
                            error_2 = _b.sent();
                            throw error_2;
                        case 3: return [2];
                    }
                });
            });
        };
        firebaseStorageService.delete = function (_a) {
            var filePath = _a.filePath;
            return __awaiter(this, void 0, void 0, function () {
                var bucket, fileToDownload, response, error_3;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            bucket = firebaseAdmin.storage().bucket();
                            fileToDownload = bucket.file(filePath);
                            return [4, fileToDownload.delete()];
                        case 1:
                            response = _b.sent();
                            return [2, response];
                        case 2:
                            error_3 = _b.sent();
                            throw error_3;
                        case 3: return [2];
                    }
                });
            });
        };
        firebaseStorageService.getUserFromFirebase = function () {
            return __awaiter(this, void 0, void 0, function () {
                var response, users_1, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4, firebaseAdmin.auth().listUsers()];
                        case 1:
                            response = _a.sent();
                            users_1 = [];
                            response.users.forEach(function (user) { return users_1.push(user.toJSON()); });
                            return [2, users_1];
                        case 2:
                            error_4 = _a.sent();
                            throw error_4;
                        case 3: return [2];
                    }
                });
            });
        };
        return firebaseStorageService;
    }());
});
