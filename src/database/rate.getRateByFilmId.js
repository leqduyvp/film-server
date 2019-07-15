const Rate = require('./rate.model');

module.exports = async (filmId) => {
  return Rate.findOne({ filmId });
}