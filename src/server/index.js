/* eslint-disable arrow-parens */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-promise-reject-errors */
import https from 'https';
import { createServer } from 'http';
import path from 'path';
import fs from 'fs';
import config from '../config';
import { normalizePort } from '../helpers/appsupport';

export default ({ app }) => new Promise((resolve, reject) => {
  const port = normalizePort(config.port);
  const hostname = normalizePort(config.hostname);

  if (app.get('env') === 'development') {
    const server = createServer(app);

    server.listen(port, hostname);
    server.on('listening', () => resolve(server));
    server.on('error', error => reject({ error, port }));
  } else {
    const option = {
      key: fs.readFileSync(path.join('keys', 'server.key'), 'utf-8'),
      cert: fs.readFileSync(path.join('keys', 'server.cert'), 'utf-8'),
    };

    const server = https.createServer(option, app);
    server.listen(port, hostname);
    server.on('listening', () => resolve(server));
    server.on('error', error => reject({ error, port }));
  }
});
