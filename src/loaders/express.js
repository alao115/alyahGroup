/* eslint-disable prettier/prettier */
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import path from 'path';

import routes from '../routes';
import { handle404, basicErrorHandler } from '../helpers/appsupport';

export default ({ app }) => {
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  if (app.get('env') === 'development') app.use(logger('dev'));

  app.use('/api', routes());

  if (app.get('env') !== 'production') {
    app.use(express.static(path.join(__dirname, '../public/')))

    app.get(/.*/, (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')))
  }

  // catch 404 and forward to error handler
  app.use(handle404);

  // error handler
  app.use(basicErrorHandler);

  return Promise.resolve();
};
