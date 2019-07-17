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

const checkEmailExist = async (email) => {
  return User.findOne({ email });
}

const findUserByCredentials = async (email, password) => {
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

module.exports = {
  findUserById,
  userSave,
  checkEmailExist
}