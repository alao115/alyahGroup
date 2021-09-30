/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import admin from 'firebase-admin';
// import serviceAccount from '../keys/ap16-sandbox-firebase-adminsdk-b24jj-f3692d64d4';
// import serviceAccount from '../keys/africadesignschoolnew-website-firebase-adminsdk-nhquf-f43c870f45';

/* const admin = require('firebase-admin'); */

admin.initializeApp({
  // credential: admin.credential.cert({serviceAccount}),
  databaseURL: 'https://ap16-sandbox-default-rtdb.firebaseio.com',
  storageBucket: 'gs://ap16-sandbox.appspot.com',
  /* databaseURL: 'https://africadesignschoolnew-website-default-rtdb.firebaseio.com/',
  storageBucket: 'gs://africadesignschoolnew-website.appspot.com', */
});

export default { admin };
