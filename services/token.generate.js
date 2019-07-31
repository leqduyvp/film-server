const jwt = require('jsonwebtoken');
const secret = require('../config/jwtSecret');

module.exports = (userId, userAccType, platform = 'web', res) => {
  const response = {
    error: {
      isError: false,
      errorMessage: {}
    }
  };
  const newToken = jwt.sign({ id: userId, accType: userAccType, platform }, secret, { expiresIn: '2h' });
  response.accessToken = newToken;
  res.send(response);
}