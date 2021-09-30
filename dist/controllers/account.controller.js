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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (_a) {
    var accountService = _a.accountService, PubSub = _a.PubSub;
    return (function () {
        function AccountController() {
        }
        AccountController.getAll = function (req, res, next) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, authUser, data, accounts, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            _a = req.payload, authUser = _a.authUser, data = _a.validatedData;
                            return [4, accountService.getAll()];
                        case 1:
                            accounts = _b.sent();
                            res.send({ success: 1, data: { accounts: accounts } });
                            PubSub.publish('CREATE_ACTIVITY', JSON.stringify({
                                description: "Accounts list requested by " + authUser._id, title: 'account data requesting', elementType: 'Account', createdBy: authUser._id,
                            }));
                            return [3, 3];
                        case 2:
                            error_1 = _b.sent();
                            next(error_1);
                            return [3, 3];
                        case 3: return [2];
                    }
                });
            });
        };
        AccountController.getOne = function (req, res, next) {
            return __awaiter(this, void 0, void 0, function () {
                var authUser, account, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            authUser = req.payload.authUser;
                            return [4, accountService.findByID({ id: req.params.accountID })];
                        case 1:
                            account = _a.sent();
                            res.send({ success: 1, data: { account: account } });
                            PubSub.publish('CREATE_ACTIVITY', JSON.stringify({
                                description: "Account (" + account._id + ") requested by " + authUser._id, title: 'account data requesting', elementType: 'Account', elementId: account._id, createdBy: authUser._id,
                            }));
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
        AccountController.create = function (req, res, next) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, authUser, data, account, error_3;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            _a = req.payload, authUser = _a.authUser, data = _a.validatedData;
                            return [4, accountService.create(__assign(__assign({}, data), { createdBy: authUser._id }))];
                        case 1:
                            account = _b.sent();
                            PubSub.publish('CREATE_ACTIVITY', JSON.stringify({
                                description: "Account (" + account._id + ") created by " + authUser._id, title: 'account creation', elementType: 'Account', elementId: account._id, createdBy: authUser._id,
                            }));
                            res.send({ success: 1, data: { account: account } });
                            return [3, 3];
                        case 2:
                            error_3 = _b.sent();
                            next(error_3);
                            return [3, 3];
                        case 3: return [2];
                    }
                });
            });
        };
        AccountController.update = function (req, res, next) {
            return __awaiter(this, void 0, void 0, function () {
                var authUser, data, id, account, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            authUser = req.payload.authUser;
                            data = req.body;
                            id = req.params.accountID;
                            return [4, accountService.update({ data: __assign(__assign({}, data), { updatedBy: authUser._id }), id: id })];
                        case 1:
                            account = _a.sent();
                            res.send({ success: 1, data: { account: account } });
                            PubSub.publish('CREATE_ACTIVITY', JSON.stringify({
                                description: "Account (" + account._id + ") updated by " + authUser._id, title: 'account data updating', elementType: 'Account', elementId: account._id, createdBy: authUser._id,
                            }));
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
        AccountController.delete = function (req, res, next) {
            return __awaiter(this, void 0, void 0, function () {
                var authUser, id, account, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            authUser = req.payload.authUser;
                            id = req.params.accountID;
                            return [4, accountService.delete({ id: id })];
                        case 1:
                            account = _a.sent();
                            res.send({ success: 1, data: { account: account } });
                            PubSub.publish('CREATE_ACTIVITY', JSON.stringify({
                                description: "Account (" + id + ") deleted by " + authUser._id, title: 'account data deleting', elementType: 'Account', elementId: id, createdBy: authUser._id,
                            }));
                            return [3, 3];
                        case 2:
                            error_5 = _a.sent();
                            next(error_5);
                            return [3, 3];
                        case 3: return [2];
                    }
                });
            });
        };
        AccountController.search = function (req, res, next) {
            return __awaiter(this, void 0, void 0, function () {
                var authUser, searchFied, account, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            authUser = req.payload.authUser;
                            searchFied = req.body;
                            return [4, accountService.findOne(__assign({}, searchFied))];
                        case 1:
                            account = _a.sent();
                            res.send({ success: 1, data: { account: account } });
                            PubSub.publish('CREATE_ACTIVITY', JSON.stringify({
                                description: "Account (" + account._id + ") requested by " + authUser._id, title: 'account data requesting', elementType: 'Account', elementId: account._id, createdBy: authUser._id,
                            }));
                            return [3, 3];
                        case 2:
                            error_6 = _a.sent();
                            next(error_6);
                            return [3, 3];
                        case 3: return [2];
                    }
                });
            });
        };
        return AccountController;
    }());
});
