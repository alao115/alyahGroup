/* eslint-disable no-useless-catch */
/* eslint-disable prettier/prettier */
export default ({ firebaseAdmin, FirebaseService }) => ({
  get: async () => {
    try {
      const accounts = await firebaseAdmin.database().ref('accounts').once('value');
      return FirebaseService.ObjectHelper(accounts.val());
    } catch (error) { throw error; }
  },

  create: async (data) => {
    try {
      const account = await firebaseAdmin.database().ref('accounts').push(data);
      return account.key;
    } catch (error) { throw error; }
  },

  update: async (data) => {
    try {
      const account = await firebaseAdmin.database().ref('accounts').child(data.accountID).update(data);
      return account;
    } catch (error) { throw error; }
  },

  delete: async (data) => {
    try {
      const account = await firebaseAdmin.database().ref('accounts').child(data.accountID).remove();
      return account;
    } catch (error) { throw error; }
  },
});
