/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcrypt';
import moment from 'moment';

export const userSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    default: function () {
      return this._id
    }
  },
  createdAt: String,
  updatedAt: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  firstConnexion: {
    type: Boolean,
    default: true
  }
}, { timestamps: { currentTime: () => moment().format('DD/MM/YYYY HH:mm:ss') }, });

userSchema.methods.isPasswordMatched = async function (password) {
  const matched = await bcrypt.compare(password, this.password);
  return matched;
};

userSchema.statics.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export default model('users', userSchema);
