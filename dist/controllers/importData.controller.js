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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var consola_1 = require("consola");
exports.default = (function (_a) {
    var PubSub = _a.PubSub;
    return (function () {
        function Import() {
        }
        Import.purgeData = function (collections) {
            var localCollections = collections;
            localCollections.forEach(function (collection) {
                var name = collection.name, data = collection.data;
                data.forEach(function (entity, ind) {
                    var entityKeys = Object.keys(entity);
                    entityKeys.forEach(function (key, index) {
                        var isKeyId = key.match(/Id$/);
                        if (isKeyId && entity[key]) {
                            var keyCollection_1 = key.replace(/Id$/, '');
                            localCollections.forEach(function (collection_1) {
                                if (collection_1.name === (keyCollection_1 + 's')) {
                                    var isKeyMatchExist = collection_1.data.find(function (entity_1) { return entity_1[keyCollection_1 + 'ID'] === entity[key]; });
                                    if (!isKeyMatchExist) {
                                        delete data[ind];
                                    }
                                }
                            });
                        }
                        if (entity[key] === '')
                            entity[key] = null;
                    });
                });
                collection.data = collection.data.filter(function (col) { return col !== undefined && col; });
            });
            return localCollections;
        };
        Import.newDatabase = function (req, res, next) {
            return __awaiter(this, void 0, void 0, function () {
                var file, authUser_1, data_1, services, collections_1, collectionOrder, k, _a, collectionName, collectionData, serviceName, relationalField, i, doc, savedDoc, l, col, j, diffDoc, studentField, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 9, , 10]);
                            file = req.file;
                            authUser_1 = req.payload.authUser;
                            data_1 = JSON.parse(file.buffer.toString());
                            return [4, Promise.resolve().then(function () { return __importStar(require('../services')); })];
                        case 1:
                            services = _b.sent();
                            collections_1 = [];
                            collectionOrder = [
                                'users',
                                'curriculums',
                                'proms',
                                'academicYears',
                                'enterprises',
                                'grades',
                                'internshipTypes',
                                'accounts',
                                'events',
                                'offers',
                                'folders',
                                'addresses',
                                'documents',
                                'experiences',
                                'billings',
                                'absences',
                                'personalInfos',
                                'scolarships',
                                'teachingUnits',
                                'subjects',
                                'retakeExams',
                                'lists',
                                'exams',
                                'marks'
                            ];
                            collectionOrder.forEach(function (key) {
                                var collectionDataTemp = data_1[key];
                                var collectonData = [];
                                Object.keys(collectionDataTemp).forEach(function (key_1) {
                                    var _a;
                                    delete collectionDataTemp[key_1].createdAt;
                                    delete collectionDataTemp[key_1].createdBy;
                                    delete collectionDataTemp[key_1].modifiedAt;
                                    delete collectionDataTemp[key_1].modifiedBy;
                                    collectonData.push(__assign(__assign((_a = {}, _a[key.replace(/s$/g, '') + 'ID'] = key_1, _a.relatedField = key.replace(/s$/g, '') + 'Id', _a), collectionDataTemp[key_1]), { createdBy: authUser_1._id }));
                                });
                                collections_1.push({
                                    name: key,
                                    data: collectonData,
                                    serviceName: key.replace(/s$/g, '') + 'Service',
                                    relationalField: key.replace(/s$/g, '') + 'ID',
                                });
                            });
                            collections_1 = Import.purgeData(collections_1);
                            k = 0;
                            _b.label = 2;
                        case 2:
                            if (!(k < collections_1.length)) return [3, 8];
                            _a = collections_1[k], collectionName = _a.name, collectionData = _a.data, serviceName = _a.serviceName, relationalField = _a.relationalField;
                            if (!(services[serviceName] && serviceName !== 'curriculum')) return [3, 7];
                            i = 0;
                            _b.label = 3;
                        case 3:
                            if (!(i < collectionData.length)) return [3, 6];
                            doc = collectionData[i];
                            return [4, services[serviceName].create(doc)];
                        case 4:
                            savedDoc = _b.sent();
                            for (l = 0; l < collections_1.length; ++l) {
                                col = collections_1[l];
                                if (col.name !== collectionName) {
                                    for (j = 0; j < col.data.length; ++j) {
                                        diffDoc = col.data[j];
                                        if (doc.relatedField === 'accountId') {
                                            studentField = diffDoc['studentId'] ? 'studentId' : 'accountId';
                                            if (diffDoc[studentField] && diffDoc[studentField] === doc[relationalField])
                                                diffDoc[studentField] = savedDoc._id;
                                        }
                                        if (diffDoc[doc.relatedField] && diffDoc[doc.relatedField] === doc[relationalField]) {
                                            diffDoc[doc.relatedField] = savedDoc._id;
                                        }
                                    }
                                }
                            }
                            _b.label = 5;
                        case 5:
                            ++i;
                            return [3, 3];
                        case 6:
                            (0, consola_1.success)("Importing '" + collectionName + "' collection: Done");
                            _b.label = 7;
                        case 7:
                            ++k;
                            return [3, 2];
                        case 8:
                            PubSub.publish('CREATE_ACTIVITY', JSON.stringify({
                                description: 'Importing data from file',
                                title: 'Importing',
                                elementType: 'file',
                                createdBy: authUser_1._id,
                            }));
                            res.send({ success: 1, data: { collections: collections_1 } });
                            return [3, 10];
                        case 9:
                            error_1 = _b.sent();
                            console.log('Essaie d affichage d erreur');
                            console.log(error_1);
                            next(error_1);
                            return [3, 10];
                        case 10: return [2];
                    }
                });
            });
        };
        Import.oldDatabase = function (req, res, next) {
            return __awaiter(this, void 0, void 0, function () {
                var file, authUser_2, data_2, services, users_1, collections_2, collectionOrder, students_1, k, _a, collectionName, collectionData, serviceName, relationalField, i, doc, savedDoc, l, col, j, diffDoc, studentField, error_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 9, , 10]);
                            file = req.file;
                            authUser_2 = req.payload.authUser;
                            data_2 = JSON.parse(file.buffer.toString());
                            return [4, Promise.resolve().then(function () { return __importStar(require('../services')); })];
                        case 1:
                            services = _b.sent();
                            users_1 = {};
                            collections_2 = [];
                            collectionOrder = [
                                'users',
                                'curriculums',
                                'accounts',
                                'students',
                                'folders',
                                'personalInfos',
                                'addresses',
                                'scolarships',
                                'experiences',
                                'documents',
                            ];
                            data_2['users'].forEach(function (user) {
                                users_1[user.uid] = __assign({}, user);
                            });
                            data_2['users'] = users_1;
                            collectionOrder.forEach(function (key) {
                                var collectionDataTemp = data_2[key];
                                var collectonData = [];
                                Object.keys(collectionDataTemp).forEach(function (key_1) {
                                    var _a;
                                    delete collectionDataTemp[key_1].createdAt;
                                    delete collectionDataTemp[key_1].createdBy;
                                    delete collectionDataTemp[key_1].modifiedAt;
                                    delete collectionDataTemp[key_1].modifiedBy;
                                    collectonData.push(__assign(__assign((_a = {}, _a[key.replace(/s$/g, '') + 'ID'] = key_1, _a.relatedField = key.replace(/s$/g, '') + 'Id', _a), collectionDataTemp[key_1]), { createdBy: authUser_2._id }));
                                });
                                collections_2.push({
                                    name: key,
                                    data: collectonData,
                                    serviceName: key.replace(/s$/g, '') + 'Service',
                                    relationalField: key.replace(/s$/g, '') + 'ID',
                                });
                            });
                            students_1 = [];
                            collections_2.forEach(function (collection, index) {
                                if (collection.name === 'students') {
                                    students_1 = collection.data;
                                    delete collections_2[index];
                                }
                            });
                            collections_2 = collections_2.filter(function (collection) { return collection !== undefined && collection; });
                            collections_2.forEach(function (collection) {
                                if (collection.name === 'accounts') {
                                    var accounts_1 = collection.data;
                                    accounts_1.forEach(function (account, index) {
                                        var student = students_1.find(function (student) { return student.accountId === account.accountID; });
                                        if (student) {
                                            accounts_1[index] = __assign(__assign({}, account), { studentStatus: student.status, curriculumId: student.curriculumId, urlPhoto: student.urlPhoto });
                                        }
                                    });
                                    collection.data = accounts_1;
                                }
                            });
                            collections_2 = Import.purgeData(collections_2);
                            k = 0;
                            _b.label = 2;
                        case 2:
                            if (!(k < collections_2.length)) return [3, 8];
                            _a = collections_2[k], collectionName = _a.name, collectionData = _a.data, serviceName = _a.serviceName, relationalField = _a.relationalField;
                            if (!services[serviceName]) return [3, 7];
                            i = 0;
                            _b.label = 3;
                        case 3:
                            if (!(i < collectionData.length)) return [3, 6];
                            doc = collectionData[i];
                            return [4, services[serviceName].create(doc)];
                        case 4:
                            savedDoc = _b.sent();
                            for (l = 0; l < collections_2.length; ++l) {
                                col = collections_2[l];
                                if (col.name !== collectionName) {
                                    for (j = 0; j < col.data.length; ++j) {
                                        diffDoc = col.data[j];
                                        if (doc.relatedField === 'accountId') {
                                            studentField = diffDoc['studentId'] ? 'studentId' : 'accountId';
                                            if (diffDoc[studentField] && diffDoc[studentField] === doc[relationalField])
                                                diffDoc[studentField] = savedDoc._id;
                                        }
                                        if (diffDoc[doc.relatedField] && diffDoc[doc.relatedField] === doc[relationalField]) {
                                            diffDoc[doc.relatedField] = savedDoc._id;
                                        }
                                    }
                                }
                            }
                            _b.label = 5;
                        case 5:
                            ++i;
                            return [3, 3];
                        case 6:
                            (0, consola_1.success)("Importing '" + collectionName + "' collection: Done");
                            _b.label = 7;
                        case 7:
                            ++k;
                            return [3, 2];
                        case 8:
                            PubSub.publish('CREATE_ACTIVITY', JSON.stringify({
                                description: 'Importing data from file',
                                title: 'Importing',
                                elementType: 'file',
                                createdBy: authUser_2._id,
                            }));
                            res.send({ success: 1, data: { collections: collections_2 } });
                            return [3, 10];
                        case 9:
                            error_2 = _b.sent();
                            console.log(error_2);
                            next(error_2);
                            return [3, 10];
                        case 10: return [2];
                    }
                });
            });
        };
        return Import;
    }());
});
