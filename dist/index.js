"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var server_1 = __importDefault(require("./server"));
var loaders_1 = __importDefault(require("./loaders"));
var appsupport_1 = require("./helpers/appsupport");
var config_1 = __importDefault(require("./config"));
function startApp() {
    var app = (0, express_1.default)();
    app.set('env', config_1.default.environment);
    (0, loaders_1.default)({ app: app });
    (0, server_1.default)({ app: app })
        .then(function (server) { return (0, appsupport_1.onListening)({ server: server }); })
        .catch(function (_a) {
        var error = _a.error, port = _a.port;
        return (0, appsupport_1.onError)({ error: error, port: port });
    });
}
startApp();
