/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';
import config from '../config';

const { connect } = mongoose;

export default () => new Promise((resolve, reject) => {
  connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((connection) => resolve(connection))
    .catch((err) => reject(err));
});
