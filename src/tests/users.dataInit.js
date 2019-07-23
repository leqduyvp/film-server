const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const phone = require('phone');
const User = require('../database/users.model');
const WatchedFilms = require('../database/watchedFilms.model');

const validNormalUser = {
  _id: new mongoose.Types.ObjectId(),
  email: 'validUser@valid.com',
  name: 'validUser',
  password: bcrypt.hashSync('validuser', 8),
  phone: phone('0912345678', 'VNM')[0],
  accType: 2,
  activated: true
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
  phone: phone('0934567890','VNM')[0],
  password: bcrypt.hashSync('validamin', 8),
  accType: 0,
  activated: true
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