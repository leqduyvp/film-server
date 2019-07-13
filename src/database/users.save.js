const User = require('../database/users.model');

module.exports = async (user) => {
  return new User(user).save();
}