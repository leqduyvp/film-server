const bcrypt = require('bcryptjs');
const { findUserByIdAndUpdate } = require('../database/users');
const allowedUpdates = require('../config/allowedUpdates');
const bodyValidator = require('./body.valid');

const validUpdates = (updates, error) => {
  const updatesKeys = [];
  for (let key in updates) {
    updatesKeys.push(key);
  }

  const isSafe = !updatesKeys.some((update) => (allowedUpdates.indexOf(update) == -1));
  if (!isSafe) {
    error.isError = true;
    error.errorMessage.updates = 'Some update is not allowed';
  }
  else {
    updatesKeys.forEach((updateField) => {
      bodyValidator[updateField + 'Validator'](updates, error);
    });
  }
}

module.exports = async (req, res, next) => {
  const updates = req.body;
  const error = {
    isError: false,
    errorMessage: {}
  }
  await validUpdates(updates, error);
  if (error.isError) {
    return res.status(400).send(error);
  }
  try {
    if (updates.password) updates.password = await bcrypt.hash(updates.password, 8);
    await findUserByIdAndUpdate(req.userId, updates);
    res.send({
      error: {
        isError: false,
        errorMessage: {}
      }
    });
  } catch (err) {
    res.status(500).send({
      error: {
        isError: true,
        errorMessage: err.message
      }
    });
  }
}