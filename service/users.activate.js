const { findUserOtp, findUserByIdAndUpdate } = require('../database/users');

module.exports = async (req, res, next) => {
  try {
    const userOtp = await findUserOtp(req.query.userId);
    console.log(userOtp);
    if (userOtp != req.body.otp) {
      return res.status(400).send({
        error: {
          isError: true,
          errorMessage: {
            otp: 'Invalid otp'
          }
        }
      });
    }

    await findUserByIdAndUpdate(req.query.userId, { activated: true });
    res.status(200).send({
      error: {
        isError: false,
        errorMessage: {}
      }
    });
  } catch (err) {
    res.status(500).send({
      error: {
        isError: true,
        errorMessage: {
          cache: err.message
        }
      }
    });
  }
}