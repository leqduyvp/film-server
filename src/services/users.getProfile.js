const { findUserById } = require('../database/users');

module.exports = async (req, res, next) => {
  try {
    const user = await findUserById(req.userId);
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject._id;
    delete userObject.__v;
    res.send({
      user: userObject,
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
          server: err.mesage
        }
      }
    });
  }
}