/* eslint-disable prettier/prettier */
import express from 'express';

import httpServer from './server';
import bootstrap from './loaders';
import { onListening, onError } from './helpers/appsupport';
import config from './config';

function startApp() {
  const app = express();

  /* Set environment */
  app.set('env', config.environment);
  /* Set environment */

  bootstrap({ app });

  httpServer({ app })
    .then((server) => onListening({ server }))
    .catch(({ error, port }) => onError({ error, port }));
}

startApp();
