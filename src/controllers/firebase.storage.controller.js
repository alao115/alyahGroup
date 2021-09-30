/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */

export default ({ firebaseStorageService, PubSub }) => class firebaseStorageController {
  static async upload(req, res, next) {
    try {
      const { filePath } = req.payload.validatedData;
      const { file } = req;
      const { authUser } = req.payload;
      // console.log(filePath, file);
      const fileInfo = await firebaseStorageService.upload({ filePath, file });
      PubSub.publish('CREATE_ACTIVITY', JSON.stringify({
        description: `${filePath} uploaded by ${authUser._id}`, title: 'File uploading', elementType: 'file', createdBy: authUser._id,
      }));
      res.send({ success: 1, data: { fileInfo } });
    } catch (error) { next(error); }
  }

  static async download(req, res, next) {
    try {
      const { filePath } = req.payload.validatedData;
      const { authUser } = req.payload;
      const file = await firebaseStorageService.download({ filePath });
      PubSub.publish('CREATE_ACTIVITY', JSON.stringify({
        description: `${filePath} downloaded by ${authUser._id}`, title: 'File downloading', elementType: 'file', createdBy: authUser._id,
      }));
      res.send({ success: 1, data: { file } });
    } catch (error) { next(error); }
  }

  static async delete(req, res, next) {
    try {
      const { filePath } = req.payload.validatedData;
      const { authUser } = req.payload;

      if (!filePath) throw new Error('File path is missing');

      const file = await firebaseStorageService.delete({ filePath });
      PubSub.publish('CREATE_ACTIVITY', JSON.stringify({
        description: `${filePath} deleted by ${authUser._id}`, title: 'File deletion', elementType: 'file', createdBy: authUser._id,
      }));
      res.send({ success: 1, data: { file } });
    } catch (error) { next(error); }
  }

  static async getUsers(req, res, next) {
    try {
      const users = await firebaseStorageService.getUserFromFirebase();
      res.send({ success: 1, data: { users } });
    } catch (error) { next(error); }
  }
};
