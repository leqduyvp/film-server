const WatchedFilms = require('./watchedFilms.model');
const client = require('./cache.connection');

const watchedFilmsSave = (watchedFilmsObject) => {
  return new WatchedFilms(watchedFilmsObject).save();
}

const getWatchedFilmsByUserId = async (userId) => {
  // return WatchedFilms.findOne({ userId }, { films: 1, _id: 0 }); 
  let watchedFilms = await client.getAsync(userId.toString() + '_watched');
  if (!watchedFilms) {
    watchedFilms = await WatchedFilms.findOne({ userId }, { films: 1, _id: 0 });
    client.setex(userId.toString() + '_watched', 300, JSON.stringify(watchedFilms));
  }
  return watchedFilms;
}

module.exports = {
  watchedFilmsSave,
  getWatchedFilmsByUserId
}