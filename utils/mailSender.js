const nodemailer = require('nodemailer');
const AppError = require('./appError');

const mailSender = async (req) => {
  const auth = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'd7ca8b1f24a2b9',
      pass: '9fa7dd2c35d42e',
    },
  });

  const receiver = {
    from: 'youremail@gmail.com',
    to: req.body.email,
    subject: 'Account created successfully !!',
    text: 'Welcome to the family ',
  };

  try {
    await auth.sendMail(receiver);
    console.log('Mail sent successfully!');
  } catch (error) {
    throw new AppError('Failed to send mail !!', 401);
  }
};

module.exports = mailSender;
