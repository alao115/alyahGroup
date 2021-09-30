/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-catch */

import genericService from './serviceGenerator.service'

export default ({ User }) => class userService extends genericService({ Model: User }) {
  static async findAll() {
    try {
      const users = await User.find({}, { __v: false, password: false });
      return users;
    } catch (error) { throw error; }
  }

  static async findByID({ id }) {
    try {
      const user = await User.findById(id, { __v: false, password: false });
      return user;
    } catch (error) { throw error; }
  }

  static async findByUsername({ username }) {
    try {
      const user = await User.findOne({ username }, { __v: false });
      return user;
    } catch (error) { throw error; }
  }

  static async create(userData) {
    try {
      const password = await userService.encryptPassword({ password: userData.password });
      const user = new User({ ...userData, password });
      await user.save();
      return user;
    } catch (error) { throw error; }
  }

  static async update({ id, data }) {
    try {
      const isUserFound = await userService.findByID({ id });
      if(!isUserFound) throw new Error('Data to be updated not found')

      if(data.password) {
        const hashedPass = await userService.encryptPassword({ password: data.password })
        data.password = hashedPass
      }
      const user = await User.updateOne({ _id: id }, { ...data });
      return user;
    } catch (error) { throw error; }
  }

  static async encryptPassword({ password }) {
    try {
      const hashedPassword = await User.hashPassword(password);
      return hashedPassword;
    } catch (error) { throw error; }
  }
};
