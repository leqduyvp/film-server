const WatchedFilms = require('./watchedFilms.model');

const watchedFilmsSave = (watchedFilmsObject) => {
  return new WatchedFilms(watchedFilmsObject).save();
}

const getWatchedFilmsByUserId = (userId) => {
  return WatchedFilms.findOne({ userId }, { films: 1, _id: 0 });
}

module.exports = {
  watchedFilmsSave,
  getWatchedFilmsByUserId
}