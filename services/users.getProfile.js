const { findUserById } = require('../database/users');

module.exports = async (req, res, next) => {
  try {
    const user = await findUserById(req.userId);
    if (user.error) return res.status(400).send(user);
    const userObject = JSON.parse(user);
    delete userObject.password;
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