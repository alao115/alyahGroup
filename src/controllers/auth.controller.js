/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

export default ({ AuthManager, PubSub, accountService }) => class AuthController {
  static async signUp(req, res, next) {
    try {
      const signupData = req.payload.validatedData;

      /* const { message, userID } = await AuthManager.signUp(signupData); */
      const user = await AuthManager.signUp(signupData);

      const account = await accountService.create({ ...signupData, createdBy: user.id, userId: user.id });

      PubSub.publish('ON_SIGNUP', JSON.stringify({ ...signupData /* , createdBy: user.userID, userId: user.userID  */}))

      PubSub.publish('CREATE_ACTIVITY', JSON.stringify({ description: `${signupData.email} create an account`, title: 'Signup', elementType: 'User', createdBy: user.userID }));

      /* res.send({ success: 1, message}); */
      res.send({ success: 1, account });
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  static async signIn(req, res, next) {
    try {
      const { email, password } = req.payload.validatedData;

      const { token, userID } = await AuthManager.signIn({ email, password});

      PubSub.publish('CREATE_ACTIVITY', JSON.stringify({ description: `${email} logged in`, title: 'Signin', elementType: 'User', createdBy: userID }));

      res.send({ success: 1, data: { ...token } });
    } catch (err) { next(err); }
  }

  static async refreshToken(req, res, next) {
    try {
      const refresh_token = req.payload.validatedData['refresh-token'];

      const token = await AuthManager.refreshTokenService({ refreshToken: refresh_token });

      // PubSub.publish('CREATE_ACTIVITY', JSON.stringify({ description: `${email} logged in`, title: 'Signin', elementType: 'User' }));

      res.send({ success: 1, data: { ...token } });
    } catch (err) { next(err); }
  }

  static async resetPassword(req, res, next) {
    try {
      // console.log('Reset Password');
    } catch (error) { next(error); }
  }

  static async emailVerification(req, res, next) {
    try {
      const email_token = req.payload.validatedData['email-token'];

      const response = await AuthManager.emailTokenVerification({ emailToken: email_token });

      PubSub.publish('CREATE_ACTIVITY', JSON.stringify({ description: `${response.email} verification`, title: 'Email verification', elementType: 'User', createdBy: response._id }));

      res.send({ success: 1, data: { emailVerified: !!response.nModified } });
    } catch (err) { next(err); }
  }

  static sendVerificationMail({ isPassword } = { isPassword: false }) {
    return async (req, res, next) => {
      try {
        const { email } = req.payload.validatedData;

        await AuthManager.sendVerificationMail({ email, isPassword })

        res.send({ success: 1, message: 'Verification mail sent successfully' });

      } catch (error) {
        console.log(error)
        next(error)
      }
    }
  }

  static async passwordRecoveryTokenVerification(req, res, next) {
    try {
      const passwordRecoveryToken = req.payload.validatedData['password-recovery-token']
      const response = await AuthManager.passwordRecoveryTokenVerification({ passwordRecoveryToken })

      res.send({ success: 1, data: { id: response.id } })
    } catch (error) {
      console.log(error)
      next(error) }
  }
};
