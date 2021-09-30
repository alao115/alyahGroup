/* eslint-disable prettier/prettier */
import Router from 'express';

import multer from 'multer';

import { mailController } from '../controllers';

const uploadMiddleware = multer({
  // dest: 'downloads/'
});

const router = Router();

// eslint-disable-next-line no-unused-vars
export default ({ app, ValidationManager, JWTManager }) => {
  app.use('/mail', router);

  // router.use(JWTManager.verifyAccessToken);

  router.post('/', uploadMiddleware.fields([{ name: 'from', maxCount: 1 }, { name: 'to', maxCount: 10000 }, { name: 'subject', maxCount: 1 }, { name: 'content', maxCount: 1 }, { name: 'attachments', maxCount: 1 }]), mailController.sendMail);
};
