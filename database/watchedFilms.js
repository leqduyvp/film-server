const WatchedFilms = require('./watchedFilms.model');
const {client} = require('../service/redis.connection');

const watchedFilmsSave = (watchedFilmsObject) => {
  return new WatchedFilms(watchedFilmsObject).save();
}

const getWatchedFilmsByUserId = async (userId) => {
  try {
    let watchedFilms = await client.getAsync(userId.toString() + '_watched');
    if (!watchedFilms) {
      watchedFilms = await WatchedFilms.findOne({ userId }, { films: 1, _id: 0 });
      watchedFilms = JSON.stringify(watchedFilms);
      client.setex(userId.toString() + '_watched', 300, watchedFilms);
    }
    return watchedFilms;
  }
  catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  watchedFilmsSave,
  getWatchedFilmsByUserId
}