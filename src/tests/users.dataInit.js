const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../database/users.model');
const WatchedFilms = require('../database/watchedFilms.model');

const validNormalUser = {
  _id: new mongoose.Types.ObjectId(),
  email: 'validUser@valid.com',
  name: 'validUser',
  password: bcrypt.hashSync('validuser', 8),
  accType: 2
}

const normalUserFilms = {
  _id: new mongoose.Types.ObjectId(),
  userId: validNormalUser._id,
  films: [{
    id: new mongoose.Types.ObjectId(),
    title: 'Shazam(2019)',
    episodeNumber: 1,
    episodeNumberCurrent: 1,
    thumb: 'asdf'
  }]
}

const validAdminUser = {
  _id: new mongoose.Types.ObjectId(),
  email: 'validAdmin@valid.com',
  name: 'validAdmin',
  password: bcrypt.hashSync('validamin', 8),
  accType: 0
}

const adminUserFilms = {
  _id: new mongoose.Types.ObjectId(),
  userId: validAdminUser._id,
  films: []
}

const setupDatabase = async () => {
  await User.deleteMany({});
  await WatchedFilms.deleteMany({});
  await new User(validNormalUser).save();
  await new WatchedFilms(normalUserFilms).save();
  await new User(validAdminUser).save();
  await new WatchedFilms(adminUserFilms).save();
}

module.exports = {
  setupDatabase,
  validAdminUser,
  validNormalUser,
  adminUserFilms,
  normalUserFilms
}