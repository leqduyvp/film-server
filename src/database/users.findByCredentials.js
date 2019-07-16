const User = require('./users.model');
const bcrypt = require('bcryptjs');

module.exports = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) return {
    error: {
      isError: true,
      errorMessage: {
        credentials: 'Wrong email or password'
      }
    }
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return {
    error: {
      isError: true,
      errorMessage: {
        credentials: 'Wrong email or password'
      }
    }
  }

  return user;
}