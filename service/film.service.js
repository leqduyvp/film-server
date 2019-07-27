const redis = require('redis');

const { redisPort, redisHost, redisConnectTimeout } = require('../config/redis.config');
const { addFilm, getFilmById, filterFilm } = require('../database/film');
const { setFilterFilmsToCache, getFilterFilmsFromCache } = require('./film.cache');

// Create Redis Client
const client = redis.createClient({
  host: redisHost,
  port: redisPort,
  connect_timeout: redisConnectTimeout
});

// Handle error
client.on('error', error => {
  console.log(error.message);
});

const addFilmService = async input => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  try {
    await addFilm(input);

    // Update in cache

    return error;
  } catch (err) {
    error.isError = true;
    error.errorMessage.database = err.message;

    return error;
  }
}

const getFilmByIdService = async id => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  try {
    let film = null;
    // Get film in cache

    // If there isn't in cache, get it in database
    film = await getFilmById(id);

    return {
      error,
      film
    }
  } catch (err) {
    error.isError = true;
    error.errorMessage.database = err.message;

    return {
      error
    };
  }
}

const filterFilmsService = async (input, page, records) => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  try {
    let films = [];

    // Get films in cache
    films = await getFilterFilmsFromCache(input, page, records);
    if (films) {
      return {
        error,
        films
      }
    }

    // If there isn't in cache, get it in database
    films = await filterFilm(input, page, records);

    // Set films to cache
    setFilterFilmsToCache(input, page, records, films);

    return {
      error,
      films
    }
  } catch (err) {
    error.isError = true;
    error.errorMessage.database = err.message;

    return {
      error
    };
  }
}

module.exports = {
  addFilmService,
  getFilmByIdService,
  filterFilmsService
}