/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */

import PubSub from 'pubsub-js';

import { activityService, accountService, AuthManager, mailService, JWTManager } from '../services';

const onActivityCreate = PubSub.subscribe('CREATE_ACTIVITY', async (msg, data) => {
  try {
    // console.log('--- Creating activities ---');
    const activity = await activityService.create(JSON.parse(data));
    // console.log(`'--- Activity ${activity._id} created ---'`);
  } catch (error) { console.log(error); }
});

const onSignup = PubSub.subscribe('ON_SIGNUP', async (msg, data) => {
  try {
    const user = JSON.parse(data)
    // console.log('--- Creating accounts ---');
    // const activity = await accountService.create(user);

    /* Send mail to user */
    await AuthManager.sendVerificationMail({ email: user.email })

    // console.log(`'--- Activity ${activity._id} created ---'`);
  } catch (error) { console.log(error); }
});
export default { PubSub };
