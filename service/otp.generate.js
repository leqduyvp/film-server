const { userOtpSave } = require('../database/users');

module.exports = async (userId) => {
  const otp = ((Date.now()) % 10000).toString();
  await userOtpSave(userId, otp);
  return otp;
}