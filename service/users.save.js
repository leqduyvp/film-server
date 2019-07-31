const phone = require('phone');
const { userSave, findUserByIdAndUpdate } = require('../database/users');
const { watchedFilmsSave } = require('../database/watchedFilms');
const otpGenerate = require('./otp.generate');

module.exports = async (req, res) => {
  try {
    req.body.phone = phone(req.body.phone, 'VNM')[0];
    req.body.activated = false;
    let user = {};

    if (req.edit) user = await findUserByIdAndUpdate(req.edit, req.body);
    else {
      user = await userSave(req.body);

      await watchedFilmsSave({
        userId: user._id,
        films: []
      });
    }

    await otpGenerate(user._id);
    res.status(201).send({
      userId: user._id,
      error: {
        isError: false,
        errorMessage: {}
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      error: {
        isError: true,
        errorMessage: {
          server: 'Save Error'
        }
      }
    });
  }
}