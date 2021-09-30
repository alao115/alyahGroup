/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
/* eslint-disable prettier/prettier */

// eslint-disable-next-line no-unused-vars
export default ({ mailService, PubSub }) => class mailController {
  static async sendMail(req, res, next) {
    try {
      // const { authUser } = req.payload;
      const attachmenFiles = req.files && req.files.attachments;

      const attachments = attachmenFiles && attachmenFiles.map((file) => ({ ...file, content: file.buffer, filename: file.originalname }));

      const response = await mailService.sendMail({ ...req.body, to: req.body.to, attachments });

      res.send({ success: 1, data: { response } });

      // PubSub.publish(
      //   'CREATE_ACTIVITY',
      //   JSON.stringify({
      //     description: 'Send email message',
      //     title: 'Mailing',
      //     elementType: 'Mail',
      //     createdBy: authUser._id,
      //   }),
      // );
    } catch (err) { next(err); }
  }
};
