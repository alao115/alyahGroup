"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activitySchema = void 0;
var mongoose_1 = require("mongoose");
var moment_1 = __importDefault(require("moment"));
var user_model_1 = require("./user.model");
exports.activitySchema = new mongoose_1.Schema({
    id: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: function () {
            return this._id;
        }
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: mongoose_1.models.users,
    },
    createdAt: String,
    description: {
        type: String,
        default: '-',
    },
    elementId: {
        type: String,
        default: '-',
    },
    elementType: {
        type: String,
        default: '',
    },
    title: {
        type: String,
        default: '',
    },
}, { timestamps: { currentTime: function () { return (0, moment_1.default)().format('DD/MM/YYYY HH:mm:ss'); } }, });
(0, mongoose_1.model)('User', user_model_1.userSchema);
exports.default = (0, mongoose_1.model)('activities', exports.activitySchema);
