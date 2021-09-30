"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicErrorHandler = exports.handle404 = exports.onListening = exports.onError = exports.normalizePort = void 0;
var consola_1 = require("consola");
var http_errors_1 = __importDefault(require("http-errors"));
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (Number.isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
exports.normalizePort = normalizePort;
function onError(_a) {
    var error = _a.error, port = _a.port;
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? "Pipe " + port
        : "Port " + port;
    switch (error.code) {
        case 'EACCES':
            (0, consola_1.error)(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case 'EADDRINUSE':
            (0, consola_1.error)(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
exports.onError = onError;
function onListening(_a) {
    var server = _a.server;
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? "pipe " + addr
        : "port " + addr.port;
    (0, consola_1.success)("Listening on " + addr.port);
}
exports.onListening = onListening;
function handle404(req, res, next) {
    next(http_errors_1.default.NotFound('Route not found'));
}
exports.handle404 = handle404;
function basicErrorHandler(err, req, res, next) {
    res.status(err.status || 500);
    err.message = req.app.get('env') === 'development' ? err.message : http_errors_1.default.InternalServerError();
    res.send({ error: { status: err.status, message: err.message } });
}
exports.basicErrorHandler = basicErrorHandler;
