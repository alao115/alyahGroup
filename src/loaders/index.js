/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { success, error, info } from 'consola';
import expressLoader from './express';
import dbLoader from './db';

export default ({ app }) => {
  // dbLoader()
  //   .then(() => {
  //     success('Loading database loader successfully');
  //   })
  //   .catch((err) => {
  //     error(err);
  //     process.exit();
  //   });

  expressLoader({ app }).then(() => success('Loading express loader successfully'));
};
