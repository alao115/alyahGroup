/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
import NodeRsa from 'node-rsa';
import fs from 'fs';
import path from 'path';

const key = new NodeRsa({ b: 1024 });

const public_key = key.exportKey('public');
const private_key = key.exportKey('private');

fs.writeFileSync(path.join('keys', 'password_recovery_public_key.pem'), public_key);
fs.writeFileSync(path.join('keys', 'password_recovery_private_key.pem'), private_key);
