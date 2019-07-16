const findUserByCredentials = require('../database/users.findByCredentials');
const jwt = require('jsonwebtoken');
const secret = require('../config/jwtSecret');

module.exports = async (req, res, next) => {
  if (!req.body.email || !req.body.password) return res.status(400).send({
    error: {
      isError: true,
      errorMessage: {
        credentials: 'Email or password is missing'
      }
    }
  });

  try {
    const user = await findUserByCredentials(req.body.email, req.body.password);
    if (user.error) {
      return res.status(400).send({ error: user.error });
    }
    res.send({
      'access-token': jwt.sign({ id: user._id }, secret),
      error: {
        isError: false,
        errorMessage: {}
      }
    })
  } catch (e) {
    console.log(e.message);
    res.status(500).send({
      error: {
        isError: true,
        errorMessage: {
          server: e.message
        }
      }
    })
  }
}