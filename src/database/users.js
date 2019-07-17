const User = require('./users.model');
const brcypt = require('bcryptjs');

const findUserById = async (id) => {
  return User.findById(id);
}

const userSave = async (user) => {
  if (!user._id) {
    user.password = await brcypt.hash(user.password, 8);
    user.name = user.name.trim();
    user.name = user.name.toLowerCase();
  }
  return new User(user).save();
}

module.exports = {
  findUserById,
  userSave
}