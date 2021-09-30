/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
/* eslint-disable prettier/prettier */

export default ({ firebaseAdmin, FirebaseService }) => ({
  getUsers: async ({ nextPage, maxResult = 1000 }) => {
    try {
      const users = await firebaseAdmin.auth().auth().listUsers(maxResult, nextPage);
      return users;
    } catch (error) { throw error; }
  },

  getOne: async ({ by, data }) => {
    try {
      let user = null;
      switch (by) {
        case 'email':
          user = await firebaseAdmin.auth().getUserByEmail(data);
          break;
        case 'uid':
          user = await firebaseAdmin.auth().getUser(data);
          break;
        case 'phone':
          user = await firebaseAdmin.auth().getUserByPhoneNumber(data);
          break;
        default:
          throw new Error(`${by} must be 'email', 'uid' or 'phone'`);
      }
      return user.toJSON();
    } catch (error) { throw error; }
  },

  create: async (data) => {
    try {
      const user = await firebaseAdmin.auth().createUser({ ...data });
      return user.uid;
    } catch (error) { throw error; }
  },

  update: async ({ uid, data }) => {
    try {
      const user = await firebaseAdmin.auth().updateUser(uid, { ...data });
      return user.toJSON();
    } catch (error) { throw error; }
  },

  delete: async (uid) => {
    try {
      const user = await firebaseAdmin.auth().deleteUser(uid);
      return user;
    } catch (error) { throw error; }
  },
});
