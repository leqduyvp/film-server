const User = require('../database/users.model');

module.exports = async (id) => {
  return User.findById(id);
}