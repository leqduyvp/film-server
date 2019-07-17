const jwt = require('jsonwebtoken');
const redis = require('redis');
const secret = require('../config/jwtSecret');

const client = redis.createClient();

//Token: userId: Required
//       deviceId: Option
const handleRedisError = (err, res) => {
  res.status(500).send({
    error: {
      isError: true,
      errorMessage: {
        server: err.message
      }
    }
  });
}

const checkTokenExist = (tokenKey, token, res, next) => {
  client.get(tokenKey, (e, tokenValue) => {
    if (e) { return handleRedisError(e, res) }
    if (!tokenValue) {
      return res.status(400).send({
        error: {
          isError: true,
          errorMessage: {
            token: 'Invalid token'
          }
        }
      })
    }

    if (token != tokenValue) return res.status(400).send({
      error: {
        isError: true,
        errorMessage: {
          token: 'Token incorrect'
        }
      }
    });
    next();
  });
  // });
}

const handleTokenDatabaseError = (err, res) => {
  if (err.message.indexOf('jwt') >= 0 || err.message.indexOf('token') >= 0) {
    return res.status(400).send({
      error: {
        isError: true,
        errorMessage: {
          token: err.message
        }
      }
    });
  }

  res.status(500).send({
    error: {
      isError: true,
      errorMessage: {
        server: err.message
      }
    }
  })
}

module.exports = async (req, res, next) => {
  try {
    const token = req.header('access-token');
    const decoded = jwt.verify(token, secret);
    const { id, platform } = decoded;
    const tokenKey = id.toString() + '_' + platform;

    req.userId = id;
    req.tokenKey = tokenKey
    req.client = client;
    checkTokenExist(tokenKey, token, res, next);
  } catch (error) {
    handleTokenDatabaseError(error, res);
  }
}