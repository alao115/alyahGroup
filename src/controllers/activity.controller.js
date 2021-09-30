/* eslint-disable no-underscore-dangle */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable prettier/prettier */

export default ({ activityService }) => class ActivityService {
  static async getAll(req, res, next) {
    try {
      const activities = await activityService.getAll();
      res.send({ success: 1, data: { activities } });
    } catch (error) { next(error); }
  }

  static async getOne(req, res, next) {
    try {
      const activity = await activityService.findByID({ id: req.params.activityID });
      res.send({ success: 1, data: { activity } });
    } catch (error) { next(error); }
  }

  /*   static async create(req, res, next) {
    try {
      const { authUser, validatedData: data } = req.payload;
      const activity = await activityService.create({ ...data, createdBy: authUser._id });
      res.send({ success: 1, data: { activity } });
    } catch (error) { next(error); }
  }

  static async update(req, res, next) {
    try {
      const data = req.body;
      const { activityID: id } = req.params;
      const activity = await activityService.update({ data, id });
      res.send({ success: 1, data: { activity } });
    } catch (error) { next(error); }
  } */

  static async delete(req, res, next) {
    try {
      const { activityID: id } = req.params;
      const activity = await activityService.delete({ id });
      res.send({ success: 1, data: { activity } });
    } catch (error) { next(error); }
  }
};
