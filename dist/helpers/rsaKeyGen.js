"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_rsa_1 = __importDefault(require("node-rsa"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var key = new node_rsa_1.default({ b: 1024 });
var public_key = key.exportKey('public');
var private_key = key.exportKey('private');
fs_1.default.writeFileSync(path_1.default.join('keys', 'password_recovery_public_key.pem'), public_key);
fs_1.default.writeFileSync(path_1.default.join('keys', 'password_recovery_private_key.pem'), private_key);
