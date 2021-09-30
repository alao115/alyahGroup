/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import Router from 'express';

import { UserController } from '../controllers';

const router = Router();

export default ({ app, ValidationManager, JWTManager }) => {
  app.use('/users', router);

  router.use(JWTManager.verifyAccessToken);

  router.post('/', ValidationManager.validationHelper(ValidationManager.schemas().user), UserController.create);

  router.get('/', UserController.getAll);

  router.get('/me', UserController.getAuthUser);

  router.get('/:userID', UserController.getOne);

  router.patch('/:userID', UserController.update);

  router.delete('/:userID', UserController.delete);
};
