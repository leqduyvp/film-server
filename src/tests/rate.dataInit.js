const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Rate = require('../database/rate.model');
const User = require('../database/users.model');



const rateFilm = {
  _id: new mongoose.Types.ObjectId(),
  filmId: (new mongoose.Types.ObjectId()).toHexString(),
  ratingNumber: 0,
  rates: []
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
  await new Rate(rateFilm).save();
}

module.exports = {
  setupDatabase,
  rateFilm,
  userRate
}