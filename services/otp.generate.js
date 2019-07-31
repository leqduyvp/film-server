const { userOtpSave } = require('../database/users');

module.exports = (userId) => {
  const otp = ((Date.now()) % 10000).toString();
  userOtpSave(userId, otp);
}