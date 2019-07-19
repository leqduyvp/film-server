const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Rate = require('../database/rate.model');
const User = require('../database/users.model');


const filmId = (new mongoose.Types.ObjectId()).toString();
const ratedFilms = [];
ratedFilms.push(filmId);

const userRateInit = {
  _id: new mongoose.Types.ObjectId(),
  email: 'userrateinit@gmail.com',
  password: bcrypt.hashSync('userrateinit', 8),
  name: 'userrateinit',
  accType: 2,
  ratedFilms: [{ filmId }]
}

const rateFilm = {
  _id: new mongoose.Types.ObjectId(),
  filmId,
  ratingNumber: 5,
  rates: [{
    userId: userRateInit._id,
    rating: 5
  }]
}

const userRate = {
  _id: new mongoose.Types.ObjectId(),
  email: 'rateuser@gmail.com',
  password: bcrypt.hashSync('rateuser', 8),
  name: 'rateuser',
  accType: 2
}

const setupDatabase = async () => {
  await User.deleteMany({});
  await Rate.deleteMany({});
  await new User(userRate).save();
  await new User(userRateInit).save();
  await new Rate(rateFilm).save();
}

module.exports = {
  setupDatabase,
  rateFilm,
  userRate,
  userRateInit
}