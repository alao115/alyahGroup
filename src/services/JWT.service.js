/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import JWT from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import createError from 'http-errors';
import moment from 'moment';

export default ({ redisClientManager, userService }) => class JWTManager {
  static signToken(userID) {
    const privateKey = fs.readFileSync(path.join('keys', 'private.pem'), 'utf-8');

    const payload = {};

    const options = {
      audience: userID,
      expiresIn: '1d',
      algorithm: 'RS256',
    };

    return new Promise((resolve, reject) => {
      JWT.sign(payload, privateKey, options, (err, accessToken) => {
        if (err) {
          // console.log(err)
          reject(createError.InternalServerError());
        }

        resolve({ accessToken, expiresIn: moment().add(1, 'days').unix() });
      });
    });
  }

  static verifyAccessToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) return next(createError.Unauthorized());

    const token = authHeader.split(' ')[1];

    const publicKey = fs.readFileSync(path.join('keys', 'public.pem'), 'utf-8');

    JWT.verify(token, publicKey, async (err, payload) => {
      if (err) {
        const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.name;
        return next(createError.Unauthorized(message));
      }

      const isUserExist = await userService.findByID({ id: payload.aud });

      if (!isUserExist) next(createError.Unauthorized());

      req.payload = payload;
      req.payload.authUser = isUserExist;

      next();
    });
  }

  static signRefreshToken(userID) {
    const privateKey = fs.readFileSync(path.join('keys', 'private_refresh.pem'), 'utf-8');

    const payload = {};

    const options = {
      audience: userID,
      expiresIn: '1y',
      algorithm: 'RS256',
    };

    return new Promise((resolve, reject) => {
      JWT.sign(payload, privateKey, options, async (err, refreshToken) => {
        if (err) {
          reject(createError.InternalServerError());
        }

        try {
          const result = await redisClientManager.setKey(userID, refreshToken);
          resolve(result);
        } catch (err) {
          // console.log(err)
          reject(createError.InternalServerError(err.message));
        }
      });
    });
  }

  static async refreshTokenVerification({ refreshToken }) {
    const publicKey = fs.readFileSync(path.join('keys', 'public_refresh.pem'), 'utf-8');

    return new Promise((resolve, reject) => {
      JWT.verify(refreshToken, publicKey, async (err, payload) => {
        if (err) {
          // console.log(err);
          return reject(createError.Unauthorized());
        }

        try {
          const userID = payload.aud;
          const result = await redisClientManager.getKey(userID);

          if (result !== refreshToken) reject(createError.Unauthorized());

          const isUserExist = await userService.findByID({ id: payload.aud });

          if (!isUserExist) reject(createError.Unauthorized());

          resolve(userID);
        } catch (err) {
          // console.log(err);
          reject(createError.InternalServerError());
        }
      });
    });
  }

  static emailVerificationToken({ email }) {
    const privateKey = fs.readFileSync(path.join('keys', 'email_verification_private_key.pem'), 'utf-8');

    const payload = {};

    const options = {
      audience: email,
      expiresIn: '1d',
      algorithm: 'RS256',
    };

    return new Promise((resolve, reject) => {
      JWT.sign(payload, privateKey, options, (err, emailToken) => {
        if (err) {
          console.log(err)
          reject(createError.InternalServerError());
        }

        resolve({ emailToken });
      });
    });
  }

  static async verifyEmailVerificationToken({ emailVerificationToken }) {
    const publicKey = fs.readFileSync(path.join('keys', 'email_verification_public_key.pem'), 'utf-8');

    return new Promise((resolve, reject) => {
      JWT.verify(emailVerificationToken, publicKey, async (err, payload) => {
        if (err) {
          return reject(createError.Unauthorized());
        }

        try {
          const email = payload.aud;
          const isUserExist = await userService.findByEmail({ email });

          if (!isUserExist) reject(createError.Unauthorized());

          resolve(isUserExist);
        } catch (err) { reject(createError.InternalServerError()); }
      });
    });
  }

  static passwordRecoveryToken({ email }) {
    const privateKey = fs.readFileSync(path.join('keys', 'password_recovery_private_key.pem'), 'utf-8');

    const payload = {};

    const options = {
      audience: email,
      expiresIn: '1d',
      algorithm: 'RS256',
    };

    return new Promise((resolve, reject) => {
      JWT.sign(payload, privateKey, options, (err, emailToken) => {
        if (err) {
          console.log(err)
          reject(createError.InternalServerError());
        }

        resolve({ emailToken });
      });
    });
  }

  static async verifyPasswordRecoveryToken({ passwordRecoveryToken }) {
    const publicKey = fs.readFileSync(path.join('keys', 'password_recovery_public_key.pem'), 'utf-8');

    return new Promise((resolve, reject) => {
      JWT.verify(passwordRecoveryToken, publicKey, async (err, payload) => {
        if (err) {
          return reject(createError.Unauthorized());
        }

        try {
          const email = payload.aud;
          const isUserExist = await userService.findByEmail({ email });

          if (!isUserExist) reject(createError.Unauthorized());

          resolve(isUserExist);
        } catch (err) { reject(createError.InternalServerError()); }
      });
    });
  }
};
