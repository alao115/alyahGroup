/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable prettier/prettier */

export default ({ accountService, PubSub }) => class AccountController {
  static async getAll(req, res, next) {
    try {
      const { authUser, validatedData: data } = req.payload;
      const accounts = await accountService.getAll();
      res.send({ success: 1, data: { accounts } });
      PubSub.publish('CREATE_ACTIVITY', JSON.stringify({
        description: `Accounts list requested by ${authUser._id}`, title: 'account data requesting', elementType: 'Account', createdBy: authUser._id,
      }));
    } catch (error) { next(error); }
  }

  static async getOne(req, res, next) {
    try {
      const { authUser } = req.payload;
      const account = await accountService.findByID({ id: req.params.accountID });
      res.send({ success: 1, data: { account } });
      PubSub.publish('CREATE_ACTIVITY', JSON.stringify({
        description: `Account (${account._id}) requested by ${authUser._id}`, title: 'account data requesting', elementType: 'Account', elementId: account._id, createdBy: authUser._id,
      }));
    } catch (error) { next(error); }
  }

  static async create(req, res, next) {
    try {
      const { authUser, validatedData: data } = req.payload;
      const account = await accountService.create({ ...data, createdBy: authUser._id });
      PubSub.publish('CREATE_ACTIVITY', JSON.stringify({
        description: `Account (${account._id}) created by ${authUser._id}`, title: 'account creation', elementType: 'Account', elementId: account._id, createdBy: authUser._id,
      }));
      res.send({ success: 1, data: { account } });
    } catch (error) { next(error); }
  }

  static async update(req, res, next) {
    try {
      const { authUser } = req.payload;
      const data = req.body;
      const { accountID: id } = req.params;
      const account = await accountService.update({ data: { ...data, updatedBy: authUser._id }, id });
      res.send({ success: 1, data: { account } });
      PubSub.publish('CREATE_ACTIVITY', JSON.stringify({
        description: `Account (${account._id}) updated by ${authUser._id}`, title: 'account data updating', elementType: 'Account', elementId: account._id, createdBy: authUser._id,
      }));
    } catch (error) { next(error); }
  }

  static async delete(req, res, next) {
    try {
      const { authUser } = req.payload;
      const { accountID: id } = req.params;
      const account = await accountService.delete({ id });
      res.send({ success: 1, data: { account } });
      PubSub.publish('CREATE_ACTIVITY', JSON.stringify({
        description: `Account (${id}) deleted by ${authUser._id}`, title: 'account data deleting', elementType: 'Account', elementId: id, createdBy: authUser._id,
      }));
    } catch (error) { next(error); }
  }

  static async search(req, res, next) {
    try {
      const { authUser } = req.payload;
      const searchFied = req.body;
      const account = await accountService.findOne({ ...searchFied });
      res.send({ success: 1, data: { account } });
      PubSub.publish('CREATE_ACTIVITY', JSON.stringify({
        description: `Account (${account._id}) requested by ${authUser._id}`, title: 'account data requesting', elementType: 'Account', elementId: account._id, createdBy: authUser._id,
      }));
    } catch (error) { next(error); }
  }
};
