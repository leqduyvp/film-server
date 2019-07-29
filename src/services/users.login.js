const phone = require('phone');
const { findUserByCredentials } = require('../database/users');
const generateToken = require('../services/token.generate');

const validCredentials = (req) => {
  if ((!req.body.email && !req.body.phone) || !req.body.password)
    return {
      error: {
        isError: true,
        errorMessage: {
          credentials: 'Username or password is missing'
        }
      }
    };
}

module.exports = async (req, res, next) => {
  const invalid = validCredentials(req);
  if (invalid) {
    return res.status(400).send(invalid);
  }
  try {
    let loginUsername = '';
    if (!req.body.email) loginUsername = 'phone';
    else loginUsername = 'email';

    req.body.phone = phone(req.body.phone, 'VNM');
    const user = await findUserByCredentials(req.body, loginUsername);
    if (user.error) {
      return res.status(400).send({ error: user.error });
    }
    if (!user.activated) {
      return res.status(400).send({
        error: {
          isError: true, errorMessage: {
            activation: 'User has not activated'
          }
        },
        userId: user._id.toString()
      });
    }
    const platform = req.get('platform');
    generateToken(user._id, user.accType, platform, res);
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