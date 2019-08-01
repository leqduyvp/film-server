const WatchedFilms = require('./watchedFilms.model');
const { client } = require('../service/redis.connection');

const watchedFilmsSave = (watchedFilmsObject) => {
  return new WatchedFilms(watchedFilmsObject).save();
}

const updateWatchedFilmsByUserId = async (userId, updates) => {
  try {

    const userWatchedFilms = await WatchedFilms.findOne({ userId });
    for (let key in updates) {
      userWatchedFilms[key] = updates[key];
    }
    client.setex(userId.toString() + '_watched', 300, JSON.stringify(userWatchedFilms));
    await userWatchedFilms.save();
  } catch (error) {
    console.log(error.message);
  }
}

const getWatchedFilmsByUserId = async (userId) => {
  try {
    let watchedFilms = await client.getAsync(userId.toString() + '_watched');
    if (!watchedFilms) {
      watchedFilms = await WatchedFilms.findOne({ userId }, { _id: 0, __v: 0 });
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
  getWatchedFilmsByUserId,
  updateWatchedFilmsByUserId
}