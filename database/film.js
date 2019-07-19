// Loasd film model
const Film = require('../database/Film.model');

const getFilmsByCategory = (category, page, records) => {
  return Film.find({
    category: category
  }).skip((page - 1) * records).limit(records);
}

module.exports = {
  getFilmsByCategory
}