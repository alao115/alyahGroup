/* eslint-disable object-curly-newline */
/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-catch */
import nodemailer from 'nodemailer';
import config from '../config';

// async..await is not allowed in global scope, must use a wrapper
export default class MailService {
  static async sendMail ({ from, to, content, subject, attachments }) {
    // Generate test SMTP service account from ethereal.email
    try {
      // Only needed if you don't have a real mail account for testing
      const testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      const transporter = await nodemailer.createTransport({
        host: config.email_host || 'smtp.ethereal.email', // testAccount
        port: config.email_port || 587, // testAccount
        secure: config.email_secure || false, // true for 465, false for other ports
        // service: 'gmail', for a real Gmail account
        auth: {
          user: config.email_user || testAccount.user, // generated ethereal user
          pass: config.email_pass || testAccount.pass, // generated ethereal password
        },
      });
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from, // sender address
        to, // list of receivers
        subject, // Subject line
        html: content, // html body
        attachments
      });

      // console.log('Message sent: %s', info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

      return { info: info.messageId, preview: nodemailer.getTestMessageUrl(info) };
    } catch (err) { throw err; }
  }
}
