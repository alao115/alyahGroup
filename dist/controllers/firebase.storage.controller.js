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
exports.default = (function (_a) {
    var firebaseStorageService = _a.firebaseStorageService, PubSub = _a.PubSub;
    return (function () {
        function firebaseStorageController() {
        }
        firebaseStorageController.upload = function (req, res, next) {
            return __awaiter(this, void 0, void 0, function () {
                var filePath, file, authUser, fileInfo, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            filePath = req.payload.validatedData.filePath;
                            file = req.file;
                            authUser = req.payload.authUser;
                            return [4, firebaseStorageService.upload({ filePath: filePath, file: file })];
                        case 1:
                            fileInfo = _a.sent();
                            PubSub.publish('CREATE_ACTIVITY', JSON.stringify({
                                description: filePath + " uploaded by " + authUser._id, title: 'File uploading', elementType: 'file', createdBy: authUser._id,
                            }));
                            res.send({ success: 1, data: { fileInfo: fileInfo } });
                            return [3, 3];
                        case 2:
                            error_1 = _a.sent();
                            next(error_1);
                            return [3, 3];
                        case 3: return [2];
                    }
                });
            });
        };
        firebaseStorageController.download = function (req, res, next) {
            return __awaiter(this, void 0, void 0, function () {
                var filePath, authUser, file, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            filePath = req.payload.validatedData.filePath;
                            authUser = req.payload.authUser;
                            return [4, firebaseStorageService.download({ filePath: filePath })];
                        case 1:
                            file = _a.sent();
                            PubSub.publish('CREATE_ACTIVITY', JSON.stringify({
                                description: filePath + " downloaded by " + authUser._id, title: 'File downloading', elementType: 'file', createdBy: authUser._id,
                            }));
                            res.send({ success: 1, data: { file: file } });
                            return [3, 3];
                        case 2:
                            error_2 = _a.sent();
                            next(error_2);
                            return [3, 3];
                        case 3: return [2];
                    }
                });
            });
        };
        firebaseStorageController.delete = function (req, res, next) {
            return __awaiter(this, void 0, void 0, function () {
                var filePath, authUser, file, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            filePath = req.payload.validatedData.filePath;
                            authUser = req.payload.authUser;
                            if (!filePath)
                                throw new Error('File path is missing');
                            return [4, firebaseStorageService.delete({ filePath: filePath })];
                        case 1:
                            file = _a.sent();
                            PubSub.publish('CREATE_ACTIVITY', JSON.stringify({
                                description: filePath + " deleted by " + authUser._id, title: 'File deletion', elementType: 'file', createdBy: authUser._id,
                            }));
                            res.send({ success: 1, data: { file: file } });
                            return [3, 3];
                        case 2:
                            error_3 = _a.sent();
                            next(error_3);
                            return [3, 3];
                        case 3: return [2];
                    }
                });
            });
        };
        firebaseStorageController.getUsers = function (req, res, next) {
            return __awaiter(this, void 0, void 0, function () {
                var users, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4, firebaseStorageService.getUserFromFirebase()];
                        case 1:
                            users = _a.sent();
                            res.send({ success: 1, data: { users: users } });
                            return [3, 3];
                        case 2:
                            error_4 = _a.sent();
                            next(error_4);
                            return [3, 3];
                        case 3: return [2];
                    }
                });
            });
        };
        return firebaseStorageController;
    }());
});
