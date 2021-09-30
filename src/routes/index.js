/* eslint-disable prettier/prettier */
import Router from 'express';

import authRoute from './auth.route';
import userRoute from './user.route';
import accountRoute from './account.route';

import firebaseStorageRoute from './firebase.storage.route';
import activityRoute from './activity.route';
import mailRoute from './mail.route';

import { ValidationManager, JWTManager } from '../services';

export default () => {
  const router = Router();

  authRoute({ app: router, ValidationManager });
  userRoute({ app: router, ValidationManager, JWTManager });
  accountRoute({ app: router, ValidationManager, JWTManager });

  firebaseStorageRoute({ app: router, ValidationManager, JWTManager });
  activityRoute({ app: router, ValidationManager, JWTManager });
  mailRoute({ app: router, ValidationManager, JWTManager });

  return router;
};
