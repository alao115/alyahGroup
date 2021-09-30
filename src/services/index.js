/* eslint-disable prettier/prettier */
/* eslint-disable object-curly-newline */

/* Import each service and expose all of them from here */
// eslint-disable-next-line import/no-cycle
import AuthService from './Auth.service';
import RedisClientManager from './redisClient.service';
import ValidationManager from './validation.service';
import JWTService from './JWT.service';
import userManager from './user.service';
import accountManager from './serviceGenerator.service';

import activityManager from './activity.service';
import firebaseStorageManager from './firebase.storage.service';
import mailService from './email.service';

/* Import needed models */
import {
  User,
  Activity,
  Account,
} from '../models';

import app from '../loaders/firebase';

/* Build service if need before expose to outside */
const firebaseStorageService = firebaseStorageManager({ firebaseAdmin: app.admin });
const userService = userManager({ User });
const accountService = accountManager({ Model: Account });

const activityService = activityManager({ Activity });
const JWTManager = JWTService({ redisClientManager: RedisClientManager, userService });
const AuthManager = AuthService({ JWTManager, userService, mailService, accountService });

export {
  accountService,
  userService,

  activityService,
  firebaseStorageService,
  mailService,
  AuthManager,
  JWTManager,
  ValidationManager,
  RedisClientManager,
};
