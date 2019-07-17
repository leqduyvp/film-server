const Rate = require('./rate.model');

const rateSave = async (rate) => {
  return new Rate(rate).save();
}

const getRateByFilmId = async (filmId) => {
  return Rate.findOne({ filmId });
}

module.exports = {
  rateSave,
  getRateByFilmId
}