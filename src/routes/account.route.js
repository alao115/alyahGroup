/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import Router from 'express';

import { AccountController } from '../controllers';

const router = Router();

export default ({ app, ValidationManager, JWTManager }) => {
  app.use('/accounts', router);

  router.use(JWTManager.verifyAccessToken);

  router.post('/', ValidationManager.validationHelper(ValidationManager.schemas().createAccount), AccountController.create);

  router.post('/search', AccountController.search);

  router.get('/', AccountController.getAll);

  router.get('/:accountID', AccountController.getOne);

  router.patch('/:accountID', AccountController.update);

  router.delete('/:accountID', AccountController.delete);
};
