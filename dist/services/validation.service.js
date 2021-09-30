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
var joi_1 = __importDefault(require("joi"));
var http_errors_1 = __importDefault(require("http-errors"));
var ValidationManager = (function () {
    function ValidationManager() {
    }
    ValidationManager.schemas = function () {
        return {
            signup: joi_1.default.object({
                accountType: joi_1.default.string().valid('admin', 'student', 'teacher', 'applicant'),
                adminType: joi_1.default.string().valid('schooling', 'onboarding'),
                curriculumId: joi_1.default.string().allow(''),
                email: joi_1.default.string().email().required(),
                firstname: joi_1.default.string().min(3).required(),
                name: joi_1.default.string().min(3).required(),
                password: joi_1.default.string().min(8).default('12345678'),
                promId: joi_1.default.string().allow(''),
                subjects: joi_1.default.array().items(joi_1.default.string()).allow('[]', ''),
                phone: joi_1.default.string().allow(''),
                matricule: joi_1.default.string().allow(''),
            }),
            signin: joi_1.default.object({
                email: joi_1.default.string().email().required(),
                password: joi_1.default.string().min(8).required(),
            }),
            refreshToken: joi_1.default.object({
                'refresh-token': joi_1.default.string().required(),
            }),
            passwordRecoveryToken: joi_1.default.object({
                'password-recovery-token': joi_1.default.string().required(),
            }),
            emailVerification: joi_1.default.object({
                'email-token': joi_1.default.string().required(),
            }),
            resetPassword: joi_1.default.object({
                email: joi_1.default.string().email().required(),
            }),
            absence: joi_1.default.object({
                absenceDate: joi_1.default.string().allow(''),
                arrivedTime: joi_1.default.string().allow(''),
                count: joi_1.default.number().allow(0, ''),
                reason: joi_1.default.string().allow(''),
                semester: joi_1.default.string().required(),
                studentId: joi_1.default.string().required(),
                subjectId: joi_1.default.string().allow(null, ''),
                eventId: joi_1.default.string().allow(''),
                type: joi_1.default.string().required()
            }),
            academicyear: joi_1.default.object({
                endDate: joi_1.default.string().required(),
                firstSemesterEnd: joi_1.default.string().required(),
                firstSemesterStart: joi_1.default.string().required(),
                label: joi_1.default.string().required(),
                secondSemesterEnd: joi_1.default.string().required(),
                secondSemesterStart: joi_1.default.string().required(),
                startDate: joi_1.default.string().required(),
            }),
            curriculum: joi_1.default.object({
                code: joi_1.default.string().required(),
                color: joi_1.default.object({
                    backgroundColor: joi_1.default.string().required(),
                    borderColor: joi_1.default.string().required(),
                    tagBackgroundColor: joi_1.default.string().required(),
                    value: joi_1.default.string().required(),
                }).required(),
                fullScolarship: joi_1.default.number().required(),
                halfScolarship: joi_1.default.number().required(),
                illustration: joi_1.default.array().items(joi_1.default.object({
                    id: joi_1.default.number(),
                    value: joi_1.default.string().required(),
                })).allow('[]'),
                label: joi_1.default.string().required(),
                tuition: joi_1.default.number().required(),
            }),
            prom: joi_1.default.object({
                curriculumId: joi_1.default.string().required(),
                description: joi_1.default.string().required(),
                endYear: joi_1.default.string().required(),
                label: joi_1.default.string().required(),
                startYear: joi_1.default.string().required()
            }),
            enterprise: joi_1.default.object({
                academicYearId: joi_1.default.string().required(),
                address: joi_1.default.string().required(),
                email: joi_1.default.string().required(),
                isPartner: joi_1.default.boolean().default(false),
                name: joi_1.default.string().required(),
                phone: joi_1.default.string().required(),
            }),
            event: joi_1.default.object({
                accountId: joi_1.default.string().allow(''),
                colorEvent: joi_1.default.object({
                    backgroundColor: joi_1.default.string().allow(''),
                    borderColor: joi_1.default.string().allow(''),
                    textColor: joi_1.default.string().allow(''),
                    value: joi_1.default.string().allow(''),
                }).allow(null, {}, ''),
                curriculumId: joi_1.default.string().required(),
                daysOfWeek: joi_1.default.array().items(joi_1.default.string().allow('')).allow(''),
                description: joi_1.default.string().allow(''),
                end: joi_1.default.string().allow(''),
                endRecur: joi_1.default.string().allow(''),
                endTime: joi_1.default.string().allow(''),
                photoEvent: joi_1.default.string().allow(''),
                promId: joi_1.default.string().required(),
                label: joi_1.default.string().allow(''),
                start: joi_1.default.string().allow(''),
                startRecur: joi_1.default.string().allow(''),
                startTime: joi_1.default.string().allow(''),
                subject: joi_1.default.string().allow(''),
                teacher: joi_1.default.string().allow(null),
                title: joi_1.default.string().required(),
                typeEvent: joi_1.default.string().required(),
            }),
            grade: joi_1.default.object({
                code: joi_1.default.string().required(),
                color: joi_1.default.object({
                    backgroundColor: joi_1.default.string().required(),
                    borderColor: joi_1.default.string().required(),
                    tagBackgroundColor: joi_1.default.string().required().allow(''),
                    value: joi_1.default.string().required(),
                }),
                description: joi_1.default.string().allow(''),
                label: joi_1.default.string().required(),
                maxRange: joi_1.default.string().required(),
                minRange: joi_1.default.string().required()
            }),
            internshipType: joi_1.default.object({
                code: joi_1.default.string().required(),
                description: joi_1.default.string().required(),
                duration: joi_1.default.string().required(),
                label: joi_1.default.string().required(),
                curriculumId: joi_1.default.string().required(),
                promId: joi_1.default.string().required(),
            }),
            internship: joi_1.default.object({
                endDate: joi_1.default.string().allow(''),
                enterpriseId: joi_1.default.string().required(),
                internshipTypeId: joi_1.default.string().required(),
                startDate: joi_1.default.string().allow(''),
                status: joi_1.default.boolean().allow(''),
                studentId: joi_1.default.string().required(),
            }),
            offer: joi_1.default.object({
                description: joi_1.default.string().required(),
                duration: joi_1.default.string().required(),
                enterpriseId: joi_1.default.string().required(),
                internshipTypeId: joi_1.default.string().required(),
                isArchived: joi_1.default.string().required().valid('Not archived', 'archived'),
                status: joi_1.default.string().required(),
                title: joi_1.default.string().required(),
            }),
            folder: joi_1.default.object({
                accountId: joi_1.default.string().required(),
                curriculumId: joi_1.default.string().required(),
                isArchived: joi_1.default.string().valid('Not archived', 'archived'),
                status: joi_1.default.string().allow(''),
            }),
            personalInfo: joi_1.default.object({
                birthDate: joi_1.default.string().allow(''),
                birthPlace: joi_1.default.string().allow(''),
                bordereauNumber: joi_1.default.number().allow('0'),
                bordereauUrl: joi_1.default.string().allow(''),
                fatherProf: joi_1.default.string().allow(''),
                folderId: joi_1.default.string().required(),
                motherProf: joi_1.default.string().allow(''),
                nationality: joi_1.default.string().allow(''),
                siblings: joi_1.default.string().allow('')
            }),
            address: joi_1.default.object({
                city: joi_1.default.string().allow(''),
                country: joi_1.default.string().allow(''),
                email: joi_1.default.string().email().required(),
                familyAddress: joi_1.default.string().allow(''),
                folderId: joi_1.default.string().required(),
                phone: joi_1.default.string().allow(''),
                postalCode: joi_1.default.string().allow('')
            }),
            billing: joi_1.default.object({
                studentId: joi_1.default.string().required()
            }),
            tuition: joi_1.default.object({
                accountId: joi_1.default.string().required()
            }),
            payment: joi_1.default.object({
                amount: joi_1.default.number().required(),
                paymentType: joi_1.default.string().required(),
                restToPay: joi_1.default.number().required(),
                tuitionId: joi_1.default.string().required()
            }),
            document: joi_1.default.object({
                bacGradebookUrl: joi_1.default.string().allow(''),
                bordereauNumber: joi_1.default.number().allow('0'),
                bordereauUrl: joi_1.default.string().allow(''),
                folderId: joi_1.default.string().required(),
                idPhotoUrl: joi_1.default.string().allow(''),
                preSeniorYearGradebookUrl: joi_1.default.string().allow(''),
                SeniorYearGradebookUrl: joi_1.default.string().allow(''),
                universityGradebookUrl: joi_1.default.string().allow(''),
            }),
            experience: joi_1.default.object({
                art: joi_1.default.string().allow(''),
                experiences: joi_1.default.array().items(joi_1.default.object({
                    enterprise: joi_1.default.string().allow(''),
                    job: joi_1.default.string().allow(''),
                    jobEnd: joi_1.default.string().allow(''),
                    jobStart: joi_1.default.string().allow(''),
                })).allow('[]', ''),
                folderId: joi_1.default.string().required(),
                knowAds: joi_1.default.string().allow(''),
                logiciels: joi_1.default.array().items(joi_1.default.object({
                    logi2d: joi_1.default.string().allow(''),
                    logiLvl: joi_1.default.string().allow('')
                })).allow('[]', ''),
                sports: joi_1.default.string().allow(''),
            }),
            scolarship: joi_1.default.object({
                currentSituation: joi_1.default.string().allow(''),
                englishLevel: joi_1.default.string().allow(''),
                folderId: joi_1.default.string().required(),
                formations: joi_1.default.array().items(joi_1.default.object({
                    degree: joi_1.default.string().allow(''),
                    degreeYear: joi_1.default.string().allow(''),
                    school: joi_1.default.string().allow('')
                })).allow('[]', '')
            }),
            subject: joi_1.default.object({
                academicYearId: joi_1.default.string().required(),
                code: joi_1.default.string().allow(''),
                coef: joi_1.default.number().required(),
                color: joi_1.default.object({
                    backgroundColor: joi_1.default.string().allow(''),
                    borderColor: joi_1.default.string().allow(''),
                    tagBackgroundColor: joi_1.default.string().allow(''),
                    value: joi_1.default.string().required(),
                }).required(),
                curriculumId: joi_1.default.string().required(),
                label: joi_1.default.string().required(),
                promId: joi_1.default.string().required(),
                selectedIcons: joi_1.default.array().items(joi_1.default.object({
                    id: joi_1.default.number().allow(''),
                    value: joi_1.default.string().allow(''),
                })).allow('[]'),
                semester: joi_1.default.string().required(),
                status: joi_1.default.string().allow(''),
                teachingUnitId: joi_1.default.string().allow('')
            }),
            teachingUnit: joi_1.default.object({
                academicYearId: joi_1.default.string().required(),
                code: joi_1.default.string().allow(''),
                credits: joi_1.default.number().required(),
                curriculumId: joi_1.default.string().required(),
                label: joi_1.default.string().required(),
                promId: joi_1.default.string().required(),
                semester: joi_1.default.string().required(),
                status: joi_1.default.string().allow('')
            }),
            exam: joi_1.default.object({
                code: joi_1.default.string().required(),
                coef: joi_1.default.number().required(),
                curriculumId: joi_1.default.string().required(),
                description: joi_1.default.string().allow(''),
                examDate: joi_1.default.string().required(),
                label: joi_1.default.string().required(),
                listId: joi_1.default.string().allow(''),
                promId: joi_1.default.string().required(),
                status: joi_1.default.string().required(),
                subjectId: joi_1.default.string().required(),
            }),
            mark: joi_1.default.object({
                coef: joi_1.default.number().required(),
                curriculumId: joi_1.default.string().required(),
                examId: joi_1.default.string().required(),
                listId: joi_1.default.string().allow(''),
                mark: joi_1.default.number().required(),
                reason: joi_1.default.string().allow(''),
                semester: joi_1.default.string().allow(''),
                subjectId: joi_1.default.string().required(),
                studentId: joi_1.default.string().required(),
            }),
            retakeExam: joi_1.default.object({
                coef: joi_1.default.number().allow(''),
                curriculumId: joi_1.default.string().required(),
                dateRetake: joi_1.default.string().required(),
                description: joi_1.default.string().allow(''),
                mark: joi_1.default.number().allow(''),
                promId: joi_1.default.string().required(),
                status: joi_1.default.string().allow(''),
                subjectId: joi_1.default.string().required(),
            }),
            user: joi_1.default.object({
                email: joi_1.default.string().email().required(),
                password: joi_1.default.string().required(),
            }),
            fileUpload: joi_1.default.object({
                filePath: joi_1.default.string().required(),
                file: joi_1.default.binary().required(),
            }),
            importFile: joi_1.default.object({
                file: joi_1.default.binary().required(),
            }),
            fileDownloadDeletion: joi_1.default.object({
                filePath: joi_1.default.string().required(),
            }),
            convocation: joi_1.default.object({
                code: joi_1.default.string().required(),
                consigne: joi_1.default.string().required(),
                dateConvoc: joi_1.default.string(),
                timeConvoc: joi_1.default.string().required()
            }),
            mail: joi_1.default.object({
                from: joi_1.default.string().email().required(),
                to: joi_1.default.array().required(),
                subject: joi_1.default.string().required(),
                content: joi_1.default.string().required(),
                attachments: joi_1.default.array(),
                file: joi_1.default.array()
            }),
            mailVerification: joi_1.default.object({
                email: joi_1.default.string().email().required(),
            }),
        };
    };
    ValidationManager.validationHelper = function (schema) {
        var _this = this;
        return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        result = null;
                        if (!req.file) return [3, 2];
                        return [4, schema.validateAsync(__assign(__assign({}, req.body), { file: req.file.buffer }), { abortEarly: false })];
                    case 1:
                        result = _a.sent();
                        return [3, 4];
                    case 2: return [4, schema.validateAsync(req.body, { abortEarly: false })];
                    case 3:
                        result = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!req.payload)
                            req.payload = {};
                        req.payload.validatedData = result;
                        next();
                        return [3, 6];
                    case 5:
                        err_1 = _a.sent();
                        next(http_errors_1.default.BadRequest(err_1.message));
                        return [3, 6];
                    case 6: return [2];
                }
            });
        }); };
    };
    return ValidationManager;
}());
exports.default = ValidationManager;
