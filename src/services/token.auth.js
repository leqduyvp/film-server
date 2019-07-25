const jwt = require('jsonwebtoken');
const secret = require('../config/jwtSecret');

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
    req.userId = id;
    next();
  } catch (error) {
    handleTokenDatabaseError(error, res);
  }
}