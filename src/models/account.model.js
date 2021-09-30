/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { Schema, model, models } from 'mongoose';
import moment from 'moment';

export const accountSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    default() {
      return this._id;
    },
  },
  createdAt: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: models.users,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    // unique: true,
    default: '',
  },
  updatedAt: String,
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: models.users,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: models.users,
    required: true,
  },
}, { timestamps: { currentTime: () => moment().format('DD/MM/YYYY HH:mm:ss') } });

/* accountSchema.virtual('id').get(function () {
  return this._id
}) */

export default model('accounts', accountSchema);
