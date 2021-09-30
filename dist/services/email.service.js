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
var nodemailer_1 = __importDefault(require("nodemailer"));
var config_1 = __importDefault(require("../config"));
var MailService = (function () {
    function MailService() {
    }
    MailService.sendMail = function (_a) {
        var from = _a.from, to = _a.to, content = _a.content, subject = _a.subject, attachments = _a.attachments;
        return __awaiter(this, void 0, void 0, function () {
            var testAccount, transporter, info, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4, nodemailer_1.default.createTestAccount()];
                    case 1:
                        testAccount = _b.sent();
                        return [4, nodemailer_1.default.createTransport({
                                host: config_1.default.email_host || 'smtp.ethereal.email',
                                port: config_1.default.email_port || 587,
                                secure: config_1.default.email_secure || false,
                                auth: {
                                    user: config_1.default.email_user || testAccount.user,
                                    pass: config_1.default.email_pass || testAccount.pass,
                                },
                            })];
                    case 2:
                        transporter = _b.sent();
                        return [4, transporter.sendMail({
                                from: from,
                                to: to,
                                subject: subject,
                                html: content,
                                attachments: attachments
                            })];
                    case 3:
                        info = _b.sent();
                        console.log('Preview URL: %s', nodemailer_1.default.getTestMessageUrl(info));
                        return [2, { info: info.messageId, preview: nodemailer_1.default.getTestMessageUrl(info) }];
                    case 4:
                        err_1 = _b.sent();
                        throw err_1;
                    case 5: return [2];
                }
            });
        });
    };
    return MailService;
}());
exports.default = MailService;
