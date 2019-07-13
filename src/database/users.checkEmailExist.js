const User = require('./users.model');

module.exports = async (email) => {
  return User.findOne({ email });
}