/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-catch */

import createError from 'http-errors';
import config from '../config';

export default ({
  JWTManager, userService, mailService, accountService,
}) => class AuthManager {
  static async signUp(data) {
    try {
      // Check if user already existed
      const { email, password } = data;
      const isUserExisted = await userService.findByEmail({ email });

      if (isUserExisted) throw createError.Conflict('Email already existed');

      // Hash user password
      // const hashedPassword = await userService.encryptPassword({ password });
      // To be done in user service

      // Create the user and save it in the db
      const user = await userService.create({
        ...data, /* ,
        password: hashedPassword, */
      });

      // Generate accessToken and refreshToken
      /* const accessToken = await JWTManager.signToken(String(user._id));
      const refreshToken = await JWTManager.signRefreshToken(String(user._id)); */

      /* return ({ message: 'Account createad successfully', userID: user._id }); */
      return user;
    } catch (err) {
      // console.log(err)
      throw err;
    }
  }

  static async signIn({ email, password }) {
    try {
      // Check if user exist in our mongodb using email or username
      const user = await userService.findByEmail({ email });

      // If user found proccess else throw an error
      if (!user) throw createError.NotFound('User not found');

      // Check if the provided password match the user found one
      const isPasswordMatched = await user.isPasswordMatched(password);
      if (!isPasswordMatched) throw createError.Unauthorized('Invalid credentials');

      // Generate accessToken and refreshToken
      const accessToken = await JWTManager.signToken(String(user._id));
      const refreshToken = await JWTManager.signRefreshToken(String(user._id));

      return ({ token: { ...accessToken, refreshToken }, userID: user._id });
    } catch (err) {
      throw err;
    }
  }

  static async refreshTokenService({ refreshToken }) {
    try {
      // Verify the refreshToken
      const data = await JWTManager.refreshTokenVerification({ refreshToken });

      // Generate new pair of access-refresh token
      const accessToken = await JWTManager.signToken(data);
      const refreshtoken = await JWTManager.signRefreshToken(data);

      return ({ ...accessToken, refreshToken: refreshtoken });
    } catch (err) {
      throw err;
    }
  }

  static async resetPassword({ email }) {
    try {
      const user = await userService.findByEmail({ email });

      if (!user) throw createError.NotFound('User not found');

      // Generate new password or set new password manually
    } catch (error) {
      throw error;
    }
  }

  static async emailTokenVerification({ emailToken }) {
    try {
      const user = await JWTManager.verifyEmailVerificationToken({ emailVerificationToken: emailToken });
      const response = await userService.update({ id: user._id, data: { emailVerified: true } });

      return { ...user, ...response };
    } catch (error) {
      throw error;
    }
  }

  static async passwordRecoveryTokenVerification({ emailToken }) {
    try {
      const user = await JWTManager.verifyPasswordRecoveryToken({ emailVerificationToken: emailToken });

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async sendVerificationMail({ email, isPassword }) {
    try {
      /* Check if user exist */
      const user = await userService.findByEmail({ email });

      if (!user) throw createError.NotpasswordRecoveryTokenVerificationFound('No such user found in our records');

      /* Fetch user account data */
      const userAccount = await accountService.findOne({ userId: user.id });

      /* Generate token to be sent with the mail */
      const { emailToken } = isPassword ? await JWTManager.passwordRecoveryToken({ email }) : await JWTManager.emailVerificationToken({ email });

      const verificationUrl = `${config.frontend_url}/${!isPassword ? 'email-verified' : 'new-password'}/?token=${emailToken}${!isPassword ? `&email=${email}` : ''}`;
      const from = 'noreply@africadesignschool';
      const subject = isPassword ? 'Réinitialisation mot de passe.' : 'Vérification d\'adresse email';
      const content = `
        <div style=" display: flex; flex-direction: column; overflow-wrap: break-word; padding-bottom: 28px; width: 100%;">
          <span _ngcontent-vhn-c70="" class="preview-label">Message</span><div _ngcontent-vhn-c70=""><p>Bonjour ${userAccount.firstname} ${userAccount.name},</p>
          <p>Cliquez sur ce lien pour ${isPassword ? 'réinitialiser votre mot de passe.' : 'valider votre adresse e-mail.'}</p>
          <p><a href="${verificationUrl}">${verificationUrl}</a></p>
          <p>Si vous n'avez pas demandé à valider cette adresse, vous pouvez ignorer cet e-mail.</p>
          <p>Merci,</p>
          <p>Votre équipe ${config.appName}</p></div>
        </div>`;

      const response = await mailService.sendMail({
        from, to: user.email, content, subject,
      });
      console.log('Response: ', response);

      return { ...user, ...userAccount };
    } catch (error) {
      throw error;
    }
  }

  // eslint-disable-next-line no-dupe-class-members
  static async passwordRecoveryTokenVerification({ passwordRecoveryToken }) {
    try {
      const response = await JWTManager.verifyPasswordRecoveryToken({ passwordRecoveryToken });
      return response;
    } catch (error) { throw error; }
  }
};
