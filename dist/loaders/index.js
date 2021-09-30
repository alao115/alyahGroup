"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var consola_1 = require("consola");
var express_1 = __importDefault(require("./express"));
exports.default = (function (_a) {
    var app = _a.app;
    (0, express_1.default)({ app: app }).then(function () { return (0, consola_1.success)('Loading express loader successfully'); });
});
