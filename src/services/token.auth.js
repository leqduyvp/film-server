const jwt = require('jsonwebtoken');
const findUserById = require('../database/users.findById');
const secret = require('../config/jwtSecret');

module.exports = async (req, res, next) => {
  try {
    const token = req.header('access-token');
    const id = jwt.verify(token, secret).id;
    const user = await findUserById(id);

    if (!user) {
      return res.status(400).send({
        error: {
          isError: true,
          errorMessage: {
            authenticate: 'Please authenticate'
          }
        }
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).send({
      error: {
        isError: true,
        errorMessage: {
          server: error.message
        }
      }
    });
  }
}