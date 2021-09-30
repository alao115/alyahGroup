/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import Router from 'express';

import { ActivityController } from '../controllers';

const router = Router();

export default ({ app, ValidationManager, JWTManager }) => {
  app.use('/activities', router);

  router.use(JWTManager.verifyAccessToken);

  // router.post('/', ValidationManager.validationHelper(ValidationManager.schemas().createactivitie), ActivityController.create);

  router.get('/', ActivityController.getAll);

  router.get('/:ActivityID', ActivityController.getOne);

  // router.patch('/:ActivityID', ActivityController.update);

  router.delete('/:ActivityID', ActivityController.delete);
};
