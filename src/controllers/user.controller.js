/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */

export default ({ userService, PubSub }) => class UserController {
  static async create(req, res, next) {
    try {
      const { authUser, validatedData: data } = req.payload;
      const user = await userService.create({ ...data, createdBy: authUser._id });
      res.send({ success: 1, data: { user } });
      PubSub.publish('CREATE_ACTIVITY', JSON.stringify({
        description: `User (${user._id}) created by ${authUser._id}`, title: 'user creation', elementType: 'User', elementId: user._id,
      }));
    } catch (error) { next(error); }
  }

  static async getOne(req, res, next) {
    try {
      const { authUser } = req.payload;
      const user = await userService.findByID({ id: req.params.userID });
      res.send({ success: 1, data: { user } });
      PubSub.publish('CREATE_ACTIVITY', JSON.stringify({
        description: `User (${user._id}) requested by ${authUser._id}`, title: 'user data requesting', elementType: 'User', elementId: user._id,
      }));
    } catch (error) { next(error); }
  }

  static async getAuthUser(req, res, next) {
    try {
      const { authUser } = req.payload;
      const user = await userService.findByID({ id: req.payload.aud });
      res.send({ success: 1, data: { user } });
      PubSub.publish('CREATE_ACTIVITY', JSON.stringify({
        description: `User (${user._id}) requested by ${authUser._id}`, title: 'user data requesting', elementType: 'User', elementId: user._id, createdBy: authUser._id,
      }));
    } catch (error) { next(error); }
  }

  static async getAll(req, res, next) {
    try {
      const { authUser } = req.payload;
      const users = await userService.findAll();
      res.send({ success: 1, data: { users } });
      PubSub.publish('CREATE_ACTIVITY', JSON.stringify({
        description: `Users list requested by ${authUser._id}`, title: 'user data requesting', elementType: 'User', createdBy: authUser._id,
      }));
    } catch (error) { next(error); }
  }

  static async update(req, res, next) {
    try {
      let authUser = null

      if(req.payload) authUser = req.payload.authUser;

      const { userID: id } = req.params;
      const data = req.body;
      const user = await userService.update({ id, data });
      res.send({ success: 1, data: { user } });

      if(authUser) {
        PubSub.publish('CREATE_ACTIVITY', JSON.stringify({
          description: `User (${user._id}) updated by ${authUser._id}`, title: 'user data updating', elementType: 'User', elementId: user._id, createdBy: authUser._id,
        }));
      }
    } catch (error) { next(error); }
  }

  static async delete(req, res, next) {
    try {
      const { authUser } = req.payload;
      const { userID: id } = req.params;
      await userService.delete({ id });
      res.send({ success: 1, data: {} });
      PubSub.publish('CREATE_ACTIVITY', JSON.stringify({
        description: `User (${id}) deleted by ${authUser._id}`, title: 'user data deleting', elementType: 'User', elementId: id, createdBy: authUser._id,
      }));
    } catch (error) { next(error); }
  }
};
