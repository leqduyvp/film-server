const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  accType: {
    type: Number,
    required: true
  },
  dateRegistered: {
    type: Date,
    default: Date.now(),
    required: true
  },
  watchedFilms: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  },
  ratedFilms: [{
    filmId: {
      type: mongoose.Schema.Types.ObjectId,
      require: false
    }
  }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;