"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var path_1 = __importDefault(require("path"));
var routes_1 = __importDefault(require("../routes"));
var appsupport_1 = require("../helpers/appsupport");
exports.default = (function (_a) {
    var app = _a.app;
    app.use((0, cors_1.default)());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    if (app.get('env') === 'development')
        app.use((0, morgan_1.default)('dev'));
    app.use('/api', (0, routes_1.default)());
    if (app.get('env') !== 'production') {
        app.use(express_1.default.static(path_1.default.join(__dirname, '../public/')));
        app.get(/.*/, function (req, res) { return res.sendFile(path_1.default.join(__dirname, '../public/index.html')); });
    }
    app.use(appsupport_1.handle404);
    app.use(appsupport_1.basicErrorHandler);
    return Promise.resolve();
});
