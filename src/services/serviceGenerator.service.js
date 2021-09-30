/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-catch */

export default ({ Model }) => class entityService {
  static async getAll() {
    try {
      const entities = await Model.find({}, { __v: false });
      return entities;
    } catch (error) { throw error; }
  }

  static async findByID({ id }) {
    try {
      const entity = await Model.findById(id, { __v: false });
      return entity;
    } catch (error) { throw error; }
  }

  static async findOne(condition) {
    try {
      const entity = await Model.findOne({ ...condition }, { __v: false });
      return entity;
    } catch (error) { throw error; }
  }

  static async findByEmail({ email }) {
    try {
      const entity = await Model.findOne({ email }, { __v: false });
      return entity;
    } catch (error) { throw error; }
  }

  static async create(entityData) {
    try {
      const entity = new Model({ ...entityData });
      await entity.save();
      return entity;
    } catch (error) { throw error; }
  }

  static async update({ id, data }) {
    try {
      const isEntityFound = await entityService.findByID({ id });
      if(!isEntityFound) throw new Error('Data to be updated not found')
      const entity = await Model.updateOne({ _id: id }, { ...data });
      return entity;
    } catch (error) { throw error; }
  }

  static async delete({ id }) {
    try {
      const entity = await entityService.findByID({ id });
      if (entity) await entity.deleteOne();
      else throw new Error('Data to be deleted not found')
    } catch (error) { throw error; }
  }
};
