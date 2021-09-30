/* eslint-disable no-useless-catch */
/* eslint-disable prettier/prettier */
export default ({ firebaseAdmin, FirebaseService }) => ({
  get: async () => {
    try {
      const clients = await firebaseAdmin.database().ref('clients').once('value');
      return FirebaseService.ObjectHelper(clients.val());
    } catch (error) { throw error; }
  },

  create: async (data) => {
    try {
      const client = await firebaseAdmin.database().ref('clients').push(data);
      return client.key;
    } catch (error) { throw error; }
  },

  update: async (data) => {
    try {
      const client = await firebaseAdmin.database().ref('clients').child(data.clientID).update(data);
      return client;
    } catch (error) { throw error; }
  },

  delete: async (data) => {
    try {
      const client = await firebaseAdmin.database().ref('clients').child(data.clientID).remove();
      return client;
    } catch (error) { throw error; }
  },
});
