const validator = require('validator');
const phone = require('phone');
const jwt = require('jsonwebtoken');
const { findUserById, checkEmailExist, checkPhoneExist } = require('../database/users');
const secret = require('../config/jwtSecret');

const emailValidator = async (body, error) => {

  const emailUsed = await checkEmailExist(body.email);

  if (!body.email || !validator.isEmail(body.email)) {
    error.isError = true;
    error.errorMessage.email = 'Invalid email'
  }
  body.email = body.email.trim();
  if (emailUsed) {
    error.isError = true;
    error.errorMessage.email = 'Email used';
    if (emailUsed.activated) return;
    for (let key in body) {
      if (body[key] != emailUsed[key]) {
        error.edit = emailUsed._id;
        return;
      }
    }
  }
}

const accTypeValidator = async (body, error) => {

  if (typeof body.accType === 'undefined') {
    error.isError = true;
    error.errorMessage.accType = 'Account Type is missing';
  }

  if (parseInt(body.accType) * 10 != body.accType * 10 || body.accType < 0 || body.accType > 2) {
    error.isError = true;
    error.errorMessage.accType = "Invalid Account Type";
  }

  if (body.accType === 0) {
    try {
      const id = jwt.verify(body.token, secret).id;
      const userFound = JSON.parse(await findUserById(id));
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

const nameValidator = (body, error) => {
  body.name = body.name.trim();
  if (!body.name || body.name.length < 1 || body.name.length > 32) {
    error.isError = true;
    if (!body.name) error.errorMessage.name = 'Name is missing';
    else if (body.name.length < 1) error.errorMessage.name = 'Name is too short';
    else if (body.name.length > 32) error.errorMessage.name = 'Name is too long';
  }
}

const passwordValidator = (body, error) => {
  if (!body.password || body.password.length < 8) {
    error.isError = true;
    if (!body.password) error.errorMessage.password = 'Password is missing';
    else if (body.password.length < 8) error.errorMessage.password = 'Password is too short';
  }
}

const phoneValidator = async (body, error) => {
  if (!body.phone) {
    error.isError = true;
    error.errorMessage.phone = 'Invalid phone number';
  }

  const valid = phone(body.phone, 'VNM');
  if (!valid.length) {
    error.isError = true;
    error.errorMessage.phone = 'Invalid phone number';
  }

  const phoneUsed = await checkPhoneExist(valid[0]);
  if (phoneUsed) {
    error.isError = true;
    error.errorMessage.phone = 'Phone number used';
    if (phoneUsed.activated) return;
    for (let key in body) {
      if (body[key] != phoneUsed[key]) {
        error.edit = phoneUsed._id;
        return;
      }
    }
  }
}

module.exports = {
  emailValidator,
  passwordValidator,
  accTypeValidator,
  nameValidator,
  phoneValidator
}