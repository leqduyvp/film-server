const bcrypt = require('bcryptjs');
const User = require('./users.model');
const watchedFilms = require('./watchedFilms.model');
const client = require('./cache.connection');

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

const findUserByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) return {
    error: {
      isError: true,
      errorMessage: {
        credentials: 'User invalid'
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

const checkEmailExist = async (email) => {
  return User.findOne({ email });
}

const checkPhoneExist = (phone) => {
  return User.findOne({ phone });
}

const findUserByIdAndUpdate = async (id, updates) => {
  let user = JSON.parse(await findUserById(id));
  for (let key in updates) {
    user[key] = updates[key];
  }
  client.setex(id.toString() + '_user', 10, JSON.stringify(user));
  return User.findByIdAndUpdate(id, updates);
}

const deleteUser = async (_id) => {
  await watchedFilms.deleteOne({ userId: _id });
  return User.deleteOne({ _id });
}

module.exports = {
  findUserById,
  userSave,
  checkEmailExist,
  findUserByCredentials,
  findUserByIdAndUpdate,
  getAllUser,
  deleteUser,
  checkPhoneExist
}