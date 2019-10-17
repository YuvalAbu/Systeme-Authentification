const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const passport = require('passport');
const User = require('../models/usersSchema');
const {generateToken, sendMail} = require('../utils');
const connUri = process.env.MONGO_URL;

module.exports = {
  signup: (req, res) => {
    const {email, password} = req.body;
    const token = jwt.sign({email: email, date: new Date().now}, 'toto');
    const newUser = new User({email, password, token});

    mongoose.connect(connUri, {useNewUrlParser: true}, err => {
      User.findOne({email}, (err, user) => {
        if (err) {
          res.status(500).send(err);
        }
        if (user) {
          // console.log(user);
          res.status(500).send(`L'email : "${email}" est déjà utilisé`);
          // res.render('/signup', {msg: 'toto'});
        }
        // Enregistrement de l'utilisateur
        newUser.save((err, user) => {
          if (err) {
            // Redirection vers la page 500
            // console.log(err);
            res.status(500).send('erreur post/user');
          }
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
            } else {
              res.render('signin', {msg: 'toto'});
            }
          });
        });
      });
    });
  },
  confirmedAccount: (req, res) => {
    const {token} = req.params;
    User.findOneAndUpdate({token: token}, {isVerified: true}, (err, user) => {
      if (err) {
        return res.status(500).send({msg: err});
      }
      return res.render('signin', {msg: 'toto'});
    });
  },

  getUser: (req, res) => {
    // console.log(req);
    const {_id} = req.params;
    User.findById(_id, (err, user) => {
      if (err) return res.status(500).send('err');
      res.send(user);
    }).select('_id username modifiedAt');
  },
  putUser: (req, res) => {
    User.findByIdAndUpdate(_id, {email, password}, (err, user) => {
      if (err) {
        // console.log('ERREUR: ', err)
        if (err.name === 'CastError')
          return res.status(404).send(`L’utilisateur ${_id} n’existe pas`);
        return res.status(500).send('err findByIdAndUpdate: ', err);
      }
      res.send(user);
    }).select('_id username modifiedAt');
  },
  deleteUser: (req, res) => {
    const {_id} = req.params;
    User.findByIdAndDelete(_id, (err, user) => {
      if (err) return res.status(500).send('findByIdeAndUpdate err:', err);
      if (!user)
        return res.status(404).send(`L’utilisateur ${_id} n’existe pas`);
      res.send(`L’utilisateur ${user._id} a été supprimé`);
    });
  },
  logout: (req, res) => {
    req.logout();
    res.redirect('/signin');
  },
  resendConfirmedMail: (req, res) => {
    const {email} = req.body;
    const token = jwt.sign({email: email, date: new Date().now}, 'toto');
    sendMail(email, token);
    res.redirect();
  },
};
