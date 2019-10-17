const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: 'String',
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: 'String',
    required: true,
    trim: true,
  },
  token: {type: 'String'},
  isVerified: {type: Boolean, default: false},
});


module.exports = mongoose.model('User', userSchema);
