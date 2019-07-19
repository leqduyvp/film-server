const redis = require('redis');

const { redisPort, redisHost, redisConnectTimeout } = require('../config/redis.config');
const { getFilmsByCategoryFromCache, setFilmsByCategoryToCache } = require('./film.cache');
const { checkPagination, checkCategory } = require('./film.validate');

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

const getFilmsByCategoryService = async (category, page = 1, records = 24) => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  error = checkPagination(page, records);
  if (error.isError) {
    res.status(400).send(error);
  }

  error = checkCategory(category);
  if (error.isError) {
    res.status(400).send(error);
  }

  try {
    // Check category films in cache
    // let filmsCategory = await getFilmsByCategoryFromCache();
    // if (filmsCategory) {
    //   return {
    //     error,
    //     filmsCategory
    //   };
    // }

    // If there aren't in cache, get in database
    console.log('Get films by category from db')
    let filmsCategory = await getFilmsByCategory(category, page, records);

    // Set films to cache
    // console.log('Set films to cache');
    // setFilmsByCategoryToCache();

    return {
      error,
      filmsCategory
    };

  } catch (err) {
    error.isError = true;
    error.errorMessage.database = err.message;

    return error;
  }
}

module.exports = {
  getFilmsByCategoryService
}