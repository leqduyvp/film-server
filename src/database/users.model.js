const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    index: true,
    trim: true
  },
  phone: {
    type: String,
    unique: true,
    required: true,
    index: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  accType: {
    type: Number,
    required: true
  },
  activated: {
    type: Boolean,
    required: true
  },
  dateRegistered: {
    type: Date,
    default: Date.now(),
    required: true
  },
  ratedFilms: [{
    filmId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true
    }
  }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;