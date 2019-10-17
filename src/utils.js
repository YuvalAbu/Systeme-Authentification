const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


module.exports = {
  generateToken: ([...ARG]) =>
    (token = jwt.sign({email: email, date: new Date().now}, 'toto')),
  sendMail: (req, email, token) => {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'atypik.house@gmail.com',
        pass: 'atypikhouse2018',
      },
    });
    let mailOptions = {
      // from: 'no-reply@tp_node.com',
      to: email,
      subject: 'Account Verification Token',
      text:
        'Hello,\n\n' +
        'Please verify your account by clicking the link: \nhttp://' +
        req.headers.host +
        '/user/confirm/' +
        token +
        '.\n',
    };
    transporter.sendMail(mailOptions, function(err) {
      if (err) {
        return res.status(500).send({msg: err.message});
      }
    });
  },
};
