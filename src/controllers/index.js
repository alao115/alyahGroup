/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import AuthControllerManager from './auth.controller';
import UserControllerManager from './user.controller';
import AccountControllerManager from './account.controller';

import ActivityControllerManager from './activity.controller';
import firebaseStorageControllerManager from './firebase.storage.controller';
import mailControllerManager from './mail.controller';
import importDataControllerManager from './importData.controller';

import {
  AuthManager,
  userService,
  firebaseStorageService,
  mailService,
  activityService,
  accountService,
} from '../services';

/* Import PubSub store */
import eventStore from '../suscribers';

const { PubSub } = eventStore;

const AuthController = AuthControllerManager({ AuthManager, PubSub, accountService });
const UserController = UserControllerManager({ userService, PubSub });
const AccountController = AccountControllerManager({ accountService, PubSub });

const ActivityController = ActivityControllerManager({ activityService });
const firebaseStorageController = firebaseStorageControllerManager({ firebaseStorageService, PubSub });
const mailController = mailControllerManager({ mailService, PubSub });
const importDataController = importDataControllerManager({ PubSub });

export {
  AuthController,
  UserController,
  AccountController,

  ActivityController,
  firebaseStorageController,
  mailController,
  importDataController,
};
