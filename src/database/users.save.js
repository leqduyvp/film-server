const User = require('../database/users.model');
const brcypt = require('bcryptjs');

module.exports = async (user) => {
  user.password = await brcypt.hash(user.password, 8);
  user.name = user.name.trim();
  user.name = user.name.toLowerCase();
  return new User(user).save();
}