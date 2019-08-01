const bcrypt = require('bcryptjs');
const User = require('./users.model');
const watchedFilms = require('./watchedFilms.model');
const { client } = require('../service/redis.connection');

const userSave = async (user) => {
  if (!user._id) {
    user.password = await bcrypt.hash(user.password, 8);
    user.name = user.name.trim();
    user.name = user.name.toLowerCase();
  }
  return new User(user).save();
}

const getAllUser = async () => {
  const users = await User.find({}, { name: 1, email: 1 });
  return users;
}

const findUserById = async (id) => {
  try {
    let user = await client.getAsync(id.toString() + '_user');
    if (!user) {
      user = await User.findById(id);
      if (!user) return {
        error: {
          isError: true,
          errorMessage: {
            database: 'User invalid'
          }
        }
      }
      user = JSON.stringify(user);
      client.setex(id.toString() + '_user', 10, user);
    }
    return user;
  } catch (err) {
    return {
      error: {
        isError: true,
        errorMessage: {
          database: err.message
        }
      }
    }
  }
}

const findUserByCredentials = async (credentials, loginUsername) => {
  let queryObj = {};
  queryObj[loginUsername] = credentials[loginUsername];
  const user = await User.findOne(queryObj);
  if (!user) return {
    error: {
      isError: true,
      errorMessage: {
        credentials: 'User invalid'
      }
    }
  }

  const isMatch = await bcrypt.compare(credentials.password, user.password);
  if (!isMatch) return {
    error: {
      isError: true,
      errorMessage: {
        credentials: 'Wrong credentials'
      }
    }
  }

  return user;
}

const checkEmailExist = async (email) => {
  return User.findOne({ email });
}

const checkPhoneExist = (phone) => {
  return User.findOne({ phone });
}

const findUserByIdAndUpdate = async (id, updates) => {
  const user = await User.findById(id);
  if (updates.password) updates.password = await bcrypt.hash(updates.password, 8);
  for (let key in updates) {
    user[key] = updates[key];
  }
  client.setex(id.toString() + '_user', 10, JSON.stringify(user));
  return user.save();
}

const deleteUser = async (_id) => {
  await watchedFilms.deleteOne({ userId: _id });
  return User.deleteOne({ _id });
}

const userOtpSave = (userId, otp) => {
  client.setex(userId.toString() + '_otp', 300, otp);
}

const findUserOtp = async (userId) => {
  return await client.getAsync(userId.toString() + '_otp');
}

module.exports = {
  findUserById,
  userSave,
  checkEmailExist,
  findUserByCredentials,
  findUserByIdAndUpdate,
  getAllUser,
  deleteUser,
  checkPhoneExist,
  userOtpSave,
  findUserOtp
}