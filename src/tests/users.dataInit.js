const mongoose = require('mongoose');
const User = require('../database/users.model');

const validNormalUser = {
  _id: new mongoose.Types.ObjectId(),
  email: 'validUser@valid.com',
  name: 'validUser',
  password: 'validuser',
  accType: 2
}

const validAdminUser = {
  _id: new mongoose.Types.ObjectId(),
  email: 'validAdmin@valid.com',
  name: 'validAdmin',
  password: 'validamin',
  accType: 0
}

const setupDatabase = async () => {
  await User.deleteMany({});
  await new User(validNormalUser).save();
  await new User(validAdminUser).save();
}

module.exports = {
  setupDatabase,
  validAdminUser,
  validNormalUser
}