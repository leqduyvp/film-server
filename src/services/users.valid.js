const validator = require('validator');
const jwt = require('jsonwebtoken');
const { findUserById, checkEmailExist } = require('../database/users');

const validEmail = async (user, error) => {
  const isNewEmail = !(await checkEmailExist(user.email));

  if (!user.email || !validator.isEmail(user.email)) {
    error.isError = true;
    error.errorMessage.email = 'Invalid email'
  }

  if (!isNewEmail) {
    error.isError = true;
    error.errorMessage.email = 'Email used'
  }
}

const validAccType = async (user, error) => {
  if (!user.accType || parseInt(user.accType) != parseFloat(user.accType) || user.accType < 0 || user.accType > 2) {
    error.isError = true;
    if (!user.accType) error.errorMessage.accType = "Account Type is missing";
    else error.errorMessage.accType = "Invalid Acount Type";
  }

  if (user.accType == 0) {
    try {
      const id = jwt.verify(user.token, secret);
      const userFound = await findUserById(id);
      if (!userFound) {
        error.isError = true;
        error.errorMessage.token = 'Invalid token';
      }
      if (userFound.accType != 0) {
        error.isError = true;
        error.errorMessage.accType = 'Cannot create admin account';
      }
    } catch (e) {
      error.isError = true;
      error.errorMessage.accType = e.message;
    }
  }
}

const valid = async (user, error) => {
  await validEmail(user, error);

  if (!user.name || user.name.length < 1 || user.name.length > 32) {
    error.isError = true;
    if (!user.name) error.errorMessage.name = 'Name missing';
    else if (user.name.length < 1) error.errorMessage.name = 'Name is too short';
    else if (user.name.length > 32) error.errorMessage.name = 'Name is too long';
  }

  if (!user.password || user.password.length < 8) {
    error.isError = true;
    if (!user.password) error.errorMessage.password = 'Password missing';
    else if (user.password.length < 8) error.errorMessage.password = 'Password too short';
  }

  await validAccType(user, error);
}

module.exports = async (req, res, next) => {
  try {
    const error = { isError: false, errorMessage: {} };
    if (req.header('access-token')) req.body.token = req.header('access-token');
    await valid(req.body, error);
    if (error.isError) {
      return res.status(400).send({ error });
    }
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      error: {
        isError: true,
        errorMessage: {
          server: 'Valid Error'
        }
      }
    });
  }
}

// Lay token o dau de tao acc Admin ?
