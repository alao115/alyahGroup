/* eslint-disable no-useless-catch */
/* eslint-disable prettier/prettier */

import clientFirebaseServices from './client';
import userFirebaseServices from './user';
import accountFirebaseServices from './account';

export default ({ firebaseAdmin }) => class FirebaseService {
  /* CRUD related to client entity */
  static client() {
    return clientFirebaseServices({ firebaseAdmin, FirebaseService });
  }
  /* End Client Section */

  /* CRUD related to user entitty */
  static user() {
    return userFirebaseServices({ firebaseAdmin, FirebaseService });
  }
  /* End user section */

  /* CRUD related to account entitty */
  static account() {
    return accountFirebaseServices({ firebaseAdmin, FirebaseService });
  }
  /* End account section */

  /* Helpers */
  static ObjectHelper(obj) {
    const keys = Object.keys(obj);
    const data = [];

    keys.forEach((key) => {
      data.push(obj[key]);
    });
    return data;
  }
  /* Helpers */
};
