const watchedFilms = require('./watchedFilms.model');

const watchedFilmsSave = (watchedFilmsObject) => {
  return new watchedFilms(watchedFilmsObject).save();
}

module.exports = {
  watchedFilmsSave
}