/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import Router from 'express';

import { AuthController, UserController } from '../controllers';

const router = Router();

export default ({ app, ValidationManager }) => {
  app.use('/auth', router);

  router.post('/signup', ValidationManager.validationHelper(ValidationManager.schemas().signup), AuthController.signUp);

  router.post('/signin', ValidationManager.validationHelper(ValidationManager.schemas().signin), AuthController.signIn);

  router.post('/refresh-token', ValidationManager.validationHelper(ValidationManager.schemas().refreshToken), AuthController.refreshToken);

  router.post('/send-verification-email', ValidationManager.validationHelper(ValidationManager.schemas().mailVerification), AuthController.sendVerificationMail());

  router.post('/email-token-verification', ValidationManager.validationHelper(ValidationManager.schemas().emailVerification), AuthController.emailVerification);

  router.post('/send-password-recovery-email', ValidationManager.validationHelper(ValidationManager.schemas().mailVerification), AuthController.sendVerificationMail({ isPassword: true }));

  router.post('/password-recovery-token-verification', ValidationManager.validationHelper(ValidationManager.schemas().passwordRecoveryToken), AuthController.passwordRecoveryTokenVerification);

  router.patch('/password-reset/:userID', UserController.update);

  //router.post('', );

};
