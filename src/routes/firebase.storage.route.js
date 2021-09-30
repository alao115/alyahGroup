/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import Router from 'express';

import multer from 'multer';

import { access, mkdir } from 'fs/promises';

import { firebaseStorageController } from '../controllers';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'files');
  },
  filename: (req, file, cb) => {
    const { filePath } = req.body;
    const fileDir = filePath.split('/')[0];
    access(`files/${fileDir}`)
      .then((result) => result)
      .then(() => cb(null, filePath))
      .catch(async (err) => {
        if (err.code === 'ENOENT') {
          await mkdir(`files/${fileDir}`);
          return cb(null, filePath);
        }
        return cb(err, null);
      });
  },
});

const uploadMiddleware = multer({
  /* storage, */
});

const router = Router();

export default ({ app, ValidationManager, JWTManager }) => {
  app.use('/storage', router);

  router.use(JWTManager.verifyAccessToken);

  router.post('/upload', uploadMiddleware.single('file'), ValidationManager.validationHelper(ValidationManager.schemas().fileUpload), firebaseStorageController.upload);

  router.get('/download', ValidationManager.validationHelper(ValidationManager.schemas().fileDownloadDeletion), firebaseStorageController.download);

  router.get('/users', firebaseStorageController.getUsers);

  router.post('/delete', ValidationManager.validationHelper(ValidationManager.schemas().fileDownloadDeletion), firebaseStorageController.delete);
};
