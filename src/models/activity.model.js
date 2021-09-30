/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { Schema, model, models } from 'mongoose';
import moment from 'moment';

import { userSchema } from './user.model';

export const activitySchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    default: function () {
      return this._id
    }
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: models.users,
  },
  createdAt: String,
  description: {
    type: String,
    default: '-',
  },
  elementId: {
    type: String,
    default: '-',
  },
  elementType: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
}, { timestamps: { currentTime: () => moment().format('DD/MM/YYYY HH:mm:ss') }, });

model('User', userSchema);
export default model('activities', activitySchema);
