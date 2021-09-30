/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-catch */

import genericService from './serviceGenerator.service'

export default ({ Activity }) => class ActivityService extends genericService({ Model: Activity }) {
  static async getAll() {
    try {
      const activities = await Activity.find({}, { __v: false }).populate('createdBy', { password: false, __v: false, createdAt: false, updatedAt: false }).sort({ createdAt: 'desc' });
      return activities;
    } catch (error) { throw error; }
  }

/*   static async findByID({ id }) {
    try {
      const activity = await Activity.findById(id, { __v: false });
      return activity;
    } catch (error) { throw error; }
  }

  static async create(ActivityData) {
    try {
      const activity = new Activity({ ...ActivityData });
      await activity.save();
      return activity;
    } catch (error) { throw error; }
  }

  static async update({ id, data }) {
    try {
      const activity = await Activity.updateOne({ _id: id }, { ...data });
      return activity;
    } catch (error) { throw error; }
  }

  static async delete({ id }) {
    try {
      const activity = await ActivityService.findByID({ id });
      await activity.deleteOne();
    } catch (error) { throw error; }
  } */
};
