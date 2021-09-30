/* eslint-disable no-unused-vars */
/* eslint-disable no-async-promise-executor */
/* eslint-disable no-useless-catch */
import redisClient from '../loaders/redis';

async function redis() {
  try {
    const client = await redisClient();
    return client;
  } catch (error) {
    throw error;
  }
}

export default class redisClientManager {
  static setKey(key, value) {
    return new Promise(async (resolve, reject) => {
      try {
        const client = await redis();
        client.set(key, value, (err, result) => {
          if (err) reject(err);
          resolve(value);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  static getKey(key) {
    return new Promise(async (resolve, reject) => {
      try {
        const client = await redis();
        client.get(key, (err, value) => {
          if (err) reject(err);
          resolve(value);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
