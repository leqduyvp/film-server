const User = require('./users.model');
const brcypt = require('bcryptjs');

const findUserById = async (id) => {
  return User.findById(id);
}

const userSave = async (user, regis) => {
  if (regis) {
    user.password = await brcypt.hash(user.password, 8);
    user.name = user.name.trim();
    user.name = user.name.toLowerCase();
  }
  return new User(user).save();
}

const checkEmailExist = async (email) => {
  return User.findOne({ email });
}

module.exports = {
  findUserById,
  userSave,
  checkEmailExist
}