/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-catch */

import genericService from './serviceGenerator.service';

export default ({ Account }) => class accountService extends genericService({ Model: Account }) {
  static async getAll() {
    try {
      const accounts = await Account.find({}, { __v: false })
        .populate('userId', {
          password: false, __v: false, createdAt: false, updatedAt: false,
        })
        .populate('curriculumId', { __v: false, createdAt: false, updatedAt: false });
      return accounts;
    } catch (error) { throw error; }
  }
};
