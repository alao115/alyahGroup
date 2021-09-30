"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var https_1 = __importDefault(require("https"));
var http_1 = require("http");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var config_1 = __importDefault(require("../config"));
var appsupport_1 = require("../helpers/appsupport");
exports.default = (function (_a) {
    var app = _a.app;
    return new Promise(function (resolve, reject) {
        var port = (0, appsupport_1.normalizePort)(config_1.default.port);
        var hostname = (0, appsupport_1.normalizePort)(config_1.default.hostname);
        if (app.get('env') === 'development') {
            var server_1 = (0, http_1.createServer)(app);
            server_1.listen(port, hostname);
            server_1.on('listening', function () { return resolve(server_1); });
            server_1.on('error', function (error) { return reject({ error: error, port: port }); });
        }
        else {
            var option = {
                key: fs_1.default.readFileSync(path_1.default.join('keys', 'server.key'), 'utf-8'),
                cert: fs_1.default.readFileSync(path_1.default.join('keys', 'server.cert'), 'utf-8'),
            };
            var server_2 = https_1.default.createServer(option, app);
            server_2.listen(port, hostname);
            server_2.on('listening', function () { return resolve(server_2); });
            server_2.on('error', function (error) { return reject({ error: error, port: port }); });
        }
    });
});
