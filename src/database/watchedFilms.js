const watchedFilms = require('./watchedFilms.model');

const watchedFilmsSave = (watchedFilmsObject) => {
  return new watchedFilms(watchedFilmsObject).save();
}

const getWatchedFilmsByUserId = (userId) => {
  return watchedFilms.findOne({ userId }, { films: 1, _id: 0 });
}

module.exports = {
  watchedFilmsSave,
  getWatchedFilmsByUserId
}