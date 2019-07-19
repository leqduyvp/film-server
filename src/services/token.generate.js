const jwt = require('jsonwebtoken');
// const redis = require('redis');
const secret = require('../config/jwtSecret');

// const client = redis.createClient();

module.exports = (userId, platform = 'web', res) => {
  // const tokenKey = userId.toString() + '_' + platform.toString();
  // client.get(tokenKey, (err, token) => {
  //   if (err) {
  //     return res.status(500).send({
  //       error: {
  //         isError: true,
  //         errorMessage: {
  //           server: err.message
  //         }
  //       }
  //     });
  //   }

  const response = {
    error: {
      isError: false,
      errorMessage: {}
    }
  };
  const newToken = jwt.sign({ id: userId, platform }, secret, { expiresIn: '2h' });
  response['access-token'] = newToken;
  //client.setex(tokenKey, 7200, newToken.toString());
  res.send(response);
}