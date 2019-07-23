const { userOtpSave } = require('../database/users');

module.exports = (userId) => {
  const s1 = (Math.floor(Math.random() * 899) + 100).toString();
  const s2 = (Math.floor(Math.random() * 9)).toString();
  userOtpSave(userId, s1 + s2);
}