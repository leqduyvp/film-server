const Rate = require('./rate.model');

module.exports = async (rate) => {
  return new Rate(rate).save();
}