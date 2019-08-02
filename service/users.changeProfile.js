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
  const updates = { ...req.body };
  updates.password = updates.newPassword;
  delete updates.oldPassword;
  delete updates.newPassword;
  const error = {
    isError: false,
    errorMessage: {}
  }
  await validUpdates(updates, error);
  if (error.isError) {
    return res.status(400).send({ error });
  }
  try {
    updates.oldPassword = req.body.oldPassword;
    const updateRes = await findUserByIdAndUpdate(req.userId, updates);
    if (updateRes.error) return res.status(401).send(updateRes);
    res.send({
      error: {
        isError: false,
        errorMessage: {}
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      error: {
        isError: true,
        errorMessage: err.message
      }
    });
  }
}