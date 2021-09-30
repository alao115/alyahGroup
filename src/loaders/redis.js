/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { createClient } from 'redis';
import { success, error, info } from 'consola';
import config from '../config';

export default () => new Promise((resolve, reject) => {
  const client = createClient(config.redisUri, { db: config.redisDB, password: config.redisPass });
  // const client = createClient(config.redisUri, { db: config.redisDB });

  client.on('connect', () => {
    success('Redis client is connected to the redis server');
  });

  client.on('ready', () => {
    success('Redis client is ready to be used');
    resolve(client);
  });

  client.on('error', (err) => {
    reject(err);
  });

  process.on('SIGINT', () => {
    client.quit();
  });
});
