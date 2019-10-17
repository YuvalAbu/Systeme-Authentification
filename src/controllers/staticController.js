const jwt = require('jsonwebtoken');
const User = require('../models/usersSchema');

module.exports = {
  index: (req, res) => res.render('index', {cookie: req.session.passport}),
  signin: (req, res) => res.render('signin'),
  signup: (req, res) => res.render('signup'),
};
