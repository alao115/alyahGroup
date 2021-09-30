"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountSchema = void 0;
var mongoose_1 = require("mongoose");
var moment_1 = __importDefault(require("moment"));
exports.accountSchema = new mongoose_1.Schema({
    id: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: function () {
            return this._id;
        },
    },
    createdAt: String,
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: mongoose_1.models.users,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        default: '',
    },
    phone: {
        type: String,
        default: '',
    },
    updatedAt: String,
    updatedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: mongoose_1.models.users,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: mongoose_1.models.users,
        required: true,
    },
}, { timestamps: { currentTime: function () { return (0, moment_1.default)().format('DD/MM/YYYY HH:mm:ss'); } } });
exports.default = (0, mongoose_1.model)('accounts', exports.accountSchema);
